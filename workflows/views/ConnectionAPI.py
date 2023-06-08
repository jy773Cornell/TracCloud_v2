from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from workflows.serializers.ConnectionSerializer import *
from django.db import transaction


class ConnectionInitiateView(APIView):
    serializer_class = ConnectionInitiateSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                connection_process = Connection(cpid=data["cpid"])
                connection_process.initiate(data["requester"], data["provider"], data["relation_type"])
                connection_process.save()
            return Response({'Succeeded': 'Process Has Been Initiated.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConnectionApproveView(APIView):
    serializer_class = ConnectionApproveSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["connection_process"].approve()
                data["connection_process"].save()
            return Response({'Succeeded': 'Process Has Been Approved.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConnectionRejectView(APIView):
    serializer_class = ConnectionRejectSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["connection_process"].reject()
                data["connection_process"].save()
            return Response({'Succeeded': 'Process Has Been Rejected.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
