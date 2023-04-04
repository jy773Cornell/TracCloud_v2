from django.core.cache import cache
from api.models import *


def preload_ref_data():
    cache.set('CropCategory', list(CropCategory.objects.all().values()), None)
    cache.set('CropVariety', list(CropVariety.objects.all().values()), None)
    cache.set('CropGrowthStage', list(CropGrowthStage.objects.all().values()), None)

    cache.set('SiteType', list(SiteType.objects.all().values()), None)

    cache.set('ChemicalProductBase', list(ChemicalProductBase.objects.all().values()), None)

    cache.set('OperationType', list(OperationType.objects.all().values()), None)
    cache.set('ApplicationType', list(ApplicationType.objects.all().values()), None)
    cache.set('DecisionSupport', list(DecisionSupport.objects.all().values()), None)
    cache.set('ApplicationTarget', list(ApplicationTarget.objects.all().values()), None)

    cache.set('Unit', list(Unit.objects.all().values()), None)
