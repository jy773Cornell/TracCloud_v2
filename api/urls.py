from django.urls import path
from api.views.LoginAPI import UserLoginView, UserLogoutView, UserAuthCheckView
from api.views.UserAPI import UserCreateView, UserGetInfoView

urlpatterns = [

    # LoginAPI

    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('auth/', UserAuthCheckView.as_view()),

    # UserAPI

    path('user/create/', UserCreateView.as_view()),
    path('user/get/info/', UserGetInfoView.as_view()),

]
