from django.core.cache import cache
from api.models import *


def preload_ref_data():
    cache.set('CropCategory', list(CropCategory.objects.filter(is_active=True).values()), None)
    cache.set('CropVariety', list(CropVariety.objects.filter(is_active=True).values()), None)
    cache.set('CropGrowthStage', list(CropGrowthStage.objects.filter(is_active=True).values()), None)
