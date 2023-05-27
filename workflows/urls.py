from django.urls import path
from workflows.views.RegistrationAPI import *
from workflows.views.PasswordResetAPI import *

app_name = 'workflow'

urlpatterns = [
    path('registration/', RegistrationRequestView.as_view()),
    path('password_reset/', PasswordResetRequestView.as_view()),
    path('password_reset_confirm/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
