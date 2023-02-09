from django.urls import path
from api.views.LoginAPI import UserLoginView, UserLogoutView, UserAuthCheckView
from api.views.UserAPI import UserCreateView

urlpatterns = [

    # LoginAPI

    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('auth/', UserAuthCheckView.as_view()),

    # UserAPI

    path('user/create/', UserCreateView.as_view()),

]
