from django.urls import path
from message.views import *

urlpatterns = [
    path('get', MessageGetView.as_view()),
    path('read', MessageReadView.as_view()),
    path('notification/unread/list/get', NotificationUnreadListGetView.as_view()),
    path('report/list/get', ReportMessageListGetView.as_view()),
]
