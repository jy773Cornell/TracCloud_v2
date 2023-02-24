import pandas as pd
from datetime import datetime
from DEC.dec_csv2csv import refresh_dec_data
from EPA.epa_xml2csv import refresh_epa_data


def reg_no_trans(no):
    if "-" in no:
        no_list = no.split("-")
        no = no_list[0] + "-" + no_list[1]
    return no


def match_previous_reg_no(unmatch_data, df_dec, df_epa):
    cols_to_drop = df_epa.shape[1]
    unmatch_data = unmatch_data.iloc[:, :-cols_to_drop]
    unmatch_data.columns = df_dec.columns.tolist()
    df_epa["PREVIOUS REG NUMBER_EPA_COPY"] = df_epa["PREVIOUS REG NUMBER_EPA"]
    df_epa['PREVIOUS REG NUMBER_EPA_COPY'] = df_epa['PREVIOUS REG NUMBER_EPA_COPY'].str.split(', ')
    match_data = pd.merge(unmatch_data, df_epa.explode('PREVIOUS REG NUMBER_EPA_COPY'), left_on='REG_NR',
                          right_on='PREVIOUS REG NUMBER_EPA_COPY', how='left', suffixes=('_DEC', '_EPA'))
    match_data = match_data.drop("PREVIOUS REG NUMBER_EPA_COPY", axis=1)

    return match_data


# File Paths

trac_cloud_chemical_file = 'Trac Cloud Chemical Product Data {}.csv'.format(datetime.now().strftime("%Y-%m-%d"))
unmatch_dec_epa_file = 'NO EPA Matched DEC Data {}.csv'.format(datetime.now().strftime("%Y-%m-%d"))

dec_file = "./DEC/Trac Cloud DEC Product Data {}.csv".format(datetime.now().strftime("%Y-%m-%d"))
epa_file = "./EPA/Trac Cloud EPA Product Data {}.csv".format(datetime.now().strftime("%Y-%m-%d"))

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
unmatch_data = merge_data[merge_data['EPA REGISTRATION NUMBER_EPA'].isnull()]
merge_data.drop(unmatch_data.index, inplace=True)
match_data = match_previous_reg_no(unmatch_data, df_dec, df_epa)
merge_data = pd.concat([merge_data, match_data], ignore_index=True).sort_values(by='PRODUCT ID_DEC')
merge_data = merge_data.drop("REG_NR", axis=1)

merge_data.to_csv(trac_cloud_chemical_file, index=False)
print(trac_cloud_chemical_file + " has been generated.")

unmatch_data = merge_data[merge_data['EPA REGISTRATION NUMBER_EPA'].isnull()]
unmatch_data.to_csv(unmatch_dec_epa_file, index=False)
unmatch_count = merge_data['EPA REGISTRATION NUMBER_EPA'].isnull().sum()
print("Unmatched DEC-EPA: {} / {}".format(unmatch_count, merge_data.shape[0]))
