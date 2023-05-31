import os

from django.db import models
from api.models import UserProfile
from django.contrib.auth.models import User
from django_fsm import FSMField, transition
from django.core.mail import send_mail
from api.utils.UUIDGen import gen_uuid
from django.urls import reverse

'''
    Registration Process:
    1.User submit registration form: username, password, email
    2.Admin user approve or reject the request
    3.Process ends
'''


class Registration(models.Model):
    rpid = models.CharField(verbose_name="RPID", primary_key=True, max_length=48)

    STATE_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    state = FSMField(default='pending', choices=STATE_CHOICES)

    username = models.CharField(max_length=150)
    password = models.CharField(max_length=128)
    email = models.EmailField()
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    @transition(field=state, source='pending', target='approved')
    def approve(self):
        new_user = User.objects.create_user(self.username, self.email, self.password)
        UserProfile.objects.create(uid=gen_uuid("UID"), user=new_user)

        send_mail(
            'Your registration was approved！',
            f'Dear {self.username}, \n  Welcome to Trac Cloud! \n   Link to Trac Cloud: {os.getenv("TRACLOUD_URL")}',
            os.getenv("EMAIL_HOST_USER"),
            [self.email],
            fail_silently=False,
        )

        self.is_active = False

    @transition(field=state, source='pending', target='rejected')
    def reject(self):
        send_mail(
            'Your registration was rejected.',
            f'Dear {self.username}, \n  Sorry, your registration was rejected. \n   Link to Trac Cloud: {os.getenv("TRACLOUD_URL")}',
            os.getenv("EMAIL_HOST_USER"),
            [self.email],
            fail_silently=False,
        )

        self.is_active = False


'''
    Password Reset Process:
    1.User submit pass_reset form: username, email
    2.A reset-link email will be sent to user
    3.User post new password
    4.Process ends
'''


class PasswordReset(models.Model):
    prpid = models.CharField(verbose_name="PRPID", primary_key=True, max_length=48)

    STATE_CHOICES = (
        ('request_received', 'Request Received'),
        ('email_sent', 'Email Sent'),
        ('password_updated', 'Password Updated'),
    )
    state = FSMField(default='request_received', choices=STATE_CHOICES)

    user = models.ForeignKey(User, verbose_name="User", on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    @transition(field=state, source='request_received', target='email_sent')
    def send_email(self):
        reset_link = os.getenv("TRACLOUD_URL") + reverse('workflow:password_reset_confirm',
                                                         kwargs={'token': self.prpid})

        send_mail(
            'Password Reset Requested',
            f'You requested a password reset. \nVisit this link to update your password: {reset_link}',
            os.getenv("EMAIL_HOST_USER"),
            [self.user.email],
            fail_silently=False,
        )

    @transition(field=state, source='email_sent', target='password_updated')
    def update_password(self, new_password):
        self.user.set_password(new_password)
        self.user.save()

        send_mail(
            'Password Reset Completed',
            f'Dear {self.user.username}, \n    Your password has been reset. \n    Link to Trac Cloud: {os.getenv("TRACLOUD_URL")}',
            os.getenv("EMAIL_HOST_USER"),
            [self.user.email],
            fail_silently=False,
        )

        self.is_active = False
