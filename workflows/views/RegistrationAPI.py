from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.utils.UUIDGen import gen_uuid
from workflows.models import Registration
from workflows.serializers.RegistrationSerializer import RegistrationRequestSerializer


class RegistrationRequestView(APIView):
    serializer_class = RegistrationRequestSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data["rpid"] = gen_uuid("RPID")
            Registration(**data).save()
            return Response({'Succeeded': 'Process Has Been Initiated.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
