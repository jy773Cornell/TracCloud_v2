from django.core.cache import cache
from rest_framework import serializers
from api.models import User, Unit, Chemical


class ChemicalCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
    unit_id = serializers.PrimaryKeyRelatedField(source='unit', queryset=Unit.objects.filter(usage=2, is_active=True))

    class Meta:
        model = Chemical
        exclude = ("chemid", "user", "unit", "is_active", "create_time",)


class ChemicalGetSerializer(serializers.ModelSerializer):
    unit = serializers.SerializerMethodField()

    class Meta:
        model = Chemical
        fields = "__all__"

    def get_unit(self, obj):
        return next((item['name'] for item in cache.get("Unit") if item['unitid'] == obj.unit_id), None)


class ChemicalUpdateSerializer(serializers.ModelSerializer):
    unit_id = serializers.PrimaryKeyRelatedField(source='unit', queryset=Unit.objects.filter(usage=2, is_active=True))

    class Meta:
        model = Chemical
        exclude = ("user", "unit", "is_active", "create_time",)


class ChemicalDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chemical
        fields = ("chemid", "user",)
