import pytrie
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from user_management.serializers.ClientVendorSerializer import *
from user_management.utils.NewAccount import *
from django.db.models import Q


class ConnectionSearchAPIView(APIView):
    serializer_class = ConnectionGetSerializer
    lookup_url_kwarg1 = "search_username"
    lookup_url_kwarg2 = "request_user_id"

    def get(self, request, format=None):
        search_username = request.GET.get(self.lookup_url_kwarg1)
        request_user_id = request.GET.get(self.lookup_url_kwarg2)

        if search_username and request_user_id:
            # filter request user and employee users
            valid_users = UserProfile.objects.filter(
                type__relation_type__name__in=["Owner", "Client"],
            ).exclude(uid=request_user_id).alive()

            # Create a trie and insert user values
            trie = pytrie.StringTrie()
            for user in valid_users:
                user_info = self.serializer_class(user).data
                trie[user_info["user"]] = user_info

            search_keys = trie.keys(prefix=search_username)
            response_user_list = [trie[key] for key in search_keys]
            return Response({'Succeeded': 'User Option List Fetched.', 'data': response_user_list},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


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
