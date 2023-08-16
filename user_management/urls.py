from django.urls import path
from user_management.views.PrivilegeAPI import *
from user_management.views.EmployAPI import *
from user_management.views.ClientVendorAPI import *

urlpatterns = [
    path('privilege/get/', PrivilegeGetView.as_view()),
    path('privilege/update/', PrivilegeUpdateView.as_view()),
    path('employee/list/get/', EmployeeListGetView.as_view()),
    path('employee/create/', EmployeeCreateView.as_view()),
    path('employee/delete/', EmployeeDeleteView.as_view()),
    path('employer/get/', EmployerGetView.as_view()),
    path('client_or_vendor/list/get/', ClientVendorListGetView.as_view()),
    path('client_or_vendor/connection/delete/', ClientVendorConnectionDeleteView.as_view()),
]
