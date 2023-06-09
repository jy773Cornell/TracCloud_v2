from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from workflows.serializers.UserTreeSerializer import *
from workflows.utils.UserTree import UserTree


class UserSubTreeGetView(APIView):
    serializer_class = UserTreeSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = UserProfile.objects.filter(uid=uid).alive()
            if user:
                user_tree = UserTree(uid)
                data = {uid: user_tree.subtree_to_dict(uid)}
                return Response({'Succeeded': 'User Sub Tree Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
