from django.urls import re_path
from frontend.views import index

urlpatterns = [
    re_path(r'^(?!api)(?!admin)(?!workflow).*$', index),
]
