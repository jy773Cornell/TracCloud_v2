from rest_framework.views import APIView
from django.core.cache import cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.utils.UUIDGen import gen_uuid
from message.models import *
from message.serializers import *


def new_message(author, recipient, type_id, subject, text=None, connection=None, reports=None):
    message = Message.objects.create(mid=gen_uuid("MID"), author=author, recipient=recipient, type_id=type_id,
                                     subject=subject, text=text, connection=connection)
    if reports:
        for report in reports:
            message.reports.add(report)

    return message


def create_connection_request_notification(author, recipient, connection, text=None):
    type_id = next((item['mtid'] for item in cache.get("MessageType") if item["name"] == "Connection"), None)
    subject = f"New connection request from {author.user.username}!"
    new_message(author=author, recipient=recipient, type_id=type_id, subject=subject, text=text, connection=connection)


def create_new_reports_notification(author, recipient, reports, subject, text=None):
    type_id = next((item['mtid'] for item in cache.get("MessageType") if item["name"] == "Reports"), None)
    new_message(author=author, recipient=recipient, type_id=type_id, subject=subject, text=text, reports=reports)


def read_connection_message(connection):
    messages = Message.objects.filter(connection=connection)
    for message in messages:
        message.read()


class MessageGetView(APIView):
    serializer_class = MessageGetSerializer
    lookup_url_kwarg = "mid"

    def get(self, request, format=None):
        mid = request.GET.get(self.lookup_url_kwarg)

        if mid:
            message = Message.objects.get(mid=mid)
            data = self.serializer_class(message).data
            return Response({'Succeeded': 'Message Info List Fetched.', 'data': data},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class NotificationUnreadListGetView(APIView):
    serializer_class = NotificationGetSerializer
    lookup_url_kwarg = "recipient_id"

    def get(self, request, format=None):
        recipient_id = request.GET.get(self.lookup_url_kwarg)

        if recipient_id:
            notification_list = Message.objects.filter(recipient_id=recipient_id, is_read=False).order_by("-is_read",
                                                                                                          "-create_time")
            data = [self.serializer_class(notification).data for notification in notification_list]
            return Response({'Succeeded': 'Notification List Fetched.', 'data': data},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ReportMessageListGetView(APIView):
    serializer_class = ReportMessageGetSerializer
    lookup_url_kwarg1 = "author_id"
    lookup_url_kwarg2 = "recipient_id"

    def get(self, request, format=None):
        author_id = request.GET.get(self.lookup_url_kwarg1)
        recipient_id = request.GET.get(self.lookup_url_kwarg2)

        if author_id and recipient_id:
            message_list = Message.objects.filter(author_id=author_id, recipient_id=recipient_id, type__name="Reports") \
                .order_by("is_read", "-create_time")
            data = [self.serializer_class(message).data for message in message_list]
            return Response({'Succeeded': 'Report Message List Fetched.', 'data': data},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class MessageReadView(APIView):
    serializer_class = MessageReadSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            message = serializer.validated_data
            message.read()
            message.save()
            return Response({'Succeeded': 'Message Is Read'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
