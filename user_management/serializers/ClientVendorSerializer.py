from rest_framework import serializers
from user_management.models import *
from api.models import *
from django.db.models import Q


class ConnectionGetSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ("uid", "user", "type", "business_name")

    def get_type(self, obj):
        return obj.type.name

    def get_user(self, obj):
        return obj.user.username


class ClientVendorGetSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_type(self, obj):
        return obj.type.name

    def get_user(self, obj):
        return obj.user.username


class ClientVendorDeleteSerializer(serializers.ModelSerializer):
    requestor_id = serializers.CharField()
    client_vendor_id = serializers.CharField()

    class Meta:
        model = UserRelation
        fields = ["requestor_id", "client_vendor_id"]

        def validate(self, data):
            for field in self.fields:
                if not data.get(field):
                    raise serializers.ValidationError(f"{field} must not be empty.")

            requester_id = data.get('requester_id')
            client_vendor_id = data.get('client_vendor_id')
            relation = UserRelation.objects.filter(
                Q(provider=requester_id, requester=client_vendor_id) |
                Q(provider=client_vendor_id, requester=requester_id),
                is_active=True
            )

            if not relation.exists():
                raise serializers.ValidationError("The connection does not exist.")

            return data
