from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from api.utils.ModelManager import request_data_transform
from user_management.serializers.ClientVendorSerializer import *
from user_management.utils.NewAccount import *
from django.db.models import Q


class ClientVendorListGetView(APIView):
    serializer_class = ClientVendorGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)

        if uid:
            provider_ids = UserRelation.objects.filter(
                Q(requester__type__relation_type__name='Owner', provider__type__relation_type__name='Client') |
                Q(requester__type__relation_type__name='Client', provider__type__relation_type__name='Owner'),
                requester_id=uid, is_active=True
            ).values_list('provider', flat=True)
            requester_ids = UserRelation.objects.filter(
                Q(provider__type__relation_type__name='Owner', requester__type__relation_type__name='Client') |
                Q(provider__type__relation_type__name='Client', requester__type__relation_type__name='Owner'),
                provider_id=uid, is_active=True
            ).values_list('requester', flat=True)

            unique_ids = list(set(requester_ids).union(set(provider_ids)))
            user_profiles = UserProfile.objects.filter(uid__in=unique_ids)
            client_or_vendor_list = [self.serializer_class(profile).data for profile in user_profiles]

            return Response({'Succeeded': 'Client or Vendor List Fetched.', 'data': client_or_vendor_list},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ClientVendorConnectionDeleteView(APIView):
    serializer_class = ClientVendorDeleteSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            requester_id = serializer.validated_data['requester_id']
            client_vendor_id = serializer.validated_data['client_vendor_id']

            # Fetch the relation based on the validated data
            relation = UserRelation.objects.filter(
                Q(provider=requester_id, requester=client_vendor_id) |
                Q(provider=client_vendor_id, requester=requester_id),
                is_active=True
            )

            relation.delete()

            return Response({'Succeeded': 'Connection Deleted.'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
