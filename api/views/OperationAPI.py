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


class PurchaseGetView(APIView):
    serializer_class = PurchaseGetSerializer
    lookup_url_kwarg = "opid"

    def get(self, request, format=None):
        opid = request.GET.get(self.lookup_url_kwarg)
        if opid:
            purchase = PurchaseRecord.objects.filter(opid=opid, is_active=True).first()
            if purchase:
                data = PurchaseGetSerializer(purchase).data
                return Response({'Succeeded': 'Purchase Record Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class PurchaseListGetView(APIView):
    serializer_class = PurchaseGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid, is_active=True)
            if user:
                purchase_list = PurchaseRecord.objects.filter(user_id=uid, is_active=True)
                data = []
                for purchase in purchase_list:
                    data.append(PurchaseGetSerializer(purchase).data)
                return Response({'Succeeded': 'Purchase List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class PurchaseUpdateView(APIView):
    serializer_class = PurchaseUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        opid = data.pop("opid")
        if opid:
            purchase = PurchaseRecord.objects.filter(opid=opid, is_active=True)
            if purchase:
                purchase.update(**data)
                return Response({'Succeeded': 'Purchase record info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class PurchaseDeleteView(APIView):
    serializer_class = PurchaseDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        opid = request.data.get("opid")
        user = request.data.get("user")
        if opid and user:
            operation = Operation.objects.filter(opid=opid, user_id=user, is_active=True)
            purchase = PurchaseRecord.objects.filter(opid=opid, user_id=user, is_active=True)
            if operation and purchase:
                model_delete(operation)
                model_delete(purchase)
                return Response({'Succeeded': 'Purchase record has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


# HarvestRecord

class HarvestCreateView(APIView):
    serializer_class = HarvestCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        harvest_list = request.data
        if type(harvest_list) == list:
            serializer = HarvestCreateSerializer()
            fields = [field for field in serializer.fields if field not in ["operation_type", "tracing_no", "note", ]]
            for harvest in harvest_list:
                if not all(field in list(harvest.keys()) for field in fields):
                    return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)

            opid = gen_uuid("OPID")
            operation_type = serializer.get_operation_type()
            Operation(opid=opid, user_id=harvest_list[0].get("user_id"), type_id=operation_type,
                      multiple_site=(len(harvest_list) > 1)).save()

            for harvest in harvest_list:
                hrid = gen_uuid("HRID")
                harvest["hrid"] = hrid
                harvest["opid_id"] = opid
                HarvestRecord(**harvest).save()
            return Response({'Succeeded': 'Harvest records created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data, should be a list data'}, status=status.HTTP_400_BAD_REQUEST)


class HarvestGetView(APIView):
    serializer_class = HarvestGetSerializer
    lookup_url_kwarg = "opid"

    def get(self, request, format=None):
        opid = request.GET.get(self.lookup_url_kwarg)
        if opid:
            harvest_list = HarvestRecord.objects.filter(opid=opid, is_active=True)
            if harvest_list:
                data = []
                for harvest in harvest_list:
                    data.append(HarvestGetSerializer(harvest).data)
                return Response({'Succeeded': 'Harvest Records Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class HarvestListGetView(APIView):
    serializer_class = HarvestGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid, is_active=True)
            if user:
                op_harvest_list = Operation.objects.filter(
                    user_id=uid,
                    type_id=OperationType.objects.filter(name="Harvest", is_active=True).first().optid,
                    is_active=True)
                data = {}

                for op_harvest in op_harvest_list:
                    opid = op_harvest.opid
                    op_str = op_harvest.__str__()
                    data[op_str] = []
                    harvest_list = HarvestRecord.objects.filter(opid=opid, is_active=True)
                    for harvest in harvest_list:
                        data[op_str].append(HarvestGetSerializer(harvest).data)
                return Response({'Succeeded': 'Harvest Record List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
