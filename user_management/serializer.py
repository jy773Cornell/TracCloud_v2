from rest_framework import serializers
from user_management.models import *


class PrivilegeGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPrivilege
        fields = "__all__"
