from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from user_management.serializers.EmploySerializer import *


class AssigneeGetView(APIView):
    serializer_class = AssigneeGetSerializer
    lookup_url_kwarg1 = "uid"
    lookup_url_kwarg2 = "employer_id"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg1)
        employer_id = request.GET.get(self.lookup_url_kwarg2)

        if uid and employer_id:
            privilege = UserPrivilege.objects.get(user_id=uid)
            if privilege:
                unique_ids = [uid]
                if privilege.spraycard_a:
                    requester_ids = UserRelation.objects.filter(
                        requester_id=employer_id,
                        provider__type__relation_type__name='Employee').values_list('provider', flat=True)
                    provider_ids = UserRelation.objects.filter(
                        provider_id=employer_id,
                        requester__type__relation_type__name='Employee').values_list('requester', flat=True)

                    unique_ids += list(set(requester_ids).union(set(provider_ids)))

                user_profiles = UserProfile.objects.filter(uid__in=unique_ids)
                assignees = [self.serializer_class(profile).data for profile in user_profiles]

                return Response({'Succeeded': 'Assignee List Fetched.', 'data': assignees},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
