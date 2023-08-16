from django.db import models
from api.models import *
from media.models import *


class Message(models.Model):
    mid = models.CharField(verbose_name="MID", primary_key=True, max_length=48)
    type = models.ForeignKey("MessageType", verbose_name="Type", related_name='message_type',
                             null=True, blank=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(UserProfile, verbose_name="Author", to_field="uid",
                               related_name="author_user", on_delete=models.CASCADE)
    recipient = models.ForeignKey(UserProfile, verbose_name="Recipient", to_field="uid",
                                  related_name="recipient_user", on_delete=models.CASCADE)
    text = models.TextField(verbose_name="Text", null=True, blank=True)
    reports = models.ManyToManyField(Report, verbose_name="Reports", related_name='reports', blank=True)
    is_read = models.BooleanField(verbose_name="Is Read", default=False)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)


class MessageType(models.Model):
    mtid = models.CharField(verbose_name="MTID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", unique=True, max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return self.name
