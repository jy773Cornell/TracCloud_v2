from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.ChemicalSerializer import *
from api.models import *
from api.utils.ModelManager import model_delete, request_data_transform
from api.utils.UUIDGen import gen_uuid


class ChemicalCreateView(APIView):
    serializer_class = ChemicalCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("user_id") \
                and data.get("type") \
                and data.get("trade_name") \
                and data.get("company") \
                and data.get("epa_reg_no") \
                and data.get("active_ingredient") \
                and data.get("percent_ai") \
                and data.get("rei") \
                and data.get("phi"):
            chemid = gen_uuid("ChemID")
            data["chemid"] = chemid
            Chemical(**data).save()
            return Response({'Succeeded': 'Chemical record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class ChemicalGetView(APIView):
    serializer_class = ChemicalGetSerializer
    lookup_url_kwarg = "chemid"

    def get(self, request, format=None):
        chemid = request.GET.get(self.lookup_url_kwarg)
        if chemid:
            chemical = Chemical.objects.filter(chemid=chemid).alive().first()
            if chemical:
                data = ChemicalGetSerializer(chemical).data
                return Response({'Succeeded': 'Chemical Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid chemid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ChemicalListGetView(APIView):
    serializer_class = ChemicalGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid).alive()
            if user:
                chemical_list = Chemical.objects.filter(user_id=uid).alive().order_by('-update_time')
                data = []
                for chemical in chemical_list:
                    data.append(ChemicalGetSerializer(chemical).data)
                return Response({'Succeeded': 'Chemical List Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ChemicalUpdateView(APIView):
    serializer_class = ChemicalUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        chemid = data.pop("chemid")
        if chemid:
            chemical = Chemical.objects.filter(chemid=chemid).alive()
            if chemical:
                chemical.update(**data)
                return Response({'Succeeded': 'Chemical info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid cid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class ChemicalDeleteView(APIView):
    serializer_class = ChemicalDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        chemid = request.data.get("chemid")
        user = request.data.get("user")
        if chemid and user:
            chemical = Chemical.objects.filter(chemid=chemid, user_id=user).alive()
            if chemical:
                chemical.delete()
                return Response({'Succeeded': 'Chemical has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid cid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class ChemicalProductBaseGetView(APIView):
    lookup_url_kwarg = "reg_no"

    def get(self, request, format=None):
        reg_no = request.GET.get(self.lookup_url_kwarg)
        if reg_no:
            data = [item for item in cache.get("ChemicalProductBase") if reg_no in item['epa_reg_no_dec']]
            return Response({'Succeeded': 'Chemical Product Base Info Fetched.', 'data': data},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
