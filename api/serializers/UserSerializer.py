from rest_framework import serializers
from api.models import User, UserRelation


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password",)


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "type", "email",)


class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class UserRelationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = ("urid", "requester", "provider", "type", "is_active",)


class UserRelationGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = "__all__"
