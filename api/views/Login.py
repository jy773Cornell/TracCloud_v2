from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializers.UserSerializer import UserLoginSerializer
from api.models import User


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer

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
                    request.session["authed"] = True
                    request.session.set_expiry(60*60)
                    return Response({"Login Succeeded": "User Info Verified."}, status=status.HTTP_200_OK)

                return Response({'Login Failed': 'Wrong Password.'},
                                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

            return Response({'Login Failed': 'Invalid Username.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'},
                        status=status.HTTP_400_BAD_REQUEST)


class UserAuthCheck(APIView):
    serializer_class = UserLoginSerializer

    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if not request.session.get("authed"):
            return Response({'Auth Status': 'Unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'Auth Status': 'Authorized.'}, status=status.HTTP_200_OK)
