from rest_framework import serializers
from workflows.models import SprayCard, SprayCardAssignment
from api.models import *
from api.utils.UUIDGen import gen_uuid
from workflows.utils.UserTree import *
from django.core.cache import cache
from api.serializers.ChemicalSerializer import *
from api.serializers.OperationSerializer import *
from api.serializers.CropSerializer import *
from api.serializers.SiteSerializer import *


class SprayCardGetSerializer(serializers.ModelSerializer):
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    owner = serializers.StringRelatedField()
    holder = serializers.StringRelatedField()
    owner_id = serializers.PrimaryKeyRelatedField(source='owner.pk', read_only=True)
    holder_id = serializers.PrimaryKeyRelatedField(source='holder.pk', read_only=True)
    state = serializers.SerializerMethodField()

    class Meta:
        model = SprayCard
        fields = "__all__"

    def get_state(self, obj):
        state = obj.state if (obj.state != 'archived') else obj.spray_record.state
        return state


class AssignmentGetSerializer(serializers.ModelSerializer):
    assign_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    assign_to = serializers.StringRelatedField()

    class Meta:
        model = SprayCardAssignment
        fields = "__all__"


class SprayCardContentGetSerializer(serializers.ModelSerializer):
    crop = serializers.SerializerMethodField()
    chemical_purchase = serializers.SerializerMethodField()
    site = serializers.SerializerMethodField()
    rate_unit = serializers.SerializerMethodField()
    amount_unit = serializers.SerializerMethodField()
    area_unit = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()
    decision_support = serializers.SerializerMethodField()
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = ApplicationRecord
        fields = "__all__"

    def get_crop(self, obj):
        crop = CropGetSerializer(obj.crop).data
        return {"label": "{} ({}, {})".format(crop['crop'], crop['variety'], crop['growth_stage']), "id": crop['cid']}

    def get_chemical_purchase(self, obj):
        chemical = ChemicalGetSerializer(obj.chemical_purchase.chemical).data
        chemical_purchase = PurchaseGetSerializer(obj.chemical_purchase).data
        return {
            "label": f"{chemical['epa_reg_no']} | {chemical['trade_name']} | {obj.gallons_water_rate} |"
                     f" {obj.application_rate} {chemical['unit']} | ${chemical_purchase['cost_per_unit']} per {chemical['unit']}",
            "unit": chemical['unit'],
            "rei": chemical['rei'],
            "phi": chemical['phi'],
            "cost": chemical_purchase['cost_per_unit'],
            "cost_per_unit": f"${chemical_purchase['cost_per_unit']} per {chemical['unit']}",
            "id": obj.chemical_purchase_id,
        }

    def get_site(self, obj):
        site = obj.site
        sid = site.sid
        crop = CropGetSerializer(obj.crop).data
        cid = crop['cid']
        applied_area = obj.applied_area
        partial_treatment = "partial treatment" if obj.partial_treatment else ""
        alt_row_middle = "alt row middle" if obj.alt_row_middle else ""
        size_unit = SiteGetSerializer(obj.site).data['size_unit']
        crop = "{} ({}, {})".format(crop['crop'], crop['variety'], crop['growth_stage'])
        option_str = site.name

        while site.parent:
            site = site.parent
            option_str = f"{site.name} - {option_str}"
        option_str = f"{option_str}: {applied_area} {size_unit} {partial_treatment} {alt_row_middle}"

        return {
            'id': sid,
            'label': option_str,
            'cid': cid,
            'crop': crop,
            'size': float(applied_area),
            'size_unit': size_unit,
        }

    def get_rate_unit(self, obj):
        return next((item['name'] for item in cache.get("Unit") if item['unitid'] == obj.rate_unit_id), None)

    def get_amount_unit(self, obj):
        return next((item['name'] for item in cache.get("Unit") if item['unitid'] == obj.amount_unit_id), None)

    def get_area_unit(self, obj):
        return next((item['name'] for item in cache.get("Unit") if item['unitid'] == obj.area_unit_id), None)

    def get_target(self, obj):
        return {
            "label":
                next((item['name'] for item in cache.get("ApplicationTarget") if item['attid'] == obj.target_id), None),
            "id":
                obj.target_id
        }

    def get_decision_support(self, obj):
        return {
            "label":
                next((item['name'] for item in cache.get("DecisionSupport") if item['dsid'] == obj.decision_support_id),
                     None),
            "id":
                obj.decision_support_id
        }


class SprayCardCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.all().alive())
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.all().alive())
    site_id = serializers.PrimaryKeyRelatedField(source='site', queryset=Site.objects.all().alive())
    chemical_purchase_id = serializers.PrimaryKeyRelatedField(source='chemical_purchase',
                                                              queryset=PurchaseRecord.objects.all().alive())
    target_id = serializers.PrimaryKeyRelatedField(source='target', queryset=ApplicationTarget.objects.all())
    decision_support_id = serializers.PrimaryKeyRelatedField(source='decision_support',
                                                             queryset=DecisionSupport.objects.all())

    class Meta:
        model = ApplicationRecord
        fields = ("user_id", "crop_id", "site_id", "chemical_purchase_id", "target_id", "decision_support_id")


class SprayCardUpdateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=UserProfile.objects.all().alive())
    crop_id = serializers.PrimaryKeyRelatedField(source='crop', queryset=Crop.objects.all().alive())
    site_id = serializers.PrimaryKeyRelatedField(source='site', queryset=Site.objects.all().alive())
    chemical_purchase_id = serializers.PrimaryKeyRelatedField(source='chemical_purchase',
                                                              queryset=PurchaseRecord.objects.all().alive())
    target_id = serializers.PrimaryKeyRelatedField(source='target', queryset=ApplicationTarget.objects.all())
    decision_support_id = serializers.PrimaryKeyRelatedField(source='decision_support',
                                                             queryset=DecisionSupport.objects.all())

    class Meta:
        model = ApplicationRecord
        fields = ("user_id", "crop_id", "site_id", "chemical_purchase_id", "target_id", "decision_support_id")


class SprayCardInitiateSerializer(serializers.ModelSerializer):
    spray_record_id = serializers.CharField(required=True)

    class Meta:
        model = SprayCard
        fields = ('spray_record_id',)

    def validate(self, data):
        opid = data.get('spray_record_id')

        try:
            spray_record = Operation.objects.get(opid=opid, is_active=True)
            if spray_record.type != OperationType.objects.get(name="Spray"):
                raise serializers.ValidationError("This record is not a spray record.")

            if spray_record.state != "initiated":
                raise serializers.ValidationError(
                    "This spray record could not be initiated as a spray card process.")
        except Operation.DoesNotExist:
            raise serializers.ValidationError("The application record does not exist.")

        return {'scpid': gen_uuid("SCPID"), 'spray_record': spray_record, 'owner': spray_record.user}


class SprayCardAssignSerializer(serializers.ModelSerializer):
    spray_card_id = serializers.CharField(required=True)
    assigner_id = serializers.CharField(required=True)
    assignee_id = serializers.CharField(required=True)

    class Meta:
        model = SprayCard
        fields = ('spray_card_id', 'assigner_id', 'assignee_id')

    def validate(self, data):
        scpid = data.get('spray_card_id')
        assigner_id = data.get('assigner_id')
        assignee_id = data.get('assignee_id')

        try:
            spray_card_process = SprayCard.objects.get(scpid=scpid, is_active=True)
        except SprayCard.DoesNotExist:
            raise serializers.ValidationError("The spray card record does not exist.")

        # Extract the assignees from the assignments
        assignments = SprayCardAssignment.objects.filter(spray_card=spray_card_process, is_active=True)
        assignee_list = [assignment.assign_to for assignment in assignments]

        try:
            assigner = UserProfile.objects.get(uid=assigner_id, is_active=True)
            if assigner not in assignee_list:
                raise serializers.ValidationError("The assigner does not have the access to the Spray Card.")
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The assigner does not exist.")

        try:
            assignee = UserProfile.objects.get(uid=assignee_id, is_active=True)
            user_tree = UserTree("hard-code-testing")
            if not user_tree.is_descendant(assigner_id, assignee_id):
                raise serializers.ValidationError("The assigner could not assign to the assignee.")
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The assignee does not exist.")

        return {'spray_card_process': spray_card_process, 'assigner': assigner, 'assignee': assignee}


