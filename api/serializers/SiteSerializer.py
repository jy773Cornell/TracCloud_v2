from django.core.cache import cache
from rest_framework import serializers
from api.models import UserProfile, Crop, Site, SiteType, Unit


class SiteCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.filter(is_active=True))
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=SiteType.objects.filter(is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.filter(is_active=True),
                                                 allow_null=True)
    size_unit_id = serializers.PrimaryKeyRelatedField(source='size_unit',
                                                      queryset=Unit.objects.filter(usage=1, is_active=True))
    parent_id = serializers.PrimaryKeyRelatedField(source='parent', queryset=Site.objects.filter(is_active=True),
                                                   allow_null=True)

    class Meta:
        model = Site
        exclude = ("sid", "user", "type", "crop", "size_unit", "parent", "is_active",)


class SiteGetSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    size_unit = serializers.SerializerMethodField()
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Site
        fields = "__all__"

    def get_type(self, obj):
        return next((item['name'] for item in cache.get("SiteType") if item['stid'] == obj.type_id), None)

    def get_size_unit(self, obj):
        return next((item['name'] for item in cache.get("Unit") if item['unitid'] == obj.size_unit_id), None)


class SiteUpdateSerializer(serializers.ModelSerializer):
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=SiteType.objects.filter(is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.filter(is_active=True),
                                                 allow_null=True)
    size_unit_id = serializers.PrimaryKeyRelatedField(source='size_unit',
                                                      queryset=Unit.objects.filter(usage=1, is_active=True))

    class Meta:
        model = Site
        exclude = ("user", "type", "crop", "size_unit", "parent", "is_active", "create_time",)


class SiteDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ("sid", "user",)
