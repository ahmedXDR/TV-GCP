from urllib.parse import urlencode

from flask import abort


def search_transitive_groups(service, member, page_size=50):
    try:
        groups = []
        next_page_token = ""
        while True:
            query_params = urlencode(
                {
                    "query": "member_key_id == '{}' && 'cloudidentity.googleapis.com/groups.discussion_forum' in labels".format(
                        member
                    ),
                    "page_size": page_size,
                    "page_token": next_page_token,
                }
            )
            request = (
                service.groups()
                .memberships()
                .searchTransitiveGroups(
                    parent="groups/-",
                )
            )
            request.uri += "&" + query_params
            response = request.execute()

            if "memberships" in response:
                groups += response["memberships"]

            if "nextPageToken" in response:
                next_page_token = response["nextPageToken"]
            else:
                next_page_token = ""

            if len(next_page_token) == 0:
                break

        return groups
    except Exception as e:
        print(f"An error occurred while fetching groups: {e}")
        abort(
            500,
            description="An error occurred while fetching groups",
        )


def has_role_in_group(service, member, group, role):
    member_groups = search_transitive_groups(service, member)
    for member_group in member_groups:
        if member_group.get("group") == group:

            member_roles = member_group.get("roles")
            for member_role in member_roles:
                if member_role.get("role") == role:
                    return True
            return False
    return False


def create_google_group_membership(
    service,
    # identity_source_id,
    parent,
    member_key,
):
    try:
        # Create a membership object with a memberKey and a single role of
        # type MEMBER.
        membership = {
            "preferredMemberKey": {"id": member_key},
            "roles": {
                "name": "MEMBER",
                # "expiryDetail": {"expireTime": "2021-10-02T15:01:23Z"},
            },
        }
        # Create a membership using the ID for the parent group and a
        # membership object.
        response = (
            service.groups()
            .memberships()
            .create(parent=parent, body=membership)
            .execute()
        )

        return response.get("done", "") is True
    except Exception as e:
        if "already exists" in str(e):
            abort(
                409,
                description="Membership already exists",
            )
        print(f"An error occurred while creating membership: {e}")
        abort(
            500,
            description="An error occurred while creating membership",
        )
