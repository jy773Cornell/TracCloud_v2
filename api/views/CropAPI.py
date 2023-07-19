from django.core.cache import cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.CropSerializer import *
from api.models import *
from api.utils.ModelManager import request_data_transform
from api.utils.UUIDGen import gen_uuid


class CropCreateView(APIView):
    serializer_class = CropCreateSerializer

    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("user_id") and data.get("crop_id") and data.get("variety_id"):
            cid = gen_uuid("CID")
            data["cid"] = cid
            Crop(**data).save()
            return Response({'Succeeded': 'Crop record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class CropGetView(APIView):
    serializer_class = CropGetSerializer
    lookup_url_kwarg = "cid"

    def get(self, request, format=None):
        cid = request.GET.get(self.lookup_url_kwarg)
        if cid:
            crop = Crop.objects.filter(cid=cid).alive().first()
            if crop:
                data = CropGetSerializer(crop).data
                return Response({'Succeeded': 'Crop Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid cid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class CropListGetView(APIView):
    serializer_class = CropGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = UserProfile.objects.filter(uid=uid).alive()
            if user:
                crop_list = Crop.objects.filter(user_id=uid).alive().order_by('-update_time')
                data = []
                for crop in crop_list:
                    data.append(CropGetSerializer(crop).data)
                return Response({'Succeeded': 'Crop List Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class CropUpdateView(APIView):
    serializer_class = CropUpdateSerializer

    def put(self, request, format=None):
        data = request_data_transform(request.data)
        cid = data.pop("cid")
        if cid:
            crop = Crop.objects.filter(cid=cid).alive()
            if crop:
                crop.update(**data)
                return Response({'Succeeded': 'Crop info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid cid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class CropDeleteView(APIView):
    serializer_class = CropDeleteSerializer

    def put(self, request, format=None):
        cid = request.data.get("cid")
        user = request.data.get("user")
        if cid and user:
            crop = Crop.objects.filter(cid=cid, user_id=user).alive()
            if crop:
                crop.delete()
                return Response({'Succeeded': 'Crop has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid cid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class CropCategoryGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("CropCategory")
        return Response({'Succeeded': 'Crop Category Info Fetched.', 'data': data}, status=status.HTTP_200_OK)


class CropVarietyGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("CropVariety")
        return Response({'Succeeded': 'Crop Variety Info Fetched.', 'data': data}, status=status.HTTP_200_OK)


class CropGrowthStageGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("CropGrowthStage")
        return Response({'Succeeded': 'Crop Growth Stage Info Fetched.', 'data': data}, status=status.HTTP_200_OK)
