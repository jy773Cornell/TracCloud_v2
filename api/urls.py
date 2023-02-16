from django.urls import path
from api.views.LoginAPI import *
from api.views.UserAPI import *
from api.views.EquipmentAPI import *
from api.views.CropAPI import *

urlpatterns = [

    # LoginAPI

    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    path('auth/', UserAuthCheckView.as_view()),

    # UserAPI

    path('user/create/', UserCreateView.as_view()),
    path('user/get/', UserGetView.as_view()),
    path('user/profile/update/', UserProfileUpdateView.as_view()),
    path('user/password/change/', UserPasswordChangeView.as_view()),

    path('user/relation/create/request/', UserRelationCreateRequestView.as_view()),
    path('user/relation/create/response/', UserRelationCreateResponseView.as_view()),
    path('user/relation/get/', UserRelationGetView.as_view()),
    path('user/relation/list/get/', UserRelationListGetView.as_view()),
    path('user/relation/update/', UserRelationUpdateView.as_view()),
    path('user/relation/delete/', UserRelationDeleteView.as_view()),

    path('user/dummy/create/', DummyUserCreate.as_view()),
    path('user/dummy/activate/', DummyUserActivate.as_view()),
    path('user/dummy/delete/', DummyUserDeleteView.as_view()),

    # EquipmentAPI

    path('equipment/create/', EquipmentCreateView.as_view()),
    path('equipment/get/', EquipmentGetView.as_view()),
    path('equipment/list/get/', EquipmentListGetView.as_view()),
    path('equipment/update/', EquipmentUpdateView.as_view()),
    path('equipment/delete/', EquipmentDeleteView.as_view()),

    # CropAPI

    path('crop/create/', CropCreateView.as_view()),

]
