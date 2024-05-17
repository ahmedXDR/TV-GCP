from datetime import UTC, datetime

import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, abort, jsonify, request
from flask_cors import CORS
from googleapiclient.discovery import build
from google.cloud.firestore import Client

from utils import require_JWT
from cloud_identity import (
    search_transitive_groups,
    has_role_in_group,
    create_google_group_membership,
)
from cloud_logging import write_entry, list_entries


SCOPES = ["https://www.googleapis.com/auth/cloud-identity.groups"]
SERVICE_ACCOUNT_FILE = "serviceAccountKey.json"
SUPER_ADMIN_GROUP = "groups/00gjdgxs1rpa79k"
LOGGER_NAME = "permission-requests"

app = Flask(__name__)
CORS(app)
# Initialize Firestore client

cred = credentials.Certificate("serviceAccountKey.json")
default_app = firebase_admin.initialize_app(cred)
db: Client = firestore.client()

# Initialize google cloud services

cloudidentity_service = build(
    "cloudidentity",
    "v1",
)


# Global constants for Firestore collection names
REQUESTS_COLLECTION = "permission_requests"


def load_docs(db: Client, docs):
    all_docs = []
    for doc in docs:
        doc_data = doc.to_dict()
        doc_data["id"] = doc.id
        all_docs.append(doc_data)

    return all_docs


@app.route("/groups", methods=["GET"])
@require_JWT
def get_user_groups(user):
    email = user["email"]
    group_resp = search_transitive_groups(cloudidentity_service, email)
    return jsonify(group_resp), 200


@app.route("/requests", methods=["GET"])
@require_JWT
def get_requests(user):
    email = user["email"]
    if has_role_in_group(
        cloudidentity_service,
        email,
        SUPER_ADMIN_GROUP,
        "OWNER",
    ):
        requests = db.collection(REQUESTS_COLLECTION).stream()
        return jsonify(load_docs(db, requests)), 200
    else:
        requests = (
            db.collection(
                REQUESTS_COLLECTION,
            )
            .where(
                "email",
                "==",
                email,
            )
            .stream()
        )
        return jsonify(load_docs(db, requests)), 200


@app.route("/requests", methods=["POST"])
@require_JWT
def create_request(user):
    data = request.json
    email = user["email"]
    group = data.get("group")
    description = data.get("description")

    if not description or not group:
        return jsonify({"message": "Missing required fields"}), 400

    if has_role_in_group(
        cloudidentity_service,
        email,
        group,
        "MEMBER",
    ):
        abort(409, description="You are already a member of this group")

    permission_request = {
        "email": email,
        "description": description,
        "group": group,
        "status": "pending",
        "created_at": datetime.now(UTC).isoformat(),
    }

    _, doc_ref = db.collection(REQUESTS_COLLECTION).add(permission_request)
    permission_request["id"] = doc_ref.id
    write_entry(LOGGER_NAME, permission_request)
    list_entries(LOGGER_NAME)
    return (
        jsonify(
            {
                "message": "Permission request created",
                "request": permission_request,
            }
        ),
        200,
    )


@app.route("/accept", methods=["POST"])
@require_JWT
def accept_request(user):

    request_id = request.args.get("id")
    permission_request_ref = db.collection(
        REQUESTS_COLLECTION,
    ).document(
        request_id,
    )
    permission_request = permission_request_ref.get().to_dict()
    if not permission_request:
        return jsonify({"message": "Invalid request ID"}), 404

    request_status = permission_request["status"]
    request_group = permission_request["group"]
    request_user = permission_request["email"]

    if not has_role_in_group(
        cloudidentity_service,
        user["email"],
        request_group,
        "OWNER",
    ):
        return jsonify({"message": "Permission denied"}), 403

    if request_status == "accepted":
        return jsonify({"message": "Request already accepted"}), 400

    if request_status == "rejected":
        return jsonify({"message": "Request already rejected"}), 400

    success = create_google_group_membership(
        cloudidentity_service,
        request_group,
        request_user,
    )
    if not success:
        abort(
            500,
            description="An error occurred while creating group membership",
        )

    permission_request["status"] = "accepted"
    permission_request_ref.set(permission_request)
    return jsonify({"message": "Permission Request Accepted"}), 200


@app.route("/reject", methods=["POST"])
@require_JWT
def reject_request(user):

    request_id = request.args.get("id")
    permission_request_ref = db.collection(
        REQUESTS_COLLECTION,
    ).document(
        request_id,
    )
    permission_request = permission_request_ref.get().to_dict()
    if not permission_request:
        return jsonify({"message": "Invalid request ID"}), 404

    request_status = permission_request["status"]
    request_group = permission_request["group"]

    if not has_role_in_group(
        cloudidentity_service,
        user["email"],
        request_group,
        "OWNER",
    ):
        return jsonify({"message": "Permission denied"}), 403

    if request_status == "accepted":
        return jsonify({"message": "Request already accepted"}), 400

    if request_status == "rejected":
        return jsonify({"message": "Request already rejected"}), 400

    permission_request["status"] = "rejected"
    permission_request_ref.set(permission_request)
    return jsonify({"message": "Permission Request Rejected"}), 200


@app.route("/")
@require_JWT
def root(_user):
    return "Elevated Permission Workflow API"


# Cloud Function Entry Point
def request_permissions(request):
    with app.test_request_context(environ_overrides=request.environ):
        return app.full_dispatch_request()


if __name__ == "__main__":
    app.run(debug=True)
