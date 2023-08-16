from rest_framework import serializers
from workflows.models import Connection
from api.models import UserRelation, UserRelationType
from message.models import *
from api.utils.UUIDGen import gen_uuid
from workflows.utils.UserTree import *
from django.contrib.auth.models import User
from django.db.models import Q
from django.core.cache import cache


class ConnectionInitiateSerializer(serializers.ModelSerializer):
    requester_id = serializers.CharField(required=True)
    provider_id = serializers.CharField(required=True)

    class Meta:
        model = Connection
        fields = ('requester_id', 'provider_id')

    def validate(self, data):
        requester_id = data.get('requester_id')
        provider_id = data.get('provider_id')

        try:
            requester = UserProfile.objects.get(uid=requester_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The requester does not exist.")

        try:
            provider = UserProfile.objects.get(uid=provider_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The provider does not exist.")

        relation_exists = UserRelation.objects.filter(
            Q(provider=provider, requester=requester) | Q(provider=requester, requester=provider),
            is_active=True
        ).exists()

        if relation_exists:
            raise serializers.ValidationError("The connection between users already exists.")

        return {'cpid': gen_uuid("CPID"), 'requester': requester, 'provider': provider}


class ConnectionResponseSerializer(serializers.ModelSerializer):
    provider_id = serializers.CharField(required=True)
    requester_id = serializers.CharField(required=True)
    cpid = serializers.CharField(required=True)
    mid = serializers.CharField(required=True)

    class Meta:
        model = Connection
        fields = ('provider_id', 'requester_id', 'cpid', 'mid')

    def validate(self, data):
        requester_id = data.get('requester_id')
        provider_id = data.get('provider_id')
        cpid = data.get('cpid')
        mid = data.get('mid')

        try:
            requester = UserProfile.objects.get(uid=requester_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The requester does not exist.")

        try:
            provider = UserProfile.objects.get(uid=provider_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The provider does not exist.")

        try:
            connection_process = Connection.objects.get(cpid=cpid, is_active=True)
        except Connection.DoesNotExist:
            raise serializers.ValidationError("The connection process does not exist.")

        try:
            message = Message.objects.get(mid=mid)
        except Message.DoesNotExist:
            raise serializers.ValidationError("The message does not exist.")

        relation_exists = UserRelation.objects.filter(
            Q(provider=provider, requester=requester) | Q(provider=requester, requester=provider),
            is_active=True
        ).exists()

        if relation_exists:
            raise serializers.ValidationError("The connection between users already exists.")

        return {'connection_process': connection_process, 'message': message}


class ConnectionSearchGetSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ("uid", "user", "type", "business_name")

    def get_type(self, obj):
        return obj.type.name

    def get_user(self, obj):
        return obj.user.username


class RequesterGetSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ("uid", "username", "type", "business_name")

    def get_type(self, obj):
        return next((item['name'] for item in cache.get("UserType") if item['utid'] == obj.type_id), None)

    def get_username(self, obj):
        return obj.user.username
