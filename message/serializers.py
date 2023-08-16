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
        return obj.author.user.username

    def get_recipient(self, obj):
        return obj.recipient.user.username

    def get_type(self, obj):
        return next((item['name'] for item in cache.get("MessageType") if item['mtid'] == obj.type_id), None)
