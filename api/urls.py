from django.urls import path
from api.views.LoginAPI import *
from api.views.UserAPI import *

urlpatterns = [

    # LoginAPI

    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('auth/', UserAuthCheckView.as_view()),

    # UserAPI

    path('user/create/', UserCreateView.as_view()),
    path('user/get/', UserGetView.as_view()),
    path('user/delete/', UserDeleteView.as_view()),
    path('user/relation/create/request/', UserRelationCreateRequestView.as_view()),
    path('user/relation/create/response/', UserRelationCreateResponseView.as_view()),
    path('user/relation/get/', UserRelationGetView.as_view()),
    path('user/relation/delete/', UserRelationDeleteView.as_view()),
]
