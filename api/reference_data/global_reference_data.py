from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.core.cache import cache
from api.models import *


@receiver(post_migrate)
def preload_ref_data(sender, **kwargs):
    cache.set('CropVariety', list(CropVariety.objects.filter(is_active=True)), None)
    print(cache.get('CropVariety'))
