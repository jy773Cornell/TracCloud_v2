from rest_framework import serializers
from api.models import UserProfile, UserType, UserRelation, UserRelationType
from django.contrib.auth.models import User


class UserLoginSerializer(serializers.ModelSerializer):
    remember = serializers.BooleanField()

    class Meta:
        model = User
        fields = ("username", "password", "remember",)


class UserGetSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    added_by = serializers.StringRelatedField()

    class Meta:
        model = UserProfile
        fields = "__all__"


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ("type", "added_by", "self_activated", "is_active", "create_time",)


class UserRelationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelation
        fields = ("urid", "requester", "provider", "type", "is_active",)


class UserRelationGetSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    requester = serializers.StringRelatedField()
    provider = serializers.StringRelatedField()
    added_by = serializers.StringRelatedField()

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
        fields = ("urid", "requester", "provider",)

# class DummyUserCreateSerializer(serializers.ModelSerializer):
#     relation_type = serializers.PrimaryKeyRelatedField(queryset=UserRelationType.objects.filter(is_active=True))
#     type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=UserType.objects.filter(is_active=True))
#     added_by_id = serializers.PrimaryKeyRelatedField(source='added_by', queryset=User.objects.filter(is_active=True))
#
#     class Meta:
#         model = UserProfile
#         exclude = ("type", "password", "self_activated", "added_by", "is_active", "create_time",)
#
#
# class DummyUserActivateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("uid", "username", "password",)
#
#
# class DummyUserDeleteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("uid", "added_by",)
