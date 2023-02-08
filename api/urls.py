from django.urls import path
from api.views.Login import UserLoginView, UserAuthCheck

urlpatterns = [
    path('login', UserLoginView.as_view()),
    path('auth', UserAuthCheck.as_view()),
]
