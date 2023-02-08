from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializers.UserSerializer import UserCreateSerializer
from api.models import User
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
                return Response({'Registration Failed': 'Username already exists.'},
                                status=status.HTTP_406_NOT_ACCEPTABLE)

            User(uid=gen_uuid("UID"), username=username, password=password, type_id=user_type, email=email).save()
            return Response({'Registration Succeed': 'User account created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
