import os
import json
import logging
import uuid
from datetime import datetime
from googleapiclient.discovery import build
from google.cloud import logging as cloud_logging
from google.cloud import firestore
from flask import Flask, request, jsonify

app = Flask(__name__)

# Initialize Firestore client
db = firestore.Client()

# Global constants for Firestore collection names
GROUPS_COLLECTION = "groups"
REQUESTS_COLLECTION = "permission_requests"


# Utility functions
def log_permission_request(email, role, description):
    logging_client = cloud_logging.Client()
    logger = logging_client.logger("elevated-permission-requests")
    logger.log_struct(
        {
            "email": email,
            "role": role,
            "description": description,
            "timestamp": datetime.utcnow().isoformat(),
        }
    )


def get_iam_policy():
    service = build("cloudresourcemanager", "v1", cache_discovery=False)
    return service.projects().getIamPolicy(resource=os.getenv("GCP_PROJECT")).execute()


def set_iam_policy(policy):
    service = build("cloudresourcemanager", "v1", cache_discovery=False)
    service.projects().setIamPolicy(
        resource=os.getenv("GCP_PROJECT"), body={"policy": policy}
    ).execute()


def add_user_to_role(email, role):
    policy = get_iam_policy()
    role_binding = next((b for b in policy["bindings"] if b["role"] == role), None)
    if not role_binding:
        role_binding = {"role": role, "members": []}
        policy["bindings"].append(role_binding)
    if f"user:{email}" not in role_binding["members"]:
        role_binding["members"].append(f"user:{email}")
    set_iam_policy(policy)


@app.route("/group", methods=["GET"])
def get_group_info():
    email = request.args.get("email")
    user_groups = []
    groups_ref = db.collection(GROUPS_COLLECTION)
    for doc in groups_ref.stream():
        group_data = doc.to_dict()
        is_owner = group_data.get("owner") == email
        if email in group_data.get("members", []):
            user_groups.append({"group": doc.id, "owner": is_owner})
    return jsonify(user_groups)


@app.route("/requests", methods=["GET"])
def get_requests():
    email = request.args.get("email")
    role = request.args.get("role")
    requests_ref = db.collection(REQUESTS_COLLECTION)
    if email and role:
        user_requests = [
            doc.to_dict()
            for doc in requests_ref.where("user.email", "==", email)
            .where("from", "==", role)
            .stream()
        ]
        return jsonify(user_requests)
    all_requests = [doc.to_dict() for doc in requests_ref.stream()]
    return jsonify(all_requests)


@app.route("/elevate", methods=["POST"])
def request_permission_elevation():
    req_data = request.json
    email = req_data.get("email")
    name = req_data.get("name")
    from_role = req_data.get("from")
    to_role = req_data.get("to")
    description = req_data.get("description")

    if not all([email, name, from_role, to_role, description]):
        return jsonify({"message": "Invalid request body"}), 400

    request_id = str(uuid.uuid4())
    created_at = datetime.utcnow().isoformat()

    permission_request = {
        "id": request_id,
        "user": {"email": email, "name": name},
        "from": from_role,
        "to": to_role,
        "description": description,
        "status": "pending",
        "created_at": created_at,
    }

    db.collection(REQUESTS_COLLECTION).document(request_id).set(permission_request)
    log_permission_request(email, to_role, description)

    return (
        jsonify({"message": "Permission Request Submitted", "request_id": request_id}),
        200,
    )


@app.route("/accept", methods=["POST"])
def accept_request():
    request_id = request.args.get("id")
    permission_request_ref = db.collection(REQUESTS_COLLECTION).document(request_id)
    permission_request = permission_request_ref.get().to_dict()

    if not permission_request:
        return jsonify({"message": "Invalid request ID"}), 404

    permission_request["status"] = "accepted"
    permission_request_ref.set(permission_request)

    add_user_to_role(permission_request["user"]["email"], permission_request["to"])

    return jsonify({"message": "Permission Request Accepted"}), 200


@app.route("/decline", methods=["POST"])
def decline_request():
    request_id = request.args.get("id")
    permission_request_ref = db.collection(REQUESTS_COLLECTION).document(request_id)
    permission_request = permission_request_ref.get().to_dict()

    if not permission_request:
        return jsonify({"message": "Invalid request ID"}), 404

    permission_request["status"] = "declined"
    permission_request_ref.set(permission_request)

    return jsonify({"message": "Permission Request Declined"}), 200


@app.route("/")
def root():
    return "Elevated Permission Workflow API"


# Cloud Function Entry Point
def request_permissions(request):
    with app.test_request_context(environ_overrides=request.environ):
        return app.full_dispatch_request()
