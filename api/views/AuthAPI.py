from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.UserSerializer import UserLoginSerializer
from api.utils.Token import make_token
from api.models import UserProfile
from django.contrib.auth import authenticate, login, logout


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
            user = authenticate(request, username=username, password=password)
            if user:
                if user.is_active:
                    login(request, user)
                    expiry = self.remember_expiry_sec if remember else self.normal_expiry_sec
                    token = make_token(username, expiry)
                    request.session["token"] = token
                    request.session.set_expiry(expiry)

                    return Response({"Succeeded": "User Info Verified.", "token": token},
                                    status=status.HTTP_200_OK)

                return Response({'Failed': 'User account is not active.'},
                                status=status.HTTP_403_FORBIDDEN)

            return Response({'Failed': 'Invalid Username or Password.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    def delete(self, request, format=None):
        logout(request)
        return Response({'Succeeded': 'Session Has Been Cleared.'}, status=status.HTTP_200_OK)


class UserAuthCheckView(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            uid = UserProfile.objects.get(user=request.user).uid
            return Response({'Succeeded': 'Authorized.', "uid": uid}, status=status.HTTP_200_OK)
        else:
            return Response({'Failed': 'Unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
