from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.UserSerializer import *
from api.models import *
from api.utils.UUIDGen import gen_uuid


class UserCreateView(APIView):
    serializer_class = UserCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")
        user_type = request.data.get("type")
        email = request.data.get("email")
        if username and password and user_type and email:
            if User.objects.filter(username=username):
                return Response({'Failed': 'Username already exists.'},
                                status=status.HTTP_406_NOT_ACCEPTABLE)

            uid = gen_uuid("UID")
            User(uid=uid, username=username, password=password, type_id=user_type, email=email).save()
            User.objects.filter(uid=uid).update(added_by=uid)
            return Response({'Succeeded': 'User account created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserGetView(APIView):
    serializer_class = UserGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid, is_active=True).first()
            if user:
                data = UserGetSerializer(user).data
                data["type"] = UserType.objects.filter(utid=data["type"]).first().name
                return Response({'Succeeded': 'User Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserRelationCreateRequestView(APIView):
    serializer_class = UserRelationCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        requester = request.data.get("requester")
        provider = request.data.get("provider")
        relation_type = request.data.get("type")
        if requester and provider and relation_type:
            if requester == provider:
                return Response({'Bad Request': 'Requester and provider can not be the same user.'},
                                status=status.HTTP_400_BAD_REQUEST)

            requester = User.objects.filter(uid=requester).first()
            provider = User.objects.filter(uid=provider).first()
            if UserRelation.objects.filter(requester=requester, provider=provider, is_resolved=False) or \
                    UserRelation.objects.filter(requester=provider, provider=requester, is_resolved=False):
                return Response({'Failed': 'User relation request already exists.'},
                                status=status.HTTP_406_NOT_ACCEPTABLE)

            if UserRelation.objects.filter(requester=requester, provider=provider, is_resolved=True,
                                           is_active=True) or \
                    UserRelation.objects.filter(requester=provider, provider=requester, is_resolved=True,
                                                is_active=True):
                return Response({'Failed': 'User relation already exists.'},
                                status=status.HTTP_406_NOT_ACCEPTABLE)

            urid = gen_uuid("URID")
            UserRelation(urid=urid, requester=requester, provider=provider, type_id=relation_type,
                         added_by=requester).save()
            return Response({'Succeeded': 'User relation request created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserRelationCreateResponseView(APIView):
    serializer_class = UserRelationCreateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        urid = request.data.get("urid")
        provider = request.data.get("provider")
        is_active = True if request.data.get("is_active") == "true" else False
        provider = User.objects.filter(uid=provider).first()
        if urid and provider and is_active:
            relation = UserRelation.objects.filter(urid=urid, provider=provider, is_resolved=False)
            if not relation:
                return Response({'Failed': 'Invalid relation case'}, status=status.HTTP_404_NOT_FOUND)

            relation.update(is_active=is_active, is_resolved=True)
            return Response({'Succeeded': 'User relation request responded.', 'data': is_active},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserRelationGetView(APIView):
    serializer_class = UserRelationGetSerializer
    lookup_url_kwarg = "urid"

    def get(self, request, format=None):
        urid = request.GET.get(self.lookup_url_kwarg)
        if urid:
            relation = UserRelation.objects.filter(urid=urid, is_active=True).first()
            if relation:
                data = UserRelationGetSerializer(relation).data
                data["type"] = UserRelationType.objects.filter(urtid=data["type"]).first().name
                return Response({'Succeeded': 'User relation Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid urid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
