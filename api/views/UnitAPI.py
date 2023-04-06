from django.core.cache import cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class UnitGetView(APIView):
    lookup_url_kwarg = "usage"

    def get(self, request, format=None):
        usage = request.GET.get(self.lookup_url_kwarg)
        if usage:
            data = [unit for unit in cache.get("Unit") if unit["usage"] == usage]
        else:
            data = cache.get("Unit")

        return Response({'Succeeded': 'Unit Info Fetched.', 'data': data}, status=status.HTTP_200_OK)
