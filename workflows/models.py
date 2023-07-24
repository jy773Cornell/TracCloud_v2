import os

from django.db import models
from api.models import UserProfile
from django.contrib.auth.models import User
from django_fsm import FSMField, transition
from django.core.mail import send_mail
from api.utils.UUIDGen import gen_uuid
from django.urls import reverse
from api.models import Operation, UserRelation, UserType

'''
    Registration Process:
    1. User submit registration form: username, password, email
    2. Admin user approve or reject the request
    3. Process ends
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
    type = models.ForeignKey(UserType, verbose_name="User Type", to_field="utid", related_name="registrate_type",
                             null=True, blank=True, on_delete=models.SET_NULL)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    @transition(field=state, source='pending', target='approved')
    def approve(self):
        new_user = User.objects.create_user(self.username, self.email, self.password)
        UserProfile.objects.create(uid=gen_uuid("UID"), user=new_user, type=self.type)

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
    1. User submit pass_reset form: username, email
    2. A reset-link email will be sent to user
    3. User post new password
    4. Process ends
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


'''
    Spray Card Process:
    1. The high-level user initiates the process (state: initiated)
    2. The process is assigned to the applicator user (could be hierarchically assigned or reassigned, state: assigned) 
    3. The process could be returned to the last assigner by current holder (state: returned) 
    4. The process could be withdrew by the owner (state: withdrew (ends)) 
    5. Applicator user complete the spray card and get it back to the owner for approval (state: completed)
    6: The owner approves the spray card (state: approved (ends))
'''


class SprayCard(models.Model):
    scpid = models.CharField(verbose_name="SCPID", primary_key=True, max_length=48)

    STATE_CHOICES = (
        ('initiated', 'Initiated'),
        ('assigned', 'Assigned'),
        ('archived', 'Archived'),
    )
    state = FSMField(default='initiated', choices=STATE_CHOICES)

    owner = models.ForeignKey(UserProfile, verbose_name="Owner", on_delete=models.CASCADE)
    holder = models.ForeignKey(UserProfile, verbose_name="Holder", null=True, blank=True, on_delete=models.SET_NULL,
                               related_name='holder_spraycard')
    spray_record = models.ForeignKey(Operation, verbose_name="Spray Record", on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    @property
    def current_assignment(self):
        current_assignment = SprayCardAssignment.objects.get(spray_card=self, assign_to=self.holder, is_active=True)
        return current_assignment

    @transition(field=state, source='initiated', target='initiated')
    def initiate(self):
        self.holder = self.owner

        # Create the first assigment flow
        SprayCardAssignment.objects.create(
            scaid=gen_uuid("SCAID"),
            assign_to=self.holder,
            order=1,
            spray_card=self,
            is_active=True
        )

    @transition(field=state, source=['initiated', 'assigned'], target='assigned')
    def assign(self, assigner, assignee):

        # If the assigner is the holder
        if self.holder == assigner:
            new_order = self.current_assignment.order + 1
            SprayCardAssignment.objects.create(
                scaid=gen_uuid("SCAID"),
                assign_to=assignee,
                order=new_order,
                spray_card=self,
                is_active=True
            )

        # If the assigner is not the holder
        else:
            current_order = SprayCardAssignment.objects.get(spray_card=self, assign_to=assigner, is_active=True).order
            SprayCardAssignment.objects.filter(spray_card=self, order__gt=current_order).update(is_active=False)

            new_order = current_order + 1
            SprayCardAssignment.objects.create(
                scaid=gen_uuid("SCAID"),
                assign_to=assignee,
                order=new_order,
                spray_card=self,
                is_active=True
            )

        self.holder = assignee

        self.spray_record.state = 'pending'
        self.spray_record.save()

    @transition(field=state, source='assigned')
    def return_assignment(self):
        current_assignment = SprayCardAssignment.objects.get(spray_card=self, assign_to=self.holder, is_active=True)
        current_order = current_assignment.order - 1
        current_assignment.is_active = False
        current_assignment.save()

        self.holder = SprayCardAssignment.objects.get(spray_card=self, order=current_order, is_active=True).assign_to
        if current_order == 1:
            self.state = "initiated"
            self.spray_record.state = 'initiated'
            self.spray_record.save()
        else:
            self.state = "assigned"

    @transition(field=state, source=['initiated', 'assigned'], target='archived')
    def withdraw(self):
        self.spray_record.state = 'withdrew'
        self.spray_record.is_active = False
        self.spray_record.save()

        self.is_active = False

    @transition(field=state, source=['initiated', 'assigned'], target='archived')
    def complete(self):
        self.spray_record.state = 'completed'
        self.spray_record.save()

        self.is_active = False

    # @transition(field=state, source='completed', target='archived')
    # def approve(self):
    #     SprayCardAssignment.objects.filter(spray_card=self, is_active=True).update(is_active=False)
    #
    #     self.spray_record.state = 'completed'
    #     self.spray_record.save()
    #
    #     self.is_active = False


class SprayCardAssignment(models.Model):
    scaid = models.CharField(verbose_name="SCAID", primary_key=True, max_length=48)
    spray_card = models.ForeignKey('SprayCard', related_name='assignments', on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    assign_to = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    assign_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']


'''
    User Connection Process:
    1. Requestor submit connection request and select relation type (state: initiated)
    2. Waiting for provider to approve or reject request (state: pending)
    3. Process ends (state: connected or rejected)
'''


class Connection(models.Model):
    cpid = models.CharField(verbose_name="CPID", primary_key=True, max_length=48)

    STATE_CHOICES = (
        ('initiated', 'Initiated'),
        ('pending', 'Pending'),
        ('connected', 'Connected'),
        ('rejected', 'Rejected'),
    )
    state = FSMField(default='initiated', choices=STATE_CHOICES)

    connection_request = models.ForeignKey(UserRelation, verbose_name="Connection Request", on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    @transition(field=state, source='initiated', target='pending')
    def initiate(self, requester, provider, relation_type):
        self.connection_request = UserRelation.objects.create(
            urid=gen_uuid("URID"),
            requester=requester,
            provider=provider,
            type=relation_type,
            is_active=False
        )

    @transition(field=state, source='pending', target='connected')
    def approve(self):
        self.connection_request.is_active = True
        self.connection_request.save()

        self.is_active = False

    @transition(field=state, source='pending', target='rejected')
    def reject(self):
        self.is_active = False
