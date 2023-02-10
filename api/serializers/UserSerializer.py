from rest_framework import serializers
from api.models import User


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password",)


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "type", "email",)


class UserGetInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "type",)
