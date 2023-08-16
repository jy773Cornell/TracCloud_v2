from rest_framework import serializers
from message.models import *
from django.core.cache import cache


class NotificationGetSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    recipient = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Message
        exclude = ('reports',)

    def get_author(self, obj):
        return "{} ({} {})".format(obj.author.user.username, obj.author.first_name, obj.author.last_name)

    def get_recipient(self, obj):
        return "{} ({} {})".format(obj.recipient.user.username, obj.recipient.first_name, obj.recipient.last_name)

    def get_type(self, obj):
        return next((item['name'] for item in cache.get("MessageType") if item['mtid'] == obj.type_id), None)
