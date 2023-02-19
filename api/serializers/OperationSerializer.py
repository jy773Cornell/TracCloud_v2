from rest_framework import serializers
from api.models import User, Chemical, Crop, Site, SiteType, Unit, OperationType, PurchaseRecord, HarvestRecord


class PurchaseCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
    operator_id = serializers.PrimaryKeyRelatedField(source='operator', queryset=User.objects.filter(is_active=True))
    chemical_id = serializers.PrimaryKeyRelatedField(source='chemical',
                                                     queryset=Chemical.objects.filter(is_active=True))
    operation_type = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseRecord
        exclude = ("prid", "opid", "user", "operator", "chemical", "is_active", "create_time",)

    def get_operation_type(self):
        return OperationType.objects.filter(name="Purchase", is_active=True).first().optid


class PurchaseGetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    operator = serializers.StringRelatedField()
    chemical = serializers.StringRelatedField()

    class Meta:
        model = PurchaseRecord
        fields = "__all__"


class PurchaseUpdateSerializer(serializers.ModelSerializer):
    operator_id = serializers.PrimaryKeyRelatedField(source='operator', queryset=User.objects.filter(is_active=True))
    chemical_id = serializers.PrimaryKeyRelatedField(source='chemical',
                                                     queryset=Chemical.objects.filter(is_active=True))

    class Meta:
        model = PurchaseRecord
        exclude = ("prid", "user", "operator", "chemical", "is_active", "create_time",)


class PurchaseDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseRecord
        fields = ("opid", "user",)


class HarvestCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
    operator_id = serializers.PrimaryKeyRelatedField(source='operator', queryset=User.objects.filter(is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.filter(is_active=True))
    site_id = serializers.PrimaryKeyRelatedField(source='site',
                                                 queryset=Site.objects.filter(
                                                     type_id__in=SiteType.objects.filter(level=1, is_active=True),
                                                     is_active=True))
    area_unit_id = serializers.PrimaryKeyRelatedField(source='area_unit',
                                                      queryset=Unit.objects.filter(usage=1, is_active=True))
    operation_type = serializers.SerializerMethodField()

    class Meta:
        model = HarvestRecord
        exclude = ("hrid", "user", "opid", "operator", "crop", "site", "area_unit", "is_active", "create_time",)

    def get_operation_type(self):
        return OperationType.objects.filter(name="Harvest", is_active=True).first().optid


class HarvestGetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    opid = serializers.StringRelatedField()
    operator = serializers.StringRelatedField()
    crop = serializers.StringRelatedField()
    site = serializers.StringRelatedField()
    area_unit = serializers.StringRelatedField()

    class Meta:
        model = HarvestRecord
        fields = "__all__"
