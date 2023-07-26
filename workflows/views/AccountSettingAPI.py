from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from workflows.serializers.AccountSettingSerializer import *
from django.db import transaction


class UsernameChangeView(APIView):
    serializer_class = UsernameChangeSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["user"].username = data["new_username"]
                data["user"].save()
            return Response({'Succeeded': 'Username has been updated'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeView(APIView):
    serializer_class = PasswordChangeSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["user"].set_password(data["new_password"])
                data["user"].save()
            return Response({'Succeeded': 'Password has been updated'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
