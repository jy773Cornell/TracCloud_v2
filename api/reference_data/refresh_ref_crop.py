import glob
import pandas as pd
from api.models import *
from django.db import transaction
from api.utils.UUIDGen import gen_uuid


def refresh_ref_crop():
    nan_value = ""
    ref_file = glob.glob('api/reference_data/Trac Cloud-Reference*.xlsx')[0]

    # Refresh CropCategory

    target = "CropCategory"
    target_model = CropCategory
    crop_category_df = pd.read_excel(ref_file, sheet_name='CropCategory').fillna(nan_value)
    with transaction.atomic():
        updated_or_created = set()
        for _, row in crop_category_df.iterrows():
            try:
                instance = target_model.objects.get(name=row["name"])
                instance.crop_code = row["crop_code"]
                instance.category = row["category"]
                instance.note = row["note"]
                instance.save()
                print(f'Updated {target}: {row["name"]}')
            except target_model.DoesNotExist:
                instance = target_model(pk=gen_uuid("CCID"), crop_code=row["crop_code"], name=row["name"],
                                        category=row["category"], note=row["note"])
                instance.save()
                print(f'Created new {target}: {row["name"]}')

            updated_or_created.add(instance.pk)

        for data in target_model.objects.all():
            if data.pk not in updated_or_created:
                data.delete()
                print(f'Deleted {target}: {data.name}')
    print(f'{target} data Refreshed\n')

    # Refresh CropVariety

    target = "CropVariety"
    target_model = CropVariety
    crop_variety_df = pd.read_excel(ref_file, sheet_name='CropVariety').fillna(nan_value)
    with transaction.atomic():
        updated_or_created = set()
        for crop in list(crop_variety_df.columns):
            for value in crop_variety_df[crop].tolist():
                if value != nan_value:
                    try:
                        instance = target_model.objects.get(name=value, crop=CropCategory.objects.get(name=crop))
                        print(f'Existed {target}: {crop} - {value}')
                    except target_model.DoesNotExist:
                        instance = target_model(pk=gen_uuid("CVID"), crop=CropCategory.objects.get(name=crop),
                                                name=value)
                        instance.save()
                        print(f'Created new {target}: {crop} - {value}')

                    updated_or_created.add(instance.pk)

        for data in target_model.objects.all():
            if data.pk not in updated_or_created:
                data.delete()
                print(f'Deleted {target}: {data.crop} - {data.name}')
    print(f'{target} data Refreshed\n')

    # Refresh CropGrowthStage

    target = "CropGrowthStage"
    target_model = CropGrowthStage
    crop_growth_stage_df = pd.read_excel(ref_file, sheet_name='CropGrowthStage').fillna(nan_value)
    with transaction.atomic():
        updated_or_created = set()
        for crop in list(crop_growth_stage_df.columns):
            for value in crop_growth_stage_df[crop].tolist():
                if value != nan_value:
                    try:
                        instance = target_model.objects.get(name=value, crop=CropCategory.objects.get(name=crop))
                        print(f'Existed {target}: {crop} - {value}')
                    except target_model.DoesNotExist:
                        instance = target_model(pk=gen_uuid("CGSID"), crop=CropCategory.objects.get(name=crop),
                                                name=value)
                        instance.save()
                        print(f'Created new {target}: {crop} - {value}')

                    updated_or_created.add(instance.pk)

        for data in target_model.objects.all():
            if data.pk not in updated_or_created:
                data.delete()
                print(f'Deleted {target}: {data.crop} - {data.name}')
    print(f'{target} data Refreshed\n')
