from django.urls import path
from api.views.LoginAPI import *
from api.views.UserAPI import *
from api.views.EquipmentAPI import *
from api.views.CropAPI import *
from api.views.SiteAPI import *
from api.views.ChemicalAPI import *
from api.views.OperationAPI import *

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
    path('crop/get/', CropGetView.as_view()),
    path('crop/list/get/', CropListGetView.as_view()),
    path('crop/update/', CropUpdateView.as_view()),
    path('crop/delete/', CropDeleteView.as_view()),

    # SiteAPI

    path('site/parent/create/', SiteParentCreateView.as_view()),
    path('site/child/create/', SiteChildCreateView.as_view()),
    path('site/get/', SiteGetView.as_view()),
    path('site/parent/list/get/', SiteParentListGetView.as_view()),
    path('site/child/list/get/', SiteChildListGetView.as_view()),
    path('site/update/', SiteUpdateView.as_view()),
    path('site/parent/delete/', SiteParentDeleteView.as_view()),
    path('site/child/delete/', SiteChildDeleteView.as_view()),

    # ChemicalAPI

    path('chemical/create/', ChemicalCreateView.as_view()),
    path('chemical/get/', ChemicalGetView.as_view()),
    path('chemical/list/get/', ChemicalListGetView.as_view()),
    path('chemical/update/', ChemicalUpdateView.as_view()),
    path('chemical/delete/', ChemicalDeleteView.as_view()),

    # OperationAPI

    path('operation/purchase/create/', PurchaseCreateView.as_view()),
    path('operation/purchase/get/', PurchaseGetView.as_view()),
    path('operation/purchase/list/get/', PurchaseListGetView.as_view()),
    path('operation/purchase/update/', PurchaseUpdateView.as_view()),
    path('operation/purchase/delete/', PurchaseDeleteView.as_view()),

    path('operation/harvest/operation/create/', HarvestOperationCreateView.as_view()),
    path('operation/harvest/create/', HarvestCreateView.as_view()),
    path('operation/harvest/get/', HarvestGetView.as_view()),
    path('operation/harvest/list/get/', HarvestListGetView.as_view()),
    path('operation/harvest/update/', HarvestUpdateView.as_view()),
    path('operation/harvest/operation/delete/', HarvestOperationDeleteView.as_view()),
    path('operation/harvest/delete/', HarvestDeleteView.as_view()),

    path('operation/application/operation/create/', ApplicationOperationCreateView.as_view()),
    path('operation/application/create/', ApplicationCreateView.as_view()),
    path('operation/application/get/', ApplicationGetView.as_view()),
    path('operation/application/list/get/', ApplicationListGetView.as_view()),
    path('operation/application/update/', ApplicationUpdateView.as_view()),
    path('operation/application/operation/delete/', ApplicationOperationDeleteView.as_view()),
    path('operation/application/delete/', ApplicationDeleteView.as_view()),
]
