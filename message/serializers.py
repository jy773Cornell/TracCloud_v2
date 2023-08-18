from rest_framework import serializers
from message.models import *
from django.core.cache import cache


class MessageGetSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    recipient = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Message
        exclude = ('reports',)

    def get_author(self, obj):
        return obj.author.uid

    def get_recipient(self, obj):
        return obj.recipient.uid

    def get_type(self, obj):
        return next((item['name'] for item in cache.get("MessageType") if item['mtid'] == obj.type_id), None)


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


class MessageReadSerializer(serializers.ModelSerializer):
    mid = serializers.CharField(required=True)

    class Meta:
        model = Message
        fields = ('mid',)

    def validate(self, data):
        mid = data.get('mid')

        try:
            message = Message.objects.get(mid=mid)
        except Message.DoesNotExist:
            raise serializers.ValidationError("The message does not exist.")

        return message


class ReportMessageGetSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    recipient = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Message
        fields = "__all__"

    def get_author(self, obj):
        return obj.author.user.username

    def get_recipient(self, obj):
        return obj.recipient.user.username

    def get_type(self, obj):
        return next((item['name'] for item in cache.get("MessageType") if item['mtid'] == obj.type_id), None)

    def get_reports(self, obj):
        reports = []
        for instance in obj.reports.all():
            reports.append({"rid": instance.rid, "user_id": instance.user_id, "name": instance.name})
        return reports
