from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from api.utils.ModelManager import request_data_transform
from api.utils.UUIDGen import gen_uuid
from user_management.serializer import *
from user_management.utils.NewAccount import *
from django.db import transaction


class EmployeeCreateView(APIView):
    serializer_class = EmployeeCreateSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = request_data_transform(request.data)
            employer_id = data.pop("employer_id")

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
                UserProfile.objects.create(uid=uid, user=user, added_by_id=employer_id, **data)

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

            employee_to_be_deleted = UserProfile.objects.filter(uid=employee_id, added_by_id=employer_id)
            if employee_to_be_deleted:
                employee_to_be_deleted.first().user.delete()
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
                return Response({'Succeeded': 'Employer Info Fetched.', 'employer_id': employer_id}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class PrivilegeGetView(APIView):
    serializer_class = PrivilegeGetSerializer
    lookup_url_kwarg = "uid"

    def get(self, request, format=None):
        uid = request.GET.get(self.lookup_url_kwarg)
        if uid:
            privilege = UserPrivilege.objects.filter(user_id=uid).first()
            if privilege:
                data = self.serializer_class(privilege).data
                return Response({'Succeeded': 'Privilege Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid uid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class PrivilegeUpdateView(APIView):
    serializer_class = PrivilegeUpdateSerializer

    def post(self, request, format=None):
        uid = request.data["user_id"]

        if uid:
            privilege = UserPrivilege.objects.filter(user_id=uid)
            serializer = self.serializer_class(data=request.data)
            if privilege and serializer.is_valid():
                privilege.update(**serializer.data)
                return Response({'Succeeded': 'Privilege Info Updated.'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid Post parameter'}, status=status.HTTP_400_BAD_REQUEST)
