from rest_framework import serializers
from user_management.models import *
from api.models import *


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