class SprayCardReturnSerializer(serializers.ModelSerializer):
    holder_id = serializers.CharField(required=True)
    spray_card_id = serializers.CharField(required=True)

    class Meta:
        model = SprayCard
        fields = ('holder_id', 'spray_card_id',)

    def validate(self, data):
        holder_id = data.get('holder_id')
        scpid = data.get('spray_card_id')

        try:
            holder = UserProfile.objects.get(uid=holder_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The holder does not exist.")

        try:
            spray_card_process = SprayCard.objects.get(scpid=scpid, is_active=True)
            if spray_card_process.holder != holder:
                raise serializers.ValidationError("Wrong holder for this spray card record.")
        except SprayCard.DoesNotExist:
            raise serializers.ValidationError("The spray card record does not exist.")

        return {'spray_card_process': spray_card_process}


class SprayCarWithdrawSerializer(serializers.ModelSerializer):
    owner_id = serializers.CharField(required=True)
    spray_card_id = serializers.CharField(required=True)

    class Meta:
        model = SprayCard
        fields = ('owner_id', 'spray_card_id',)

    def validate(self, data):
        owner_id = data.get('owner_id')
        scpid = data.get('spray_card_id')

        try:
            owner = UserProfile.objects.get(uid=owner_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The owner does not exist.")

        try:
            spray_card_process = SprayCard.objects.get(scpid=scpid, is_active=True)
            if spray_card_process.owner != owner:
                raise serializers.ValidationError("Wrong owner for this spray card record.")
        except SprayCard.DoesNotExist:
            raise serializers.ValidationError("The spray card record does not exist.")

        return {'spray_card_process': spray_card_process}


class SprayCardCompleteSerializer(serializers.ModelSerializer):
    holder_id = serializers.CharField(required=True)
    spray_card_id = serializers.CharField(required=True)

    class Meta:
        model = SprayCard
        fields = ('holder_id', 'spray_card_id',)

    def validate(self, data):
        holder_id = data.get('holder_id')
        scpid = data.get('spray_card_id')

        try:
            holder = UserProfile.objects.get(uid=holder_id, is_active=True)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("The holder does not exist.")

        try:
            spray_card_process = SprayCard.objects.get(scpid=scpid, is_active=True)
            if spray_card_process.holder != holder:
                raise serializers.ValidationError("Wrong holder for this spray card record.")
        except SprayCard.DoesNotExist:
            raise serializers.ValidationError("The spray card record does not exist.")

        return {'spray_card_process': spray_card_process}

# class SprayApproveSerializer(serializers.ModelSerializer):
#     owner_id = serializers.CharField(required=True)
#     spray_card_id = serializers.CharField(required=True)
#
#     class Meta:
#         model = SprayCard
#         fields = ('owner_id', 'spray_card_id',)
#
#     def validate(self, data):
#         owner_id = data.get('owner_id')
#         scpid = data.get('spray_card_id')
#
#         try:
#             owner = UserProfile.objects.get(uid=owner_id, is_active=True)
#         except UserProfile.DoesNotExist:
#             raise serializers.ValidationError("The owner does not exist.")
#
#         try:
#             spray_card_process = SprayCard.objects.get(scpid=scpid, is_active=True)
#             if spray_card_process.owner != owner:
#                 raise serializers.ValidationError("Wrong owner for this spray card record.")
#         except SprayCard.DoesNotExist:
#             raise serializers.ValidationError("The spray card record does not exist.")
#
#         return {'spray_card_process': spray_card_process}
