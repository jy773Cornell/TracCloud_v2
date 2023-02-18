from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.OperationSerializer import *
from api.models import *
from api.utils.ModelManager import model_delete, request_data_transform
from api.utils.UUIDGen import gen_uuid


# PurchaseRecord

class PurchaseCreateView(APIView):
    serializer_class = PurchaseCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        serializer = PurchaseCreateSerializer()
        fields = [field for field in serializer.fields if field not in ["operation_type", "note", ]]
        if all(field in list(data.keys()) for field in fields):
            opid = gen_uuid("OPID")
            operation_type = serializer.get_operation_type()
            Operation(opid=opid, user_id=data.get("user_id"), type_id=operation_type, multiple_site=False).save()

            prid = gen_uuid("PRID")
            data["prid"] = prid
            data["opid_id"] = opid
            PurchaseRecord(**data).save()
            return Response({'Succeeded': 'Purchase record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
