from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.utils.ModelManager import request_data_transform
from api.utils.UUIDGen import gen_uuid
from user_management.serializers.EmploySerializer import *
from user_management.utils.NewAccount import *
from django.db import transaction


class EmployeeListGetView(APIView):
    serializer_class = EmployeeGetSerializer
    lookup_url_kwarg = "employer_id"

    def get(self, request, format=None):
        employer_id = request.GET.get(self.lookup_url_kwarg)

        if employer_id:
            requester_ids = UserRelation.objects.filter(
                requester_id=employer_id,
                provider__type__relation_type__name='Employee').values_list('provider', flat=True)
            provider_ids = UserRelation.objects.filter(
                provider_id=employer_id,
                requester__type__relation_type__name='Employee').values_list('requester', flat=True)

            unique_ids = list(set(requester_ids).union(set(provider_ids)))
            user_profiles = UserProfile.objects.filter(uid__in=unique_ids)
            employees = [self.serializer_class(profile).data for profile in user_profiles]

            return Response({'Succeeded': 'Employee List Fetched.', 'data': employees},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class EmployeeCreateView(APIView):
    serializer_class = EmployeeCreateSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = request_data_transform(request.data)
            employer_id = data.pop("employer_id")
            added_by_id = data.pop("added_by_id")

            with transaction.atomic():
                # Create new user

                username = generate_random()
                password = generate_random()
                user = User.objects.create_user(
                    username=username,
                    email=data["email"],
                    password=password
                )

                # Create new user profile

                uid = gen_uuid("UID")
                UserProfile.objects.create(uid=uid, user=user, added_by_id=added_by_id, **data)

                # Create relation

                urid = gen_uuid("URID")
                UserRelation(urid=urid, requester_id=employer_id, provider_id=uid).save()

                # Set default privilege

                uroid = gen_uuid("UROID")
                privilege = default_privilege(data["type_id"])
                UserPrivilege.objects.create(uroid=uroid, user_id=uid, **privilege)

                # Email employee

                new_account_notify(data["first_name"], data["last_name"], username, password, data["email"])

            return Response({'Succeeded': 'Employee Created.'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDeleteView(APIView):
    serializer_class = EmployeeDeleteSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = request_data_transform(request.data)
            employer_id = data["employer_id"]
            employee_id = data["employee_id"]

            employee_to_be_deleted = UserProfile.objects.filter(uid=employee_id, added_by_id=employer_id).first()
            username = employee_to_be_deleted.user.username
            email = employee_to_be_deleted.email
            first_name = employee_to_be_deleted.first_name
            last_name = employee_to_be_deleted.last_name
            if employee_to_be_deleted:
                employee_to_be_deleted.user.delete()
                delete_account_notify(username, first_name, last_name, email)
                return Response({'Succeeded': 'Employee Deleted.'}, status=status.HTTP_200_OK)

            return Response({'Bad Request: Invalid User Relation.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class EmployerGetView(APIView):
    serializer_class = EmployerGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            user = UserProfile.objects.filter(uid=uid).first()
            if user:
                if user.type.name == "Admin" or user.type.relation_type.name == "Employee":
                    employer_id = user.added_by_id
                else:
                    employer_id = uid
                return Response({'Succeeded': 'Employer Info Fetched.', 'employer_id': employer_id},
                                status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
