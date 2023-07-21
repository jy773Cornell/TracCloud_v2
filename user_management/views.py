from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from user_management.serializer import *


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
