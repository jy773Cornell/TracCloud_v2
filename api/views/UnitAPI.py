from django.core.cache import cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class UnitGetView(APIView):
    def get(self, request, format=None):
        data = cache.get("Unit")
        return Response({'Succeeded': 'Chemical Product Base Info Fetched.', 'data': data}, status=status.HTTP_200_OK)
