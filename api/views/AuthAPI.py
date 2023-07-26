from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.middleware.csrf import get_token
from api.serializers.UserSerializer import UserLoginSerializer
from api.utils.Token import make_token
from api.models import UserProfile
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User


class CSRFTokenView(APIView):
    def get(self, request, format=None):
        csrf_token = get_token(request)
        return Response({'csrfToken': csrf_token})


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    normal_expiry_sec = 60 * 60 * 24
    remember_expiry_sec = 60 * 60 * 24 * 7

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = request.data.get("username")
        password = request.data.get("password")
        remember = request.data.get("remember")
        if username and password:
            try:
                User.objects.get(username=username)
            except ObjectDoesNotExist:
                return Response({'Failed': 'Invalid Username.'}, status=status.HTTP_404_NOT_FOUND)

            user = authenticate(request, username=username, password=password)
            if user and user.is_active:
                login(request, user)
                expiry = self.remember_expiry_sec if remember else self.normal_expiry_sec
                token = make_token(username, expiry)
                request.session["token"] = token
                request.session.set_expiry(expiry)
                uid = UserProfile.objects.get(user=request.user).uid

                return Response({"Succeeded": "User Info Verified.", "token": token, "uid": uid},
                                status=status.HTTP_200_OK)

            else:
                return Response({'Failed': 'Wrong Password Or Not Active.'}, status=status.HTTP_403_FORBIDDEN)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    def delete(self, request, format=None):
        logout(request)
        return Response({'Succeeded': 'Session Has Been Cleared.'}, status=status.HTTP_200_OK)


class UserAuthCheckView(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            user = UserProfile.objects.get(user=request.user)
            return Response({'Succeeded': 'Authorized.', "uid": user.uid, "type": user.type.name},
                            status=status.HTTP_200_OK)
        else:
            return Response({'Failed': 'Unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
