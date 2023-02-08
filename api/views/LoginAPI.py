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
    expiry_sec = 60 * 60

    @csrf_exempt
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = request.data.get("username")
        password = request.data.get("password")
        if username and password:
            user = User.objects.filter(username=username).first()
            if user:
                if password == user.password:
                    token = make_token(username, self.expiry_sec)
                    request.session["token"] = token
                    request.session.set_expiry(self.expiry_sec)
                    return Response({"Login Succeeded": "User Info Verified.", "token": token},
                                    status=status.HTTP_200_OK)

                return Response({'Login Failed': 'Wrong Password.'},
                                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

            return Response({'Login Failed': 'Invalid Username.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'},
                        status=status.HTTP_400_BAD_REQUEST)


class UserAuthCheckView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if not request.data.get("token"):
            return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.session.get("token") and request.session.get("token") == request.data.get("token"):
            return Response({'Auth Status': 'Unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'Auth Status': 'Authorized.'}, status=status.HTTP_200_OK)
