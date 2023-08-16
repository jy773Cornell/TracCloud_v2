from api.models import *
from message.models import *
from io import BytesIO
from django.core.cache import cache
from openpyxl import load_workbook


def create_workbook_bytes(path):
    with open(path, 'rb') as f:
        workbook = load_workbook(f)

    buffer = BytesIO()
    workbook.save(buffer)
    workbook_bytes = buffer.getvalue()

    return workbook_bytes


def preload_ref_data():
    cache.set('UserType', list(UserType.objects.all().values()), None)
    cache.set('UserRelationType', list(UserRelationType.objects.all().values()), None)

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

    cache.set('MessageType', list(MessageType.objects.all().values()), None)

    workbook_bytes = create_workbook_bytes('api/static/ReportTemplates/CentralPosting-template.xlsx')
    cache.set('central_posting_template', workbook_bytes, None)
