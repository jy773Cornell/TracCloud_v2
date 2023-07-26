from rest_framework import serializers
from user_management.models import *
from api.models import *


class PrivilegeGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPrivilege
        fields = "__all__"


class PrivilegeUpdateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.all())

    class Meta:
        model = UserPrivilege
        exclude = ["uroid", "user"]
