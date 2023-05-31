import glob
import pandas as pd
from api.models import *
from django.db import transaction
from api.utils.UUIDGen import gen_uuid


def refresh_ref_site():
    nan_value = ""
    ref_file = glob.glob('api/reference_data/Trac Cloud-Reference*.xlsx')[0]

    # Refresh Unit

    target = "SiteType"
    target_model = SiteType
    site_type_df = pd.read_excel(ref_file, sheet_name='SiteType').fillna(nan_value)
    with transaction.atomic():
        updated_or_created = set()
        for _, row in site_type_df.iterrows():
            try:
                instance = target_model.objects.get(name=row["name"])
                instance.level = row["level"]
                instance.note = row["note"]
                instance.save()
                print(f'Updated {target}: {row["name"]}')
            except target_model.DoesNotExist:
                instance = target_model(pk=gen_uuid("STID"), name=row["name"], level=row["level"], note=row["note"])
                instance.save()
                print(f'Created new {target}: {row["name"]}')

            updated_or_created.add(instance.pk)

        for data in target_model.objects.all():
            if data.pk not in updated_or_created:
                data.delete()
                print(f'Deleted {target}: {data.name}')
    print(f'{target} data Refreshed\n')
