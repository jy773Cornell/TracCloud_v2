from django.core.cache import cache
from rest_framework import serializers
from api.models import *


class OperationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = ("user",)


class OperationDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = ("opid", "user",)


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
        exclude = ("opid", "user", "operator", "chemical", "is_active", "create_time",)


class PurchaseDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseRecord
        fields = ("opid", "user",)


class HarvestCreateSerializer(serializers.ModelSerializer):
    opid_id = serializers.PrimaryKeyRelatedField(source='opid', queryset=Operation.objects.filter(is_active=True))
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
    operator_id = serializers.PrimaryKeyRelatedField(source='operator', queryset=User.objects.filter(is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.filter(is_active=True))
    site_id = serializers.PrimaryKeyRelatedField(source='site',
                                                 queryset=Site.objects.filter(
                                                     type_id__in=SiteType.objects.filter(level=1, is_active=True),
                                                     is_active=True))
    area_unit_id = serializers.PrimaryKeyRelatedField(source='area_unit',
                                                      queryset=Unit.objects.filter(usage=1, is_active=True))

    class Meta:
        model = HarvestRecord
        exclude = ("hrid", "opid", "user", "operator", "crop", "site", "area_unit", "is_active", "create_time",)


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


class HarvestUpdateSerializer(serializers.ModelSerializer):
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.filter(is_active=True))
    site_id = serializers.PrimaryKeyRelatedField(source='site',
                                                 queryset=Site.objects.filter(
                                                     type_id__in=SiteType.objects.filter(level=1, is_active=True),
                                                     is_active=True))
    area_unit_id = serializers.PrimaryKeyRelatedField(source='area_unit',
                                                      queryset=Unit.objects.filter(usage=1, is_active=True))

    class Meta:
        model = HarvestRecord
        exclude = ("user", "opid", "operator", "crop", "site", "area_unit", "is_active", "create_time",)


class HarvestDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = HarvestRecord
        fields = ("hrid", "user",)


class ApplicationCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))
    opid_id = serializers.PrimaryKeyRelatedField(source='opid', queryset=Operation.objects.filter(is_active=True))
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=ApplicationType.objects.filter(is_active=True))
    target_id = serializers.PrimaryKeyRelatedField(source='target',
                                                   queryset=ApplicationTarget.objects.filter(is_active=True))
    chemid = serializers.PrimaryKeyRelatedField(source='chemical',
                                                queryset=Chemical.objects.filter(is_active=True))
    water_unit_id = serializers.PrimaryKeyRelatedField(source='water_unit',
                                                       queryset=Unit.objects.filter(usage=2, is_active=True))
    rate_unit_id = serializers.PrimaryKeyRelatedField(source='rate_unit',
                                                      queryset=Unit.objects.filter(usage=2, is_active=True))
    amount_unit_id = serializers.PrimaryKeyRelatedField(source='amount_unit',
                                                        queryset=Unit.objects.filter(usage=2, is_active=True))
    site_id = serializers.PrimaryKeyRelatedField(source='site',
                                                 queryset=Site.objects.filter(
                                                     type_id__in=SiteType.objects.filter(level=1, is_active=True),
                                                     is_active=True))
    area_unit_id = serializers.PrimaryKeyRelatedField(source='area_unit',
                                                      queryset=Unit.objects.filter(usage=1, is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.filter(is_active=True))

    decision_support_id = serializers.PrimaryKeyRelatedField(source='decision_support',
                                                             queryset=DecisionSupport.objects.filter(is_active=True))

    class Meta:
        model = ApplicationRecord
        exclude = ("arid", "user", "opid", "type", "target", "chemical", "water_unit", "rate_unit",
                   "amount_unit", "site", "area_unit", "crop", "decision_support", "is_active", "create_time",)


class ApplicationGetSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    target = serializers.StringRelatedField()
    water_unit = serializers.StringRelatedField()
    rate_unit = serializers.StringRelatedField()
    amount_unit = serializers.StringRelatedField()
    area_unit = serializers.StringRelatedField()
    decision_support = serializers.StringRelatedField()

    class Meta:
        model = ApplicationRecord
        fields = "__all__"

    def get_type(self, obj):
        return next((item['name'] for item in cache.get("ApplicationType") if item['atid'] == obj.type_id), None)


class ApplicationUpdateSerializer(serializers.ModelSerializer):
    type_id = serializers.PrimaryKeyRelatedField(source='type', queryset=ApplicationType.objects.filter(is_active=True))
    target_id = serializers.PrimaryKeyRelatedField(source='target',
                                                   queryset=ApplicationTarget.objects.filter(is_active=True))
    chemical_id = serializers.PrimaryKeyRelatedField(source='chemical',
                                                     queryset=Chemical.objects.filter(is_active=True))
    water_unit_id = serializers.PrimaryKeyRelatedField(source='water_unit',
                                                       queryset=Unit.objects.filter(usage=2, is_active=True))
    rate_unit_id = serializers.PrimaryKeyRelatedField(source='rate_unit',
                                                      queryset=Unit.objects.filter(usage=2, is_active=True))
    amount_unit_id = serializers.PrimaryKeyRelatedField(source='amount_unit',
                                                        queryset=Unit.objects.filter(usage=2, is_active=True))
    site_id = serializers.PrimaryKeyRelatedField(source='site',
                                                 queryset=Site.objects.filter(
                                                     type_id__in=SiteType.objects.filter(level=1, is_active=True),
                                                     is_active=True))
    area_unit_id = serializers.PrimaryKeyRelatedField(source='area_unit',
                                                      queryset=Unit.objects.filter(usage=1, is_active=True))
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.filter(is_active=True))
    growth_stage_id = serializers.PrimaryKeyRelatedField(source='growth_stage',
                                                         queryset=CropGrowthStage.objects.filter(is_active=True))
    decision_support_id = serializers.PrimaryKeyRelatedField(source='decision_support',
                                                             queryset=DecisionSupport.objects.filter(is_active=True))
    customer_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.filter(is_active=True))

    class Meta:
        model = ApplicationRecord
        exclude = ("user", "opid", "operator", "type", "target", "chemical", "water_unit", "rate_unit",
                   "amount_unit", "site", "area_unit", "crop", "growth_stage", "decision_support", "customer",
                   "is_active", "create_time",)


class ApplicationDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationRecord
        fields = ("arid", "user",)
