from django.urls import path
from user_management.views import *

urlpatterns = [
    path('get/', PrivilegeGetView.as_view()),
]
