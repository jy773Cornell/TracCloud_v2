from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.SiteSerializer import *
from api.models import *
from api.utils.ModelManager import model_delete, request_data_transform
from api.utils.UUIDGen import gen_uuid


class SiteCreateView(APIView):
    serializer_class = SiteCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("user_id") and data.get("name") and data.get("type_id"):
            sid = gen_uuid("SID")
            data["sid"] = sid
            Site(**data).save()
            return Response({'Succeeded': 'Site record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteGetView(APIView):
    serializer_class = SiteGetSerializer
    lookup_url_kwarg = "sid"

    def get(self, request, format=None):
        sid = request.GET.get(self.lookup_url_kwarg)
        if sid:
            site = Site.objects.filter(sid=sid).alive().first()
            if site:
                data = SiteGetSerializer(site).data
                return Response({'Succeeded': 'Site Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid sid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SiteRootListGetView(APIView):
    serializer_class = SiteGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid).alive()
            if user:
                root_type_id = [site_type["stid"] for site_type in cache.get("SiteType")]
                site_root_list = Site.objects.filter(user_id=uid, type_id__in=root_type_id).alive()
                data = []
                for site in site_root_list:
                    data.append(SiteGetSerializer(site).data)
                return Response({'Succeeded': 'Site Root List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SiteChildListGetView(APIView):
    serializer_class = SiteGetSerializer
    lookup_url_kwarg1 = "uid"
    lookup_url_kwarg2 = "parent_sid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg1)
        parent_sid = request.GET.get(self.lookup_url_kwarg2)

        if uid and parent_sid:
            site_child_list = Site.objects.filter(user_id=uid, parent_id=parent_sid).alive()
            data = []
            for site in site_child_list:
                data.append(SiteGetSerializer(site).data)
            return Response({'Succeeded': 'Child Site List Info Fetched.', 'data': data},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SiteUpdateView(APIView):
    serializer_class = SiteUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        sid = data.pop("sid")
        if sid:
            site = Site.objects.filter(sid=sid, is_active=True)
            if site:
                site.update(**data)
                return Response({'Succeeded': 'Site info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid sid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteParentDeleteView(APIView):
    serializer_class = SiteDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        sid = request.data.get("sid")
        user = request.data.get("user")
        if sid and user:
            parent_site = Site.objects.filter(sid=sid, user_id=user, is_active=True)
            if parent_site:
                child_site = Site.objects.filter(parent_id=sid, user_id=user, is_active=True)
                model_delete(parent_site)
                model_delete(child_site)
                return Response({'Succeeded': 'Parent site and its child sites have been deleted.'},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid sid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteChildDeleteView(APIView):
    serializer_class = SiteDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        sid = request.data.get("sid")
        user = request.data.get("user")
        if sid and user:
            child_site = Site.objects.filter(sid=sid, user_id=user, is_active=True)
            if child_site:
                model_delete(child_site)
                return Response({'Succeeded': 'Child site has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid sid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteTypeGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("SiteType")
        return Response({'Succeeded': 'Site Type Info Fetched.', 'data': data}, status=status.HTTP_200_OK)
