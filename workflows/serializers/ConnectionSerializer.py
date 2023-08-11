from rest_framework import serializers
from workflows.models import Connection
from api.models import UserRelation, UserRelationType
from api.utils.UUIDGen import gen_uuid
from workflows.utils.UserTree import *
from django.contrib.auth.models import User
from django.db.models import Q


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


class ConnectionApproveSerializer(serializers.ModelSerializer):
    provider_id = serializers.CharField(required=True)
    connection_process_id = serializers.CharField(required=True)

    class Meta:
        model = Connection
        fields = ('provider_id', 'connection_process_id')

    def validate(self, data):
        provider_id = data.get('provider_id')
        cpid = data.get('connection_process_id')

        try:
            provider = UserProfile.objects.get(uid=provider_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The provider does not exist.")

        try:
            connection_process = Connection.objects.get(cpid=cpid, is_active=True)
        except Connection.DoesNotExist:
            raise serializers.ValidationError("The connection process does not exist.")

        return {'connection_process': connection_process}


class ConnectionRejectSerializer(serializers.ModelSerializer):
    provider_id = serializers.CharField(required=True)
    connection_process_id = serializers.CharField(required=True)

    class Meta:
        model = Connection
        fields = ('provider_id', 'connection_process_id')

    def validate(self, data):
        provider_id = data.get('provider_id')
        cpid = data.get('connection_process_id')

        try:
            provider = UserProfile.objects.get(uid=provider_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The provider does not exist.")

        try:
            connection_process = Connection.objects.get(cpid=cpid, is_active=True)
        except Connection.DoesNotExist:
            raise serializers.ValidationError("The connection process does not exist.")

        return {'connection_process': connection_process}
