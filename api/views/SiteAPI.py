from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.SiteSerializer import *
from api.models import *
from api.utils.ModelManager import model_delete, request_data_transform
from api.utils.UUIDGen import gen_uuid


class SiteParentCreateView(APIView):
    serializer_class = SiteCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("user_id") and data.get("name") and data.get("type_id") \
                and data.get("size") and data.get("size_unit_id"):
            sid = gen_uuid("SID")
            data["sid"] = sid
            Site(**data).save()
            return Response({'Succeeded': 'Parent site record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteChildCreateView(APIView):
    serializer_class = SiteCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("user_id") and data.get("name") and data.get("type_id") and data.get("crop_id") \
                and data.get("size") and data.get("size_unit_id") and data.get("parent_id"):
            sid = gen_uuid("SID")
            data["sid"] = sid
            Site(**data).save()
            return Response({'Succeeded': 'Child site record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class SiteGetView(APIView):
    serializer_class = SiteGetSerializer
    lookup_url_kwarg = "sid"

    def get(self, request, format=None):
        sid = request.GET.get(self.lookup_url_kwarg)
        if sid:
            site = Site.objects.filter(sid=sid, is_active=True).first()
            if site:
                data = SiteGetSerializer(site).data
                return Response({'Succeeded': 'Site Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid sid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SiteParentListGetView(APIView):
    serializer_class = SiteGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid, is_active=True)
            if user:
                parent_type_list = list(SiteType.objects.filter(level=2, is_active=True).values_list('pk', flat=True))
                site_parent_list = Site.objects.filter(user_id=uid, type_id__in=parent_type_list, is_active=True)
                data = []
                for site in site_parent_list:
                    data.append(SiteGetSerializer(site).data)
                return Response({'Succeeded': 'Parent Site List Info Fetched.', 'data': data},
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
            parent_site = Site.objects.filter(sid=parent_sid, user_id=uid, is_active=True)
            if parent_site:
                site_child_list = Site.objects.filter(user_id=uid, parent_id=parent_sid, is_active=True)
                data = []
                for site in site_child_list:
                    data.append(SiteGetSerializer(site).data)
                return Response({'Succeeded': 'Child Site List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid or parent_sid'}, status=status.HTTP_404_NOT_FOUND)

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
