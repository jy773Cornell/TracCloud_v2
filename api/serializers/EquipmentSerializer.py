from rest_framework import serializers
from api.models import UserProfile, Equipment


class EquipmentCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.filter(is_active=True))

    class Meta:
        model = Equipment
        fields = ("user_id", "name", "code", "note",)


class EquipmentGetSerializer(serializers.ModelSerializer):
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Equipment
        fields = "__all__"


class EquipmentUpdateSerializer(serializers.ModelSerializer):
    owner_id = serializers.PrimaryKeyRelatedField(source='owner', queryset=UserProfile.objects.filter(is_active=True))

    class Meta:
        model = Equipment
        fields = ("eid", "name", "code", "note",)


class EquipmentDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ("eid", "user",)
