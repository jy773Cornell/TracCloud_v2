from rest_framework import serializers
from api.models import User, Crop, CropCategory, CropVariety, CropGrowthStage


class CropCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=CropCategory.objects.filter(is_active=True))
    variety_id = serializers.PrimaryKeyRelatedField(source='variety',
                                                    queryset=CropVariety.objects.filter(is_active=True))
    growth_stage_id = serializers.PrimaryKeyRelatedField(source='growth_stage',
                                                         queryset=CropGrowthStage.objects.filter(is_active=True))

    class Meta:
        model = Crop
        fields = ("user_id", "crop_id", "variety_id", "growth_stage_id",)


class CropGetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    crop = serializers.StringRelatedField()
    variety = serializers.StringRelatedField()
    growth_stage = serializers.StringRelatedField()

    class Meta:
        model = Crop
        fields = "__all__"


class CropUpdateSerializer(serializers.ModelSerializer):
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=CropCategory.objects.filter(is_active=True))
    variety_id = serializers.PrimaryKeyRelatedField(source='variety',
                                                    queryset=CropVariety.objects.filter(is_active=True))
    growth_stage_id = serializers.PrimaryKeyRelatedField(source='growth_stage',
                                                         queryset=CropGrowthStage.objects.filter(is_active=True))

    class Meta:
        model = Crop
        fields = ("cid", "crop_id", "variety_id", "growth_stage_id",)


class CropDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ("cid", "user",)
