from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.UserSerializer import *
from api.models import *
from api.utils.ModelManager import model_delete, request_data_transform
from api.utils.UUIDGen import gen_uuid
from api.utils.RandomPassword import generate_random_string

'''
User
'''


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
            User(uid=uid, username=username, password=make_password(password), type_id=user_type, email=email,
                 added_by_id=uid).save()
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
                return Response({'Succeeded': 'User Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileUpdateView(APIView):
    serializer_class = UserProfileUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        uid = data.pop("uid")
        if uid:
            user = User.objects.filter(uid=uid, is_active=True)
            if user:
                user.update(**data)
                return Response({'Succeeded': 'User profile has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordChangeView(APIView):
    serializer_class = UserPasswordChangeSerializer

    @csrf_exempt
    def put(self, request, format=None):
        uid = request.data.get("uid")
        password = request.data.get("password")
        original_password = request.data.get("original_password")
        if uid and password and original_password:
            user = User.objects.filter(uid=uid, is_active=True)
            if user:
                if not check_password(original_password, user.first().password):
                    return Response({'Failed': 'Wrong original password.'}, status=status.HTTP_403_FORBIDDEN)

                user.update(password=make_password(password))
                return Response({'Succeeded': 'User password has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


'''
User Relation
'''


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

            if UserRelation.objects.filter(
                    Q(requester_id=requester, provider_id=provider, is_resolved=False)
                    | Q(requester_id=provider, provider_id=requester, is_resolved=False)):
                return Response({'Failed': 'User relation request already exists.'},
                                status=status.HTTP_406_NOT_ACCEPTABLE)

            if UserRelation.objects.filter(
                    Q(requester_id=requester, provider_id=provider, is_resolved=True, is_active=True)
                    | Q(requester_id=provider, provider_id=requester, is_resolved=True, is_active=True)):
                return Response({'Failed': 'User relation already exists.'},
                                status=status.HTTP_406_NOT_ACCEPTABLE)

            urid = gen_uuid("URID")
            UserRelation(urid=urid, requester_id=requester, provider_id=provider, type_id=relation_type,
                         added_by_id=requester).save()
            return Response({'Succeeded': 'User relation request created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserRelationCreateResponseView(APIView):
    serializer_class = UserRelationCreateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        urid = request.data.get("urid")
        requester = request.data.get("requester")
        provider = request.data.get("provider")
        is_active = True if request.data.get("is_active") == "true" else False
        if urid and requester and provider and is_active:
            relation = UserRelation.objects.filter(
                urid=urid, requester_id=requester, provider_id=provider, is_resolved=False)
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
                return Response({'Succeeded': 'User relation Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid urid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class UserRelationUpdateView(APIView):
    serializer_class = UserRelationUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        urid = request.data.get("urid")
        relation_type = request.data.get("type")
        if urid and relation_type:
            relation = UserRelation.objects.filter(urid=urid, is_resolved=True, is_active=True)
            if relation:
                relation.update(type_id=relation_type)
                return Response({'Succeeded': 'User relation has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid urid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class UserRelationDeleteView(APIView):
    serializer_class = UserRelationDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        urid = request.data.get("urid")
        requester = request.data.get("requester")
        provider = request.data.get("provider")
        if urid and requester and provider:
            relation = UserRelation.objects.filter(
                urid=urid, requester_id=requester, provider_id=provider, is_resolved=True, is_active=True)
            if relation:
                model_delete(relation)
                return Response({'Succeeded': 'Relation has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid urid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


'''
Dummy User
'''


class DummyUserCreate(APIView):
    serializer_class = DummyUserCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        username = data.get("username")
        user_type = data.get("type_id")
        added_by = data.get("added_by_id")
        relation_type = data.pop("relation_type")
        if username and user_type and added_by and relation_type:
            if User.objects.filter(username=username):
                return Response({'Failed': 'Username already exists.'}, status=status.HTTP_406_NOT_ACCEPTABLE)

            uid = gen_uuid("UID")
            data["uid"] = uid
            data["password"] = make_password(generate_random_string())
            data["is_active"] = True
            User(**data).save()

            urid = gen_uuid("URID")
            UserRelation(urid=urid, requester_id=added_by, provider_id=uid, type_id=relation_type,
                         added_by_id=added_by, is_resolved=True, is_active=True).save()
            return Response({'Succeeded': 'Dummy user account created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class DummyUserActivate(APIView):
    serializer_class = DummyUserActivateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        uid = request.data.get("uid")
        username = request.data.get("username")
        password = request.data.get("password")
        if uid and username and password:
            if User.objects.filter(Q(username=username, is_active=True) & ~Q(uid=uid)):
                return Response({'Failed': 'Username already exists.'}, status=status.HTTP_406_NOT_ACCEPTABLE)

            user = User.objects.filter(uid=uid, self_activated=False, is_active=True)
            if user:
                user.update(username=username, password=make_password(password), self_activated=True)
                return Response({'Succeeded': 'Dummy user has been self-activated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class DummyUserDeleteView(APIView):
    serializer_class = DummyUserDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        uid = request.data.get("uid")
        added_by = request.data.get("added_by")
        if uid and added_by:
            user = User.objects.filter(uid=uid, added_by_id=added_by, self_activated=False, is_active=True)
            if user:
                model_delete(user)
                relation = UserRelation.objects.filter(
                    Q(requester_id=uid, is_resolved=True, is_active=True)
                    | Q(provider_id=uid, is_resolved=True, is_active=True))
                if relation:
                    model_delete(relation)
                return Response({'Succeeded': 'Dummy user has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
