from django.urls import path
from user_management.views.PrivilegeAPI import *
from user_management.views.EmployAPI import *

urlpatterns = [
    path('privilege/get/', PrivilegeGetView.as_view()),
    path('privilege/update/', PrivilegeUpdateView.as_view()),
    path('employee/create/', EmployeeCreateView.as_view()),
    path('employee/delete/', EmployeeDeleteView.as_view()),
    path('employer/get/', EmployerGetView.as_view()),
]
