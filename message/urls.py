from django.urls import path
from message.views import *

urlpatterns = [
    path('notification/unread/list/get', NotificationUnreadListGetView.as_view()),
]
