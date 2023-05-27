from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.utils.UUIDGen import gen_uuid
from workflows.serializers.PasswordResetSerializer import *
from django.db import transaction


class PasswordResetRequestView(APIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            data["prpid"] = gen_uuid("PRPID")
            with transaction.atomic():
                pwd_reset_process = PasswordReset(**data)
                pwd_reset_process.send_email()
                pwd_reset_process.save()
            return Response({'Succeeded': 'Process Has Been Initiated.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, token=None, format=None):
        serializer = self.serializer_class(data=request.data, token=token)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data['pwd_reset_process'].update_password(data['new_password'])
                data['pwd_reset_process'].save()

            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
