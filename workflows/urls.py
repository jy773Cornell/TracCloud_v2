from django.urls import path

path('workflow/', include(('api.flows.SprayCardFlow.urls', 'api'), namespace='spray_card')),
