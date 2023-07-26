from django.urls import path

from user_management.views.SprayCardAssignAPI import AssigneeGetView
from workflows.views.RegistrationAPI import *
from workflows.views.PasswordResetAPI import *
from workflows.views.SprayCardAPI import *
from workflows.views.ConnectionAPI import *
from workflows.views.AccountSettingAPI import *

app_name = 'workflow'

urlpatterns = [
    path('registration/', RegistrationRequestView.as_view()),
    path('password_reset/', PasswordResetRequestView.as_view()),
    path('password_reset_confirm/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('username_change/', UsernameChangeView.as_view()),
    path('password_change/', PasswordChangeView.as_view()),

    path('spraycard/list/get/', SprayCardListGetView.as_view()),
    path('spraycard/assignment_history/get/', SprayCardAssignmentHistoryGetView.as_view()),
    path('spraycard/content/get/', SprayCardContentGetView.as_view()),
    path('spraycard/create/', SprayCardCreateView.as_view()),
    path('spraycard/update/', SprayCardUpdateView.as_view()),
    path('spraycard/initiate/', SprayCardInitiateView.as_view()),
    path('spraycard/assign/', SprayCardAssignView.as_view()),
    path('spraycard/return/', SprayCardReturnView.as_view()),
    path('spraycard/withdraw/', SprayCardWithdrawView.as_view()),
    path('spraycard/complete/', SprayCardCompleteView.as_view()),
    path('spraycard/assignees/get/', AssigneeGetView.as_view()),

    path('connection/initiate/', ConnectionInitiateView.as_view()),
    path('connection/approve/', ConnectionApproveView.as_view()),
    path('connection/reject/', ConnectionRejectView.as_view()),
]
