from rest_framework import serializers
from api.models import User, UserType, UserRelation, UserRelationType


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password",)


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "type", "email",)


class UserGetSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()

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


class UserRelationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = ("urid", "requester", "provider", "type", "is_active",)


class UserRelationGetSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()

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
    relation_type = serializers.PrimaryKeyRelatedField(queryset=UserRelationType.objects.filter(is_active=True))
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=UserType.objects.filter(is_active=True))
    added_by_id = serializers.PrimaryKeyRelatedField(source='added_by', queryset=User.objects.filter(is_active=True))

    class Meta:
        model = User
        exclude = ("uid", "type", "password", "self_activated", "added_by", "is_active", "create_time",)


class DummyUserActivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("uid", "username", "password",)


class DummyUserDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("uid", "added_by",)
