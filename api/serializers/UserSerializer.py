from rest_framework import serializers
from api.models import User, UserRelation, UserRelationType


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


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("username", "password", "type", "added_by", "self_activated", "is_active", "create_time",)


class UserPasswordChangeSerializer(serializers.ModelSerializer):
    original_password = serializers.CharField(label="Original Password", required=True, allow_null=False)

    class Meta:
        model = User
        fields = ("uid", "password", "original_password",)


class UserDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("uid",)


class UserRelationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = ("urid", "requester", "provider", "type", "is_active",)


class UserRelationGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = "__all__"


class UserRelationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = ("urid", "type",)


class UserRelationDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = ("urid",)


class DummyUserCreateSerializer(serializers.ModelSerializer):
    relation_type = serializers.PrimaryKeyRelatedField(queryset=UserRelationType.objects.all(), required=True,
                                                       allow_null=False)
    class Meta:
        model = User
        exclude = ("uid", "password", "self_activated", "is_active")
