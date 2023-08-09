from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from user_management.serializers.PrivilegeSerializer import *
from user_management.utils.NewAccount import *


class PrivilegeGetView(APIView):
    serializer_class = PrivilegeGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            privilege = UserPrivilege.objects.filter(user_id=uid).first()
            if privilege:
                data = self.serializer_class(privilege).data
                return Response({'Succeeded': 'Privilege Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class PrivilegeUpdateView(APIView):
    serializer_class = PrivilegeUpdateSerializer

    def post(self, request, format=None):
        uid = request.data.get("user_id")

        if uid:
            privilege = UserPrivilege.objects.filter(user_id=uid)
            serializer = self.serializer_class(data=request.data)
            if privilege and serializer.is_valid():
                privilege.update(**serializer.data)
                return Response({'Succeeded': 'Privilege Info Updated.'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid Post parameter'}, status=status.HTTP_400_BAD_REQUEST)
