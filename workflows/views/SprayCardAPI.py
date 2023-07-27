from django.core.cache import cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from workflows.serializers.SprayCardSerializer import *
from django.db import transaction
from django.utils import timezone


class SprayCardListGetView(APIView):
    serializer_class = SprayCardGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = UserProfile.objects.filter(uid=uid).alive()
            if user:
                spray_card_assign_list = SprayCardAssignment.objects.filter(assign_to=uid, is_active=True).order_by(
                    '-assign_time')
                data_set = set()

                for assignment in spray_card_assign_list:
                    data_tuple = tuple(self.serializer_class(assignment.spray_card).data.items())
                    data_set.add(data_tuple)
                data = [dict(t) for t in data_set]
                return Response({'Succeeded': 'Spray Card Process List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SprayCardAssignmentHistoryGetView(APIView):
    serializer_class = AssignmentGetSerializer
    lookup_url_kwarg = "scpid"

    def get(self, request, format=None):
        scpid = request.GET.get(self.lookup_url_kwarg)
        if scpid:
            spray_card_process = SprayCard.objects.filter(scpid=scpid).first()
            if spray_card_process:
                spray_card_assign_list = SprayCardAssignment.objects.filter(spray_card=spray_card_process).order_by(
                    'assign_time')
                data = []
                for assignment in spray_card_assign_list:
                    data.append(self.serializer_class(assignment).data)
                return Response({'Succeeded': 'Spray Card Assignment List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid spcid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SprayCardContentGetView(APIView):
    serializer_class = SprayCardContentGetSerializer
    lookup_url_kwarg = "scpid"

    def get(self, request, format=None):
        scpid = request.GET.get(self.lookup_url_kwarg)
        if scpid:
            spray_card_process = SprayCard.objects.filter(scpid=scpid).first()
            if spray_card_process:
                spray_card_content_list = ApplicationRecord.objects.filter(opid=spray_card_process.spray_record)
                data = []
                for content in spray_card_content_list:
                    data.append(self.serializer_class(content).data)
                return Response({'Succeeded': 'Spray Card Contect List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid spcid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SprayCardCreateView(APIView):
    serializer_class = SprayCardCreateSerializer

    def post(self, request, format=None):
        request_data = request.data
        serializer = self.serializer_class(data=request_data[0])

        if serializer.is_valid():
            with transaction.atomic():
                uid = request_data[0]["user_id"]
                opid = gen_uuid("OPID")
                operation_type = next((op_type["optid"] for op_type in cache.get("OperationType") if
                                       op_type["name"] == "Spray"), None)
                operation = Operation(opid=opid, user_id=uid, type_id=operation_type)
                operation.save()

                for data in request_data:
                    serializer = self.serializer_class(data=data)
                    if serializer.is_valid():
                        data["arid"] = gen_uuid("ARID")
                        data["opid"] = operation
                        ApplicationRecord(**data).save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({'Succeeded': 'Spray Card Process Created.', "data": opid}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SprayCardUpdateView(APIView):
    serializer_class = SprayCardUpdateSerializer

    def post(self, request, format=None):
        scpid = request.data["scpid"]
        records = request.data["records"]

        if scpid and records:
            with transaction.atomic():
                operation = SprayCard.objects.get(scpid=scpid).spray_record
                ApplicationRecord.objects.filter(opid=operation).hard_delete()

                for data in records:
                    serializer = self.serializer_class(data=data)
                    if serializer.is_valid():
                        data["arid"] = gen_uuid("ARID")
                        data["opid"] = operation
                        ApplicationRecord(**data).save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                SprayCard.objects.filter(scpid=scpid).update(update_time=timezone.now())

            return Response({'Succeeded': 'Spray Card Process Updated.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid Post Parameters.'}, status=status.HTTP_400_BAD_REQUEST)


class SprayCardInitiateView(APIView):
    serializer_class = SprayCardInitiateSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                spray_card_process = SprayCard(**data)
                spray_card_process.initiate()
                spray_card_process.save()
            return Response(
                {
                    'Succeeded': 'Process Has Been Initiated.',
                    "data": SprayCardGetSerializer(spray_card_process).data
                },
                status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SprayCardAssignView(APIView):
    serializer_class = SprayCardAssignSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["spray_card_process"].assign(data['assigner'], data['assignee'])
                data["spray_card_process"].save()
            return Response({'Succeeded': 'Process Has Been Assigned.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SprayCardReturnView(APIView):
    serializer_class = SprayCardReturnSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["spray_card_process"].return_assignment()
                data["spray_card_process"].save()
            return Response({'Succeeded': 'Process Has Been Returned.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SprayCardWithdrawView(APIView):
    serializer_class = SprayCarWithdrawSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["spray_card_process"].withdraw()
                data["spray_card_process"].save()
            return Response({'Succeeded': 'Process Has Been Withdrew.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SprayCardCompleteView(APIView):
    serializer_class = SprayCardCompleteSerializer

    def post(self, request, format=None):
        records = request.data.pop("data")
        spraycard_serializer = self.serializer_class(data=request.data)

        if spraycard_serializer.is_valid():
            spray_card_process = spraycard_serializer.validated_data["spray_card_process"]
            with transaction.atomic():
                for arid in records.keys():
                    records[arid]["is_active"] = True
                    ApplicationRecord.objects.filter(arid=arid).update(**records[arid])

                spray_card_process.complete()
                spray_card_process.save()
            return Response({'Succeeded': 'Process Has Been Completed.'}, status=status.HTTP_200_OK)

        return Response(spraycard_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class SprayCardApproveView(APIView):
#     serializer_class = SprayApproveSerializer
#
#     def post(self, request, format=None):
#         serializer = self.serializer_class(data=request.data)
#
#         if serializer.is_valid():
#             data = serializer.validated_data
#             with transaction.atomic():
#                 data["spray_card_process"].approve()
#                 data["spray_card_process"].save()
#             return Response({'Succeeded': 'Process Has Been Approved.'}, status=status.HTTP_200_OK)
#
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
