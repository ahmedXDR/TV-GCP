from functools import wraps
from typing import Optional, Tuple

from firebase_admin import auth
from flask import abort, request


def get_authorization_scheme_param(
    authorization_header_value: Optional[str],
) -> Tuple[str, str]:
    if not authorization_header_value:
        return "", ""
    scheme, _, param = authorization_header_value.partition(" ")
    return scheme, param


def verify_id_token(jwtoken):
    try:
        user = auth.verify_id_token(jwtoken)
    except auth.ExpiredIdTokenError:
        raise abort(
            code=403,
            description="Token is expired.",
        )
    except auth.RevokedIdTokenError:
        raise abort(
            code=403,
            description="Token is revoked.",
        )
    except auth.UserDisabledError:
        raise abort(
            code=402,
            description="User is disabled.",
        )
    except (
        ValueError,
        auth.InvalidIdTokenError,
        auth.CertificateFetchError,
        auth.UserDisabledError,
    ):
        raise abort(
            code=401,
            description="Token is invalid.",
        )

    return user


def get_user(auth_header_value):

    _, jwt = get_authorization_scheme_param(auth_header_value)

    return verify_id_token(jwt)


def require_JWT(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        auth_header_value = request.headers.get("authorization")
        if not auth_header_value:
            abort(401, description="Authorization header is expected")
        user = get_user(auth_header_value)
        return view_function(user, *args, **kwargs)

    return decorated_function



