from rest_framework import serializers
from workflows.models import SprayCard, SprayCardAssignment
from api.models import Operation, OperationType
from api.utils.UUIDGen import gen_uuid
from workflows.utils.UserTree import *


class SprayCardGetSerializer(serializers.ModelSerializer):
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    owner = serializers.StringRelatedField()
    holder = serializers.StringRelatedField()

    class Meta:
        model = SprayCard
        fields = "__all__"


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
