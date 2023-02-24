import glob
import re

import pandas as pd


def remove_parentheses(name):
    for i in range(5):
        pattern = r'\([^)]*2EE[^)]*\)|\s*\([^()]*?\)\s*|\s*\[(.*?)\]\s*'
        name = re.sub(pattern, lambda match: match.group(0) if "2EE" in match.group(0) else "", name)
    pattern = r'\s*\([^()]*?\s*$|\s*\[(.*?)\s*$'
    name = re.sub(pattern, '', name)

    words = name.split()

    for i in range(len(words)):
        if (not all(char in "IVXLCDM" for char in words[i])) and ("2EE" not in words[i]):
            words[i] = words[i].title()
    name = " ".join(words)

    return name


def epa_no_format(no):
    if "SLN" in no:
        no = no.replace("SLN", "").replace("-", "").replace(" ", "")
    return no


def refresh_dec_data(root_path):
    pd.options.mode.chained_assignment = None

    # csv file paths

    csv_file = root_path + 'Trac Cloud DEC Product Data.csv'

    product_file = glob.glob(root_path + 'product-open-data/*ProductData-*.csv')[0]
    ai_file = glob.glob(root_path + 'product-open-data/*ProductData_ActiveIngredients-*.csv')[0]
    type_file = glob.glob(root_path + 'product-open-data/*ProductData_ProductType-*.csv')[0]
    use_file = glob.glob(root_path + 'product-open-data/*ProductData_ProductUse-*.csv')[0]
    route_file = glob.glob(root_path + 'product-open-data/*ProductData_RouteOfExposure-*.csv')[0]
    toxicity_file = glob.glob(root_path + 'product-open-data/*ProductData_Toxicity-*.csv')[0]
    company_code_file = glob.glob(root_path + 'product-open-data/current_products.csv')[0]
    company_file = glob.glob(root_path + 'product-open-data/nyscompany.txt')[0]

    # read csv files

    df_product = pd.read_csv(product_file)
    df_product = df_product.astype(str)

    df_ai = pd.read_csv(ai_file)
    df_ai = df_ai.astype(str)

    df_type = pd.read_csv(type_file)
    df_type = df_type.astype(str)

    df_use = pd.read_csv(use_file)
    df_use = df_use.astype(str)

    df_route = pd.read_csv(route_file)
    df_route = df_route.astype(str)

    df_toxicity = pd.read_csv(toxicity_file)
    df_toxicity = df_toxicity.astype(str)

    df_company_code = pd.read_csv(company_code_file, low_memory=False)
    df_company_code = df_company_code.astype(str)

    df_company = pd.read_fwf(company_file, header=None, widths=[2, 6, 100, 62, 30, 12, 25, 60, 60],
                             names=["C", "Company Code", "Company Name", "Address", "City", "Zip", "Country",
                                    "Contact Person", "Email"])
    df_company = df_company.astype(str)

    # determine columns to merge

    info_product = df_product[
        ['PRODUCT ID', 'EPA REGISTRATION NUMBER', 'PRODUCT NAME', 'RESTRICTED USe', 'REGISTRATION STATUS', ]]
    # info_product = info_product[info_product["REGISTRATION STATUS"] != "EXPIRED"]
    info_product['EPA REGISTRATION NUMBER'] = info_product['EPA REGISTRATION NUMBER'].str.replace('=', '')
    info_product['EPA REGISTRATION NUMBER'] = info_product['EPA REGISTRATION NUMBER'].str.replace('"', '')
    info_product['EPA REGISTRATION NUMBER'] = info_product['EPA REGISTRATION NUMBER'].apply(lambda no: no.upper())
    info_product['PRODUCT NAME'] = info_product['PRODUCT NAME'].apply(remove_parentheses)

    info_ai = df_ai[['PRODUCT ID', 'PC NAME', 'ACTIVE INGREDIENT PERCENTAGE']]
    info_ai['PC NAME'] = info_ai['PC NAME'].fillna('').str.title()

    info_type = df_type[['PRODUCT ID', 'PRODUCT TYPE']]

    info_use = df_use[['PRODUCT ID', 'PRODUCT USE']]

    # info_route = df_route[['PRODUCT ID', 'ROUTE OF EXPOSURE']]

    # info_toxicity = df_toxicity[['PRODUCT ID', 'TOXICITY']]

    info_company_code = df_company_code[['Product No.', 'Company No.']]
    info_company_code = info_company_code.drop_duplicates(subset='Product No.')

    info_company = df_company[['Company Code', 'Company Name']]

    # merge data

    mapping = info_company_code.set_index('Product No.')['Company No.']
    info_product['Company Code'] = info_product['EPA REGISTRATION NUMBER'].map(mapping).astype(str).str.zfill(6)

    mapping = info_company.set_index('Company Code')['Company Name']
    info_product['Company Name'] = info_product['Company Code'].map(mapping)

    info_product['EPA REGISTRATION NUMBER'] = info_product['EPA REGISTRATION NUMBER'].apply(epa_no_format)

    group_list = info_product.columns.tolist()
    dec_data = pd.merge(info_product, info_ai, on='PRODUCT ID', how='left')
    grouped = dec_data.groupby(group_list)
    dec_data = grouped['PC NAME'].apply(lambda x: ' / '.join(x.astype(str))).reset_index()
    dec_data['ACTIVE INGREDIENT PERCENTAGE'] = \
        grouped['ACTIVE INGREDIENT PERCENTAGE'].apply(lambda x: ', '.join(x.astype(str))).reset_index()[
            'ACTIVE INGREDIENT PERCENTAGE']

    group_list = dec_data.columns.tolist()
    dec_data = pd.merge(dec_data, info_type, on='PRODUCT ID', how='left')
    grouped = dec_data.groupby(group_list)
    dec_data = grouped['PRODUCT TYPE'].apply(lambda x: ', '.join(x.astype(str))).reset_index()

    group_list = dec_data.columns.tolist()
    dec_data = pd.merge(dec_data, info_use, on='PRODUCT ID', how='left')
    grouped = dec_data.groupby(group_list)
    dec_data = grouped['PRODUCT USE'].apply(lambda x: ', '.join(x.astype(str))).reset_index()

    # group_list = dec_data.columns.tolist()
    # dec_data = pd.merge(dec_data, info_route, on='PRODUCT ID', how='left')
    # grouped = dec_data.groupby(group_list)
    # dec_data = grouped['ROUTE OF EXPOSURE'].apply(lambda x: ', '.join(x.astype(str))).reset_index()

    # group_list = dec_data.columns.tolist()
    # dec_data = pd.merge(dec_data, info_toxicity, on='PRODUCT ID', how='left')
    # grouped = dec_data.groupby(group_list)
    # dec_data = grouped['TOXICITY'].apply(lambda x: ', '.join(x.astype(str))).reset_index()

    dec_data = dec_data.astype(str)
    dec_data.replace('nan', '', inplace=True)
    dec_data = dec_data.rename(columns={"PRODUCT ID": "PRODUCT ID_DEC", "RESTRICTED USe": "RESTRICTED USE",
                                        "REGISTRATION STATUS": "PRODUCT STATUS", "Company Code": "COMPANY CODE",
                                        "Company Name": "COMPANY NAME", "PC NAME": "PC_NAME",
                                        "ACTIVE INGREDIENT PERCENTAGE": "PC_PCT", "PRODUCT USE": "PRODUCT USE_DEC"})
    dec_data.to_csv(csv_file, index=False)
