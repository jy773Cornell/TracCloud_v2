from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import path
from django.views.generic import RedirectView

from frontend.views import index

urlpatterns = [
    path('', index),
    path('login/', index),
    path('profile/', index),
]
