from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from workflows.serializers.ConnectionSerializer import *
from message.models import *
from message.views import *
from django.db import transaction
import pytrie


class ConnectionInitiateView(APIView):
    serializer_class = ConnectionInitiateSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                connection_process = Connection(cpid=data["cpid"])
                connection_process.initiate(data["requester"], data["provider"])
                connection_process.save()

                create_connection_request_message(data["requester"], data["provider"], connection_process)

            return Response({'Succeeded': 'Process Has Been Initiated.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConnectionApproveView(APIView):
    serializer_class = ConnectionResponseSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["connection_process"].approve()
                data["connection_process"].save()

                data["message"].read()

            return Response({'Succeeded': 'Process Has Been Approved.'}, status=status.HTTP_200_OK)

        # Something goes wrong, clear the message and process

        if request.data.get("mid"):
            message = Message.objects.get(mid=request.data.get("mid"))
            message.read()

        if request.data.get("cpid"):
            connection = Connection.objects.get(cpid=request.data.get("cpid"))
            connection.archive()

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConnectionRejectView(APIView):
    serializer_class = ConnectionResponseSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            with transaction.atomic():
                data["connection_process"].reject()
                data["connection_process"].save()

                data["message"].read()

            return Response({'Succeeded': 'Process Has Been Rejected.'}, status=status.HTTP_200_OK)

        if request.data.get("mid"):
            message = Message.objects.get(mid=request.data.get("mid"))
            message.read()

        if request.data.get("cpid"):
            connection = Connection.objects.get(cpid=request.data.get("cpid"))
            connection.archive()

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConnectionSearchAPIView(APIView):
    serializer_class = ConnectionSearchGetSerializer
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


class ConnectionRequesterGetView(APIView):
    serializer_class = RequesterGetSerializer
    lookup_url_kwarg = "cpid"

    def get(self, request, format=None):
        cpid = request.GET.get(self.lookup_url_kwarg)
        if cpid:
            connection = Connection.objects.filter(cpid=cpid).first()
            if connection:
                data = self.serializer_class(connection.relation.requester).data
                return Response({'Succeeded': 'Requestor Info Fetched.', 'data': data}, status=status.HTTP_200_OK)

            return Response({'Failed': 'Invalid cpid'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
