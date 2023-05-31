import glob
import pandas as pd
from api.models import *
from django.db import transaction
from api.utils.UUIDGen import gen_uuid


def refresh_ref_application():
    nan_value = ""
    ref_file = glob.glob('api/reference_data/Trac Cloud-Reference*.xlsx')[0]

    # Refresh DecisionSupport

    target = "DecisionSupport"
    target_model = DecisionSupport
    application_decision_support_df = pd.read_excel(ref_file, sheet_name='DecisionSupport').fillna(nan_value)
    with transaction.atomic():
        updated_or_created = set()
        for _, row in application_decision_support_df.iterrows():
            try:
                instance = target_model.objects.get(name=row["name"])
                instance.note = row["note"]
                instance.save()
                print(f'Updated {target}: {row["name"]}')
            except target_model.DoesNotExist:
                instance = target_model(pk=gen_uuid("DSID"), name=row["name"], note=row["note"])
                instance.save()
                print(f'Created new {target}: {row["name"]}')

            updated_or_created.add(instance.pk)

        for data in target_model.objects.all():
            if data.pk not in updated_or_created:
                data.delete()
                print(f'Deleted {target}: {data.name}')
    print(f'{target} data Refreshed\n')

    # Refresh ApplicationTarget

    target = "ApplicationTarget"
    target_model = ApplicationTarget
    application_target_df = pd.read_excel(ref_file, sheet_name='ApplicationTarget').fillna(nan_value)
    with transaction.atomic():
        updated_or_created = set()
        for _, row in application_target_df.iterrows():
            try:
                instance = target_model.objects.get(
                    name=row["name"],
                    crop=CropCategory.objects.get(name=row["crop"]) if row["crop"] != "" else None
                )
                instance.code = row["code"]
                instance.note = row["note"]
                instance.save()
                print(f'Updated {target}: {row["name"]}')
            except target_model.DoesNotExist:
                instance = target_model(
                    pk=gen_uuid("ATTID"),
                    name=row["name"],
                    code=row["code"],
                    crop=CropCategory.objects.get(name=row["crop"]) if row["crop"] != "" else None,
                    note=row["note"]
                )
                instance.save()
                print(f'Created new {target}: {"All" if row["crop"] == "" else row["crop"]} - {row["name"]}')

            updated_or_created.add(instance.pk)

        for data in target_model.objects.all():
            if data.pk not in updated_or_created:
                data.delete()
                print(f'Deleted {target}: {"All" if data.crop is None else data.crop} - {data.name}')
    print(f'{target} data Refreshed\n')
