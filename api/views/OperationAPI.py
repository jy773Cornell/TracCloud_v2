from django.core.cache import cache
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
            Operation(opid=opid, user_id=data.get("user_id"), type_id=operation_type).save()

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
        prid = data.pop("prid")
        if prid:
            purchase = PurchaseRecord.objects.filter(prid=prid, is_active=True)
            if purchase:
                purchase.update(**data)
                return Response({'Succeeded': 'Purchase record info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid prid'}, status=status.HTTP_404_NOT_FOUND)

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
class HarvestOperationCreateView(APIView):
    serializer_class = OperationCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        uid = request.data.get("user")
        operation_type = OperationType.objects.filter(name="Harvest", is_active=True).first()
        if uid:
            user = User.objects.filter(uid=uid, is_active=True)
            if user:
                opid = gen_uuid("OPID")
                Operation(opid=opid, user_id=uid, type=operation_type).save()
                return Response({'Succeeded': 'Harvest operation created.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid POST parameter'}, status=status.HTTP_400_BAD_REQUEST)


class HarvestCreateView(APIView):
    serializer_class = HarvestCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        serializer = HarvestCreateSerializer()
        fields = [field for field in serializer.fields if field not in ["rows", "tracing_no", "note", ]]
        if all(field in list(data.keys()) for field in fields):
            hrid = gen_uuid("HRID")
            data["hrid"] = hrid
            HarvestRecord(**data).save()
            return Response({'Succeeded': 'Harvest record create.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


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
                    type=OperationType.objects.filter(name="Harvest", is_active=True).first(),
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


class HarvestUpdateView(APIView):
    serializer_class = HarvestUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        hrid = data.pop("hrid")
        if hrid:
            harvest = HarvestRecord.objects.filter(hrid=hrid, is_active=True)
            if harvest:
                harvest.update(**data)
                return Response({'Succeeded': 'Harvest record info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid hrid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class HarvestOperationDeleteView(APIView):
    serializer_class = OperationDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        opid = request.data.get("opid")
        uid = request.data.get("user")
        operation_type = OperationType.objects.filter(name="Harvest", is_active=True).first()

        if opid and uid:
            operation = Operation.objects.filter(opid=opid, user_id=uid, type=operation_type, is_active=True)
            harvest = HarvestRecord.objects.filter(opid_id=opid, user_id=uid, is_active=True)
            if operation:
                model_delete(operation)
                if harvest:
                    model_delete(harvest)
                return Response({'Succeeded': 'Harvest operation have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)


class HarvestDeleteView(APIView):
    serializer_class = HarvestDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        uid = request.data.get("user")
        hrid = request.data.get("hrid")

        if uid and hrid:
            harvest = HarvestRecord.objects.filter(hrid=hrid, user_id=uid, is_active=True)
            if harvest:
                model_delete(harvest)
                return Response({'Succeeded': 'Harvest record have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid hrid'}, status=status.HTTP_404_NOT_FOUND)


# ApplicationRecord

class ApplicationCreateView(APIView):
    serializer_class = ApplicationCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        required_fields = ["user_id", "type_id", "chemid", "site_list"]
        if all(field in list(data.keys()) for field in required_fields):
            opid = gen_uuid("OPID")
            operation_type = cache.get("OperationType").find(name="Application")["optid"]
            Operation(opid=opid, user_id=data.get("user_id"), type_id=operation_type).save()

            site_list = data.pop("site_list")
            user_site_list = Site.objects.filter(uid=data.get("user_id")).alive().values()
            for site_id in site_list:
                save_data = data
                arid = gen_uuid("ARID")
                save_data.update(
                    {"opid_id": opid,
                     "arid": arid,
                     "site_id": site_id,
                     "crop_id": user_site_list.find(sid=site_id)["crop"],
                     })
                ApplicationRecord(**data).save()
            return Response({'Succeeded': 'Application record create.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class ApplicationGetView(APIView):
    serializer_class = ApplicationGetSerializer
    lookup_url_kwarg = "opid"

    def get(self, request, format=None):
        opid = request.GET.get(self.lookup_url_kwarg)
        if opid:
            application_list = ApplicationRecord.objects.filter(opid=opid).alive()
            if application_list:
                data = []
                for application in application_list:
                    data.append(ApplicationGetSerializer(application).data)
                return Response({'Succeeded': 'Application Records Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ApplicationListGetView(APIView):
    serializer_class = ApplicationGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid).alive()
            if user:
                op_application_list = Operation.objects.filter(
                    user_id=uid,
                    type_id=cache.get("OperationType").find(name="Application")["optid"]
                ).alive()
                application_list = ApplicationRecord.objects.filter(user_id=uid).alive()

                data = {}
                for op_application in op_application_list:
                    opid = op_application.opid
                    data[opid] = []
                    for application in application_list:
                        if application.opid == opid:
                            data[opid].append(ApplicationGetSerializer(application).data)
                return Response({'Succeeded': 'Application Record List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ApplicationUpdateView(APIView):
    serializer_class = ApplicationUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        arid = data.pop("arid")
        if arid:
            application = ApplicationRecord.objects.filter(arid=arid).alive()
            if application:
                application.update(**data)
                return Response({'Succeeded': 'Application record info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid arid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class ApplicationOperationDeleteView(APIView):
    serializer_class = OperationDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        opid = request.data.get("opid")
        uid = request.data.get("user")
        operation_type_id = cache.get("OperationType").find(name="Application")["optid"]

        if opid and uid:
            operation = Operation.objects.filter(opid=opid, user_id=uid, type_id=operation_type_id).alive()
            application = ApplicationRecord.objects.filter(opid_id=opid, user_id=uid).alive()
            if operation:
                operation.delete()
                if application:
                    application.delete()
                return Response({'Succeeded': 'Application operation have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid post data'}, status=status.HTTP_404_NOT_FOUND)


class ApplicationDeleteView(APIView):
    serializer_class = ApplicationDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        uid = request.data.get("user")
        arid = request.data.get("arid")

        if uid and arid:
            application = ApplicationRecord.objects.filter(arid=arid, user_id=uid).alive()
            if application:
                model_delete(application)
                return Response({'Succeeded': 'Application record have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid arid'}, status=status.HTTP_404_NOT_FOUND)


class ApplicationTypeGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("ApplicationType")
        return Response({'Succeeded': 'Application Type Info Fetched.', 'data': data}, status=status.HTTP_200_OK)


class DecisionSupportGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("DecisionSupport")
        return Response({'Succeeded': 'Decision Support Info Fetched.', 'data': data}, status=status.HTTP_200_OK)


class ApplicationTargetGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("ApplicationTarget")
        return Response({'Succeeded': 'Application Target Info Fetched.', 'data': data}, status=status.HTTP_200_OK)
