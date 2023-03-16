from django.core.cache import cache
from api.models import *


def preload_ref_data():
    cache.set('CropCategory', list(CropCategory.objects.all().values()), None)
    cache.set('CropVariety', list(CropVariety.objects.all().values()), None)
    cache.set('CropGrowthStage', list(CropGrowthStage.objects.all().values()), None)
