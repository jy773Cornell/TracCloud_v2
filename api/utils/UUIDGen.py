import uuid


# Create UUID with given prefix

def gen_uuid(prefix):
    return prefix + "-" + uuid.uuid4().__str__()
