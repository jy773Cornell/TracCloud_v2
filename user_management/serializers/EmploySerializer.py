from rest_framework import serializers
from user_management.models import *
from api.models import *


class EmployeeCreateSerializer(serializers.ModelSerializer):
    employer_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.all())
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=UserType.objects.all())

    class Meta:
        model = UserProfile
        fields = ["employer_id", "type_id", "first_name", "last_name", "email", ]

        def validate(self, attrs):
            for field in self.fields:
                if not attrs.get(field):
                    raise serializers.ValidationError(f"{field} must not be empty.")
            return attrs


class EmployeeDeleteSerializer(serializers.ModelSerializer):
    employer_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.all())
    employee_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.all())

    class Meta:
        model = UserProfile
        fields = ["employer_id", "employee_id"]

        def validate(self, attrs):
            for field in self.fields:
                if not attrs.get(field):
                    raise serializers.ValidationError(f"{field} must not be empty.")
            return attrs


class EmployerGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class AssigneeGetSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_type(self, obj):
        return obj.type.name

    def get_user(self, obj):
        return obj.user.username
