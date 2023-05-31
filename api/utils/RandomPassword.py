import random
import string


def generate_random_string(length=8):
    chars = string.ascii_letters + string.digits

    random_chars = random.choices(chars, k=length)

    return ''.join(random_chars)
