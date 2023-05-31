import jwt
from datetime import datetime, timedelta
from django.core.signing import Signer


def make_token(username, outime_sec):
    outime = (datetime.now() + timedelta(seconds=outime_sec)).strftime("%Y-%m-%d %H:%M:%S")
    payload = {"username": username, "outime": outime}
    salt = Signer().sign("TracCloud")
    token = jwt.encode(payload, salt)
    return token
