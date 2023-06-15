from django.core.cache import cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.OperationSerializer import *
from api.models import *
from django.utils import timezone
from api.utils.ModelManager import request_data_transform
from api.utils.UUIDGen import gen_uuid


# PurchaseRecord

class PurchaseCreateView(APIView):
    serializer_class = PurchaseCreateSerializer

    def post(self, request, format=None):
        data = request_data_transform(request.data)
        required_fields = ["user_id", "chemical_id", ]
        if all(field in list(data.keys()) for field in required_fields):
            opid = gen_uuid("OPID")
            operation_type = next((op_type["optid"] for op_type in cache.get("OperationType") if
                                   op_type["name"] == "Chemical Purchase Record"), None)
            Operation(opid=opid, user_id=data.get("user_id"), type_id=operation_type).save()

            data.update({
                "opid_id": opid,
                "prid": gen_uuid("PRID"),
            })
            PurchaseRecord(**data).save()
            return Response({'Succeeded': 'Purchase record create.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class PurchaseGetView(APIView):
    serializer_class = PurchaseGetSerializer
    lookup_url_kwarg = "prid"

    def get(self, request, format=None):
        prid = request.GET.get(self.lookup_url_kwarg)
        if prid:
            purchase = PurchaseRecord.objects.filter(prid=prid).alive().first()
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
            user = UserProfile.objects.filter(uid=uid).alive()
            if user:
                purchase_list = PurchaseRecord.objects.filter(user_id=uid).alive().order_by('-update_time')
                data = []
                for purchase in purchase_list:
                    data.append(PurchaseGetSerializer(purchase).data)
                return Response({'Succeeded': 'Purchase List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class PurchaseUpdateView(APIView):
    serializer_class = PurchaseUpdateSerializer

    def put(self, request, format=None):
        data = request_data_transform(request.data)
        prid = data.pop("prid")
        if prid:
            purchase = PurchaseRecord.objects.filter(prid=prid).alive()
            if purchase:
                operation = Operation.objects.filter(opid=purchase.first().opid_id).alive()
                operation.update(update_time=timezone.now())
                purchase.update(**data)
                return Response({'Succeeded': 'Purchase record info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid prid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class PurchaseDeleteView(APIView):
    serializer_class = PurchaseDeleteSerializer

    def put(self, request, format=None):
        prid = request.data.get("prid")
        user_id = request.data.get("user_id")
        if prid and user_id:
            purchase = PurchaseRecord.objects.filter(prid=prid, user_id=user_id).alive()
            if purchase:
                operation = Operation.objects.filter(opid=purchase.first().opid_id, user_id=user_id).alive()
                operation.delete()
                purchase.delete()
                return Response({'Succeeded': 'Purchase record has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


# HarvestRecord

class HarvestCreateView(APIView):
    serializer_class = HarvestCreateSerializer

    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("opid_id"):
            required_fields = ["user_id", "crop_id", "site_id"]
            if all(field in list(data.keys()) for field in required_fields):
                operation = Operation.objects.filter(opid_id=data.get("opid_id"), user_id=data.get("user_id")).alive()
                data.update({"hrid": gen_uuid("HRID"), })
                HarvestRecord(**data).save()
                operation.update(updatetime=timezone.now())
                return Response({'Succeeded': 'Harvest record create.'}, status=status.HTTP_201_CREATED)

            return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            required_fields = ["user_id", "crop_id", "site_list"]
            if all(field in list(data.keys()) for field in required_fields):
                opid = gen_uuid("OPID")
                operation_type = next((op_type["optid"] for op_type in cache.get("OperationType") if
                                       op_type["name"] == "Harvest"), None)
                Operation(opid=opid, user_id=data.get("user_id"), type_id=operation_type).save()
                site_list = data.pop("site_list")

                for site_id in site_list:
                    save_data = data
                    save_data.update({
                        "opid_id": opid,
                        "hrid": gen_uuid("HRID"),
                        "site_id": site_id,
                    })
                    HarvestRecord(**save_data).save()
                return Response({'Succeeded': 'Harvest record create.'}, status=status.HTTP_201_CREATED)

            return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class HarvestGetView(APIView):
    serializer_class = HarvestGetSerializer
    lookup_url_kwarg = "opid"

    def get(self, request, format=None):
        opid = request.GET.get(self.lookup_url_kwarg)
        if opid:
            harvest_list = HarvestRecord.objects.filter(opid=opid).alive()
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
            user = UserProfile.objects.filter(uid=uid).alive()
            if user:
                op_harvest_list = Operation.objects.filter(
                    user_id=uid,
                    type_id=next((op_type["optid"] for op_type in cache.get("OperationType") if
                                  op_type["name"] == "Harvest"), None)
                ).alive().order_by('-update_time')
                harvest_list = HarvestRecord.objects.filter(user_id=uid).alive().order_by('-update_time')

                data = []
                for op_harvest in op_harvest_list:
                    for harvest in harvest_list:
                        if harvest.opid == op_harvest:
                            data.append(HarvestGetSerializer(harvest).data)
                return Response({'Succeeded': 'Harvest Record List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class HarvestUpdateView(APIView):
    serializer_class = HarvestUpdateSerializer

    def put(self, request, format=None):
        data = request_data_transform(request.data)
        hrid = data.pop("hrid")

        if hrid:
            harvest = HarvestRecord.objects.filter(hrid=hrid).alive()
            if harvest:
                operation = Operation.objects.filter(opid=harvest.first().opid_id).alive()
                operation.update(update_time=timezone.now())
                harvest.update(**data)
                return Response({'Succeeded': 'Harvest record info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid hrid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class HarvestDeleteView(APIView):
    serializer_class = HarvestDeleteSerializer

    def put(self, request, format=None):
        uid = request.data.get("user_id")
        opid = request.data.get("opid")
        hrid = request.data.get("hrid")
        operation_type_id = next((op_type["optid"] for op_type in cache.get("OperationType") if
                                  op_type["name"] == "Harvest"), None)

        if opid and uid:
            operation = Operation.objects.filter(opid=opid, user_id=uid, type_id=operation_type_id).alive()
            if operation:
                operation.delete()
                return Response({'Succeeded': 'Harvest operation have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        elif hrid and uid:
            harvest = HarvestRecord.objects.filter(hrid=hrid, user_id=uid).alive()
            if harvest:
                opid = harvest.first().opid
                harvest.delete()
                if not HarvestRecord.objects.filter(opid=opid).alive():
                    Operation.objects.filter(opid=opid).alive().delete()
                return Response({'Succeeded': 'Harvest record have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid hrid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


# ApplicationRecord

class ApplicationCreateView(APIView):
    serializer_class = ApplicationCreateSerializer

    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("opid_id"):
            required_fields = ["user_id", "crop_id", "site_id", "chemical_purchase_id"]
            if all(field in list(data.keys()) for field in required_fields):
                operation = Operation.objects.filter(opid_id=data.get("opid_id"), user_id=data.get("user_id")).alive()
                data.update({"arid": gen_uuid("ARID"), })
                ApplicationRecord(**data).save()
                operation.update(updatetime=timezone.now())
                return Response({'Succeeded': 'Application record create.'}, status=status.HTTP_201_CREATED)

            return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            required_fields = ["user_id", "crop_id", "site_list", "chemical_purchase_id"]
            if all(field in list(data.keys()) for field in required_fields):
                opid = gen_uuid("OPID")
                operation_type = next((op_type["optid"] for op_type in cache.get("OperationType") if
                                       op_type["name"] == "Application"), None)
                Operation(opid=opid, user_id=data.get("user_id"), type_id=operation_type).save()
                site_list = data.pop("site_list")

                for site_id in site_list:
                    save_data = data
                    save_data.update({
                        "opid_id": opid,
                        "arid": gen_uuid("ARID"),
                        "site_id": site_id,
                    })
                    ApplicationRecord(**save_data).save()
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
            user = UserProfile.objects.filter(uid=uid).alive()
            if user:
                op_application_list = Operation.objects.filter(
                    user_id=uid,
                    type_id=next((op_type["optid"] for op_type in cache.get("OperationType") if
                                  op_type["name"] == "Spray"), None)
                ).alive().order_by('-update_time')
                application_list = ApplicationRecord.objects.filter(user_id=uid).alive().order_by('-update_time')

                data = []
                for op_application in op_application_list:
                    for application in application_list:
                        if application.opid == op_application:
                            data.append(ApplicationGetSerializer(application).data)
                return Response({'Succeeded': 'Application Record List Info Fetched.', 'data': data},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ApplicationUpdateView(APIView):
    serializer_class = ApplicationUpdateSerializer

    def put(self, request, format=None):
        data = request_data_transform(request.data)
        arid = data.pop("arid")

        if arid:
            application = ApplicationRecord.objects.filter(arid=arid).alive()
            if application:
                operation = Operation.objects.filter(opid=application.first().opid_id).alive()
                operation.update(update_time=timezone.now())
                application.update(**data)
                return Response({'Succeeded': 'Application record info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid arid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class ApplicationDeleteView(APIView):
    serializer_class = ApplicationDeleteSerializer

    def put(self, request, format=None):
        uid = request.data.get("user_id")
        opid = request.data.get("opid")
        arid = request.data.get("arid")
        operation_type_id = next((op_type["optid"] for op_type in cache.get("OperationType") if
                                  op_type["name"] == "Application"), None)

        if opid and uid:
            operation = Operation.objects.filter(opid=opid, user_id=uid, type_id=operation_type_id).alive()
            if operation:
                operation.delete()
                return Response({'Succeeded': 'Application operation have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid opid'}, status=status.HTTP_404_NOT_FOUND)

        elif arid and uid:
            application = ApplicationRecord.objects.filter(arid=arid, user_id=uid).alive()
            if application:
                opid = application.first().opid
                application.delete()
                if not ApplicationRecord.objects.filter(opid=opid).alive():
                    Operation.objects.filter(opid=opid).alive().delete()
                return Response({'Succeeded': 'Application record have been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid arid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


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
