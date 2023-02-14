from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializers.UserSerializer import UserLoginSerializer
from api.models import User
from api.utils.Token import make_token


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    normal_expiry_sec = 60 * 60 * 24
    remember_expiry_sec = 60 * 60 * 24 * 7

    @csrf_exempt
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = request.data.get("username")
        password = request.data.get("password")
        remember = request.data.get("remember")
        if username and password:
            user = User.objects.filter(username=username).first()
            if user:
                if password == user.password:
                    expiry = self.remember_expiry_sec if remember else self.normal_expiry_sec
                    token = make_token(username, expiry)
                    request.session["token"] = token
                    request.session["uid"] = user.uid
                    request.session.set_expiry(expiry)

                    return Response({"Succeeded": "User Info Verified.", "token": token},
                                    status=status.HTTP_200_OK)

                return Response({'Failed': 'Wrong Password.'},
                                status=status.HTTP_403_FORBIDDEN)

            return Response({'Failed': 'Invalid Username.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'},
                        status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    @csrf_exempt
    def delete(self, request, format=None):
        if self.request.session.exists(self.request.session.session_key):
            self.request.session.delete()

        return Response({'Succeeded': 'Session Has Been Cleared.'}, status=status.HTTP_200_OK)


class UserAuthCheckView(APIView):
    @csrf_exempt
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if not request.data.get("token"):
            return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.session.get("token") or request.session.get("token") != request.data.get("token"):
            return Response({'Failed': 'Unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'Succeeded': 'Authorized.', "uid": request.session.get("uid")}, status=status.HTTP_200_OK)
