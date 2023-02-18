from rest_framework import serializers
from api.models import User, Chemical, Operation, OperationType, PurchaseRecord


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
