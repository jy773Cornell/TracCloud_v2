import os
import string
import random
from django.core.cache import cache
from django.core.mail import send_mail
from user_management.models import *


def generate_random(length=8):
    letters_and_digits = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters_and_digits) for _ in range(length))
    return result_str


# Employee pricileges

def default_privilege(type_id, relation_type_id):
    user_type = next((item['name'] for item in cache.get("UserType") if item['utid'] == type_id), None)
    relation_type = next((item['name'] for item in cache.get("UserRelationType") if item['urtid'] == relation_type_id),
                         None)
    if relation_type in ["Owner", "Client"]:
        return full_privileges
    else:
        return applicator_privileges


def new_account_notify(first_name, last_name, username, password, email):
    send_mail(
        'Your Trac Cloud Account Has Been Created！',
        f'Dear {first_name} {last_name},'
        f'\n    Welcome to Trac Cloud!'
        f'\n    Your initial username and password: {username} ({password})'
        f'\n    Link to Trac Cloud: {os.getenv("TRACLOUD_URL")}',
        os.getenv("EMAIL_HOST_USER"),
        [email],
        fail_silently=False,
    )


def delete_account_notify(username, first_name, last_name, email):
    send_mail(
        'Your Trac Cloud Account Has Been Disabled！',
        f'Dear {first_name} {last_name},'
        f'\n    Your Trac Cloud account {username} has been disabled by your employer.',
        os.getenv("EMAIL_HOST_USER"),
        [email],
        fail_silently=False,
    )
