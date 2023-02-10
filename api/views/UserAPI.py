from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.UserSerializer import UserCreateSerializer, UserGetInfoSerializer
from api.models import User, UserType
from api.utils.UUIDGen import gen_uuid


class UserCreateView(APIView):
    serializer_class = UserCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = request.data.get("username")
        password = request.data.get("password")
        user_type = request.data.get("type")
        email = request.data.get("email")
        if username and password and user_type and email:
            if User.objects.filter(username=username).first():
                return Response({'Failed': 'Username already exists.'},
                                status=status.HTTP_406_NOT_ACCEPTABLE)

            User(uid=gen_uuid("UID"), username=username, password=password, type_id=user_type, email=email).save()
            return Response({'Succeeded': 'User account created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserGetInfoView(APIView):
    serializer_class = UserGetInfoSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid).first()
            if user:
                data = UserGetInfoSerializer(user).data
                data["type"] = UserType.objects.filter(utid=data["type"]).first().name
                return Response({'Succeeded': 'User Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
