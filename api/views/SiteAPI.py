from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.SiteSerializer import *
from api.models import *
from api.utils.ModelManager import request_data_transform
from api.utils.UUIDGen import gen_uuid
from api.utils.SiteTree import site_tree_data


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


class SiteListGetView(APIView):
    serializer_class = SiteGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid).alive()
            if user:
                site_list = Site.objects.filter(user_id=uid).alive()
                user_crop_list = Crop.objects.filter(user_id=uid).alive()
                data = site_tree_data(site_list, user_crop_list)
                return Response({'Succeeded': 'Site List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SiteUpdateView(APIView):
    serializer_class = SiteUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        sid = data.pop("sid")
        if sid:
            site = Site.objects.filter(sid=sid).alive()
            if site:
                site.update(**data)
                return Response({'Succeeded': 'Site info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid sid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteDeleteView(APIView):
    serializer_class = SiteDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        sid = request.data.get("sid")
        user = request.data.get("user")
        if sid and user:
            site = Site.objects.filter(sid=sid, user_id=user).alive()
            if site:
                site.delete()
                return Response({'Succeeded': 'Site has been deleted.'},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid sid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteTypeGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("SiteType")
        return Response({'Succeeded': 'Site Type Info Fetched.', 'data': data}, status=status.HTTP_200_OK)
