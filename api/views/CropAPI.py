from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.CropSerializer import *
from api.models import *
from api.utils.ModelManager import model_delete, request_data_transform
from api.utils.UUIDGen import gen_uuid


class CropCreateView(APIView):
    serializer_class = CropCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("user_id") and data.get("crop_id") and data.get("variety_id") \
                and data.get("lifecycle_id") and data.get("growth_stage_id"):
            cid = gen_uuid("CID")
            data["cid"] = cid
            Crop(**data).save()
            return Response({'Succeeded': 'Crop record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
