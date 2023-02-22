import pandas as pd


def reg_no_trans(no):
    if "-" in no:
        no_list = no.split("-")
        no = no_list[0] + "-" + no_list[1]
    return no


# File Paths

trac_cloud_chemical_file = 'Trac Cloud Chemical Product Data.csv'

dec_file = "./DEC/Trac Cloud DEC Product Data.csv"
epa_file = "./EPA/Trac Cloud EPA Product Data.csv"

df_dec = pd.read_csv(dec_file)
df_epa = pd.read_csv(epa_file)

# Check unique key in EPA data

is_unique = df_epa['EPA REGISTRATION NUMBER'].nunique() == df_epa['EPA REGISTRATION NUMBER'].count()
print("Check if the EPA REGISTRATION NUMBER in EPA data file is unique key: " + str(is_unique))

# Merge data

df_dec["REG_NR"] = df_dec["EPA REGISTRATION NUMBER"].apply(reg_no_trans)

merge_data = pd.merge(df_dec, df_epa, left_on="REG_NR", right_on='EPA REGISTRATION NUMBER', how='left')
merge_data.drop("REG_NR", axis=1)

merge_data.to_csv(trac_cloud_chemical_file, index=False)
