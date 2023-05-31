import glob
import pandas as pd
from api.models import *
from django.db import transaction
from api.utils.UUIDGen import gen_uuid


def refresh_ref_chemical_product_base():
    nan_value = ""
    ref_file = glob.glob('api/reference_data/Trac Cloud Chemical Product Data*.csv')[0]

    # Refresh CropCategory

    target = "ChemicalProductBase"
    target_model = ChemicalProductBase
    chemical_product_base_df = pd.read_csv(ref_file).astype(str).fillna(nan_value)
    with transaction.atomic():
        updated_or_created = set()
        for _, row in chemical_product_base_df.iterrows():
            if row["PRODUCT STATUS_DEC"] == "REGISTERED":
                try:
                    instance = target_model.objects.get(epa_reg_no_dec=row["EPA REGISTRATION NUMBER_DEC"])
                    instance.product_id_dec = row["PRODUCT ID_DEC"]
                    instance.product_name_dec = row["PRODUCT NAME_DEC"]
                    instance.restricted_use_dec = row["RESTRICTED USE_DEC"]
                    instance.product_status_dec = row["PRODUCT STATUS_DEC"]
                    instance.company_code_dec = row["COMPANY CODE_DEC"]
                    instance.company_name_dec = row["COMPANY NAME_DEC"]
                    instance.pc_name_dec = row["PC_NAME_DEC"]
                    instance.pc_pt_dec = row["PC_PCT_DEC"]
                    instance.product_type_dec = row["PRODUCT TYPE_DEC"]
                    instance.product_use_dec = row["PRODUCT USE_DEC"]
                    instance.epa_reg_no_epa = row["EPA REGISTRATION NUMBER_EPA"]
                    instance.product_name_epa = row["PRODUCT NAME_EPA"]
                    instance.previous_reg_no_epa = row["PREVIOUS REG NUMBER_EPA"]
                    instance.distributor_reg_no_epa = row["DISTRIBUTOR REG NUMBER_EPA"]
                    instance.distributor_product_name_epa = row["DISTRIBUTOR PRODUCT NAME_EPA"]
                    instance.restricted_use_epa = row["RESTRICTED USE_EPA"]
                    instance.product_status_epa = row["PRODUCT STATUS_EPA"]
                    instance.company_code_epa = row["COMPANY CODE_EPA"]
                    instance.company_name_epa = row["COMPANY NAME_EPA"]
                    instance.pc_name_epa = row["PC_NAME_EPA"]
                    instance.pc_pt_epa = row["PC_PCT_EPA"]
                    instance.product_type_epa = row["PRODUCT TYPE_EPA"]
                    instance.save()
                    print(f'Updated {target}: {row["EPA REGISTRATION NUMBER_DEC"]} - {row["PRODUCT NAME_DEC"]}')
                except target_model.DoesNotExist:
                    instance = target_model(
                        pk=gen_uuid("ChemPBID"),
                        product_id_dec=row["PRODUCT ID_DEC"],
                        epa_reg_no_dec=row["EPA REGISTRATION NUMBER_DEC"],
                        product_name_dec=row["PRODUCT NAME_DEC"],
                        restricted_use_dec=row["RESTRICTED USE_DEC"],
                        product_status_dec=row["PRODUCT STATUS_DEC"],
                        company_code_dec=row["COMPANY CODE_DEC"],
                        company_name_dec=row["COMPANY NAME_DEC"],
                        pc_name_dec=row["PC_NAME_DEC"],
                        pc_pt_dec=row["PC_PCT_DEC"],
                        product_type_dec=row["PRODUCT TYPE_DEC"],
                        product_use_dec=row["PRODUCT USE_DEC"],
                        epa_reg_no_epa=row["EPA REGISTRATION NUMBER_EPA"],
                        product_name_epa=row["PRODUCT NAME_EPA"],
                        previous_reg_no_epa=row["PREVIOUS REG NUMBER_EPA"],
                        distributor_reg_no_epa=row["DISTRIBUTOR REG NUMBER_EPA"],
                        distributor_product_name_epa=row["DISTRIBUTOR PRODUCT NAME_EPA"],
                        restricted_use_epa=row["RESTRICTED USE_EPA"],
                        product_status_epa=row["PRODUCT STATUS_EPA"],
                        company_code_epa=row["COMPANY CODE_EPA"],
                        company_name_epa=row["COMPANY NAME_EPA"],
                        pc_name_epa=row["PC_NAME_EPA"],
                        pc_pt_epa=row["PC_PCT_EPA"],
                        product_type_epa=row["PRODUCT TYPE_EPA"],
                    )
                    instance.save()
                    print(f'Created new {target}: {row["EPA REGISTRATION NUMBER_DEC"]} - {row["PRODUCT NAME_DEC"]}')

                updated_or_created.add(instance.pk)

        for data in target_model.objects.all():
            if data.pk not in updated_or_created:
                data.delete()
                print(f'Deleted {target}: {data.product_name_dec} - {data.epa_reg_no_dec}')
    print(f'{target} data Refreshed\n')
