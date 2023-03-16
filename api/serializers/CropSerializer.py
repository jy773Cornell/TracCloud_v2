from django.core.cache import cache
from rest_framework import serializers
from api.models import User, Crop, CropCategory, CropVariety, CropGrowthStage


class CropCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.all().alive())
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=CropCategory.objects.all())
    variety_id = serializers.PrimaryKeyRelatedField(source='variety', queryset=CropVariety.objects.all())
    growth_stage_id = serializers.PrimaryKeyRelatedField(source='growth_stage', queryset=CropGrowthStage.objects.all())

    class Meta:
        model = Crop
        fields = ("user_id", "crop_id", "variety_id", "growth_stage_id",)


class CropGetSerializer(serializers.ModelSerializer):
    crop = serializers.SerializerMethodField()
    crop_code = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    variety = serializers.SerializerMethodField()
    growth_stage = serializers.SerializerMethodField()
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Crop
        fields = "__all__"

    def get_crop(self, obj):
        return next((item['name'] for item in cache.get("CropCategory") if item['ccid'] == obj.crop_id), None)

    def get_crop_code(self, obj):
        return next((item['crop_code'] for item in cache.get("CropCategory") if item['ccid'] == obj.crop_id), None)

    def get_category(self, obj):
        return next((item['category'] for item in cache.get("CropCategory") if item['ccid'] == obj.crop_id), None)

    def get_variety(self, obj):
        return next((item['name'] for item in cache.get("CropVariety") if item['cvid'] == obj.variety_id), None)

    def get_growth_stage(self, obj):
        return next((item['name'] for item in cache.get("CropGrowthStage") if item['cgsid'] == obj.growth_stage_id),
                    None)


class CropUpdateSerializer(serializers.ModelSerializer):
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=CropCategory.objects.all())
    variety_id = serializers.PrimaryKeyRelatedField(source='variety', queryset=CropVariety.objects.all())
    growth_stage_id = serializers.PrimaryKeyRelatedField(source='growth_stage', queryset=CropGrowthStage.objects.all())

    class Meta:
        model = Crop
        fields = ("cid", "crop_id", "variety_id", "growth_stage_id",)


class CropDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ("cid", "user",)


# class CropCategoryGetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CropCategory
#         fields = "__all__"
#
#
# class CropVarietyGetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CropVariety
#         fields = "__all__"
#
#
# class CropGrowthStageGetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CropGrowthStage
#         fields = "__all__"
