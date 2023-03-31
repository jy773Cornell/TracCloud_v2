from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.EquipmentSerializer import *
from api.models import *
from api.utils.ModelManager import model_delete, request_data_transform
from api.utils.UUIDGen import gen_uuid


class EquipmentCreateView(APIView):
    serializer_class = EquipmentCreateSerializer

    @csrf_exempt
    def post(self, request, format=None):
        data = request_data_transform(request.data)
        if data.get("user_id") and data.get("name") and data.get("owner"):
            eid = gen_uuid("EID")
            data["eid"] = eid
            Equipment(**data).save()
            return Response({'Succeeded': 'Equipment record created.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class EquipmentGetView(APIView):
    serializer_class = EquipmentGetSerializer
    lookup_url_kwarg = "eid"

    def get(self, request, format=None):
        eid = request.GET.get(self.lookup_url_kwarg)
        if eid:
            equipment = Equipment.objects.filter(eid=eid).alive().first()
            if equipment:
                data = EquipmentGetSerializer(equipment).data
                return Response({'Succeeded': 'Equipment Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid eid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class EquipmentListGetView(APIView):
    serializer_class = EquipmentGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = User.objects.filter(uid=uid).alive()
            if user:
                equipment_list = Equipment.objects.filter(user_id=uid).alive()
                data = []
                for equipment in equipment_list:
                    data.append(EquipmentGetSerializer(equipment).data)
                return Response({'Succeeded': 'Equipment List Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class EquipmentUpdateView(APIView):
    serializer_class = EquipmentUpdateSerializer

    @csrf_exempt
    def put(self, request, format=None):
        data = request_data_transform(request.data)
        eid = data.pop("eid")
        if eid:
            equipment = Equipment.objects.filter(eid=eid).alive()
            if equipment:
                equipment.update(**data)
                return Response({'Succeeded': 'Equipment info has been updated.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid eid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


class EquipmentDeleteView(APIView):
    serializer_class = EquipmentDeleteSerializer

    @csrf_exempt
    def put(self, request, format=None):
        eid = request.data.get("eid")
        user = request.data.get("user")
        if eid and user:
            equipment = Equipment.objects.filter(eid=eid, user_id=user).alive()
            if equipment:
                equipment.delete()
                return Response({'Succeeded': 'Equipment has been deleted.'}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid eid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)
