from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from workflows.serializers.SprayCardSerializer import *
from django.db import transaction


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
                data = []
                for assignment in spray_card_assign_list:
                    data.append(self.serializer_class(assignment.spray_card).data)
                return Response({'Succeeded': 'Spray Card Process List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


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
            return Response({'Succeeded': 'Process Has Been Initiated.'}, status=status.HTTP_200_OK)

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
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["spray_card_process"].complete()
                data["spray_card_process"].save()
            return Response({'Succeeded': 'Process Has Been Completed.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
