from rest_framework.views import APIView
from django.core.cache import cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.utils.UUIDGen import gen_uuid
from message.models import *
from message.serializers import *


def new_message(author, recipient, type_id, text):
    message = Message.objects.create(mid=gen_uuid("MID"), author=author, recipient=recipient, type_id=type_id,
                                     text=text)
    return message


def create_connection_request_message(author, recipient):
    type_id = next((item['mtid'] for item in cache.get("MessageType") if item["name"] == "Notification"), None)
    text = f"New connection request from {author.user.username}!"
    new_message(author, recipient, type_id, text)


class NotificationUnreadListGetView(APIView):
    serializer_class = NotificationGetSerializer
    lookup_url_kwarg = "recipient_id"

    def get(self, request, format=None):
        recipient_id = request.GET.get(self.lookup_url_kwarg)

        if recipient_id:
            NotificationTypeID = next(
                (item['mtid'] for item in cache.get("MessageType") if item["name"] == "Notification"), None)
            notification_list = Message.objects.filter(recipient_id=recipient_id, type_id=NotificationTypeID,
                                                       is_read=False).order_by(
                "-is_read", "-create_time")
            data = [self.serializer_class(notification).data for notification in notification_list]
            return Response({'Succeeded': 'Notification List Fetched.', 'data': data},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)
