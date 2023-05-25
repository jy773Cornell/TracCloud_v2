from rest_framework import serializers
from api.models import UserProfile, Equipment, EquipmentType


class EquipmentCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.filter(is_active=True))
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=EquipmentType.objects.filter(is_active=True))
    owner_id = serializers.PrimaryKeyRelatedField(source='owner', queryset=UserProfile.objects.filter(is_active=True))

    class Meta:
        model = Equipment
        fields = ("user_id", "name", "type_id", "owner_id", "code",)


class EquipmentGetSerializer(serializers.ModelSerializer):
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Equipment
        fields = "__all__"


class EquipmentUpdateSerializer(serializers.ModelSerializer):
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=EquipmentType.objects.filter(is_active=True))
    owner_id = serializers.PrimaryKeyRelatedField(source='owner', queryset=UserProfile.objects.filter(is_active=True))

    class Meta:
        model = Equipment
        fields = ("eid", "name", "type_id", "owner_id", "code",)


class EquipmentDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ("eid", "user",)
