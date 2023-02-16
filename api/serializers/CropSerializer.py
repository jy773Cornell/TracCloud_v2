from rest_framework import serializers
from api.models import User, Crop, CropCategory, CropVariety, CropLifecycle, CropGrowthStage


class CropCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=CropCategory.objects.filter(is_active=True))
    variety_id = serializers.PrimaryKeyRelatedField(source='variety',
                                                    queryset=CropVariety.objects.filter(is_active=True))
    lifecycle_id = serializers.PrimaryKeyRelatedField(source='lifecycle',
                                                      queryset=CropLifecycle.objects.filter(is_active=True))
    growth_stage_id = serializers.PrimaryKeyRelatedField(source='growth_stage',
                                                         queryset=CropGrowthStage.objects.filter(is_active=True))

    class Meta:
        model = Crop
        fields = ("user_id", "crop_id", "variety_id", "lifecycle_id", "growth_stage_id",)
