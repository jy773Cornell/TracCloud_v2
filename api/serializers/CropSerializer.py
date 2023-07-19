from django.core.cache import cache
from rest_framework import serializers
from api.models import UserProfile, Crop, CropCategory, CropVariety, CropGrowthStage


class CropCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.all().alive())
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=CropCategory.objects.all())
    variety_id = serializers.PrimaryKeyRelatedField(source='variety', queryset=CropVariety.objects.all())

    class Meta:
        model = Crop
        fields = ("user_id", "crop_id", "variety_id",)


class CropGetSerializer(serializers.ModelSerializer):
    crop = serializers.SerializerMethodField()
    ccid = serializers.SerializerMethodField()
    crop_code = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    variety = serializers.SerializerMethodField()
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Crop
        fields = "__all__"

    def get_crop(self, obj):
        return next((item['name'] for item in cache.get("CropCategory") if item['ccid'] == obj.crop_id), None)

    def get_ccid(self, obj):
        return obj.crop_id

    def get_crop_code(self, obj):
        return next((item['crop_code'] for item in cache.get("CropCategory") if item['ccid'] == obj.crop_id), None)

    def get_category(self, obj):
        return next((item['category'] for item in cache.get("CropCategory") if item['ccid'] == obj.crop_id), None)

    def get_variety(self, obj):
        return next((item['name'] for item in cache.get("CropVariety") if item['cvid'] == obj.variety_id), None)


class CropUpdateSerializer(serializers.ModelSerializer):
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=CropCategory.objects.all())
    variety_id = serializers.PrimaryKeyRelatedField(source='variety', queryset=CropVariety.objects.all())

    class Meta:
        model = Crop
        fields = ("cid", "crop_id", "variety_id",)


class CropDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ("cid", "user",)
