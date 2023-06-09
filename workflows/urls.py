from django.urls import path
from workflows.views.RegistrationAPI import *
from workflows.views.PasswordResetAPI import *
from workflows.views.SprayCardAPI import *
from workflows.views.ConnectionAPI import *
from workflows.views.UserTreeAPI import *

app_name = 'workflow'

urlpatterns = [
    path('registration/', RegistrationRequestView.as_view()),

    path('password_reset/', PasswordResetRequestView.as_view()),
    path('password_reset_confirm/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('spraycard/list/get/', SprayCardListGetView.as_view()),
    path('spraycard/initiate/', SprayCardInitiateView.as_view()),
    path('spraycard/assign/', SprayCardAssignView.as_view()),
    path('spraycard/return/', SprayCardReturnView.as_view()),
    path('spraycard/withdraw/', SprayCardWithdrawView.as_view()),
    path('spraycard/complete/', SprayCardCompleteView.as_view()),
    # path('spraycard/approve/', SprayCardApproveView.as_view()),

    path('connection/initiate/', ConnectionInitiateView.as_view()),
    path('connection/approve/', ConnectionApproveView.as_view()),
    path('connection/reject/', ConnectionRejectView.as_view()),

    path('usertree/subtree/get/', UserSubTreeGetView.as_view()),
]
