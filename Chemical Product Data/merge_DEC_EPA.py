import pandas as pd
from DEC.dec_csv2csv import refresh_dec_data
from EPA.epa_xml2csv import refresh_epa_data


def reg_no_trans(no):
    if "-" in no:
        no_list = no.split("-")
        no = no_list[0] + "-" + no_list[1]
    return no


# File Paths

trac_cloud_chemical_file = 'Trac Cloud Chemical Product Data.csv'

dec_file = "./DEC/Trac Cloud DEC Product Data.csv"
epa_file = "./EPA/Trac Cloud EPA Product Data.csv"

# Refresh DEC and EPA data

refresh_dec_data("DEC/")
print("DEC data has been refreshed.")

refresh_epa_data("EPA/")
print("EPA data has been refreshed.")

df_dec = pd.read_csv(dec_file, low_memory=False)
df_epa = pd.read_csv(epa_file)

# Check unique key in EPA data

is_unique = df_dec['PRODUCT ID_DEC'].nunique() == df_dec['PRODUCT ID_DEC'].count()
print("Check if the PRODUCT ID in DEC data file is unique key: " + str(is_unique))
is_unique = df_epa['EPA REGISTRATION NUMBER'].nunique() == df_epa['EPA REGISTRATION NUMBER'].count()
print("Check if the EPA REGISTRATION NUMBER in EPA data file is unique key: " + str(is_unique))

# Merge data

df_dec["REG_NR"] = df_dec["EPA REGISTRATION NUMBER"].apply(reg_no_trans)

merge_data = pd.merge(df_dec, df_epa, left_on="REG_NR", right_on='EPA REGISTRATION NUMBER', how='left',
                      suffixes=('_DEC', '_EPA'))
merge_data = merge_data.drop("REG_NR", axis=1)

merge_data.to_csv(trac_cloud_chemical_file, index=False)
print(trac_cloud_chemical_file + " has been generated.")
