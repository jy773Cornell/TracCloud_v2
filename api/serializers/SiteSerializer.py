from rest_framework import serializers
from api.models import User, Crop, Site, SiteType, Unit


class SiteCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
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
    user = serializers.StringRelatedField()
    type = serializers.StringRelatedField()
    crop = serializers.StringRelatedField()
    size_unit = serializers.StringRelatedField()
    parent = serializers.StringRelatedField()

    class Meta:
        model = Site
        fields = "__all__"
