import xml.etree.ElementTree as ET
import pandas as pd
from datetime import datetime
import glob
import csv


def reg_no_trans(reg_no):
    if "-" in reg_no:
        parts = reg_no.split("-")
        first_part = parts[0].zfill(6)
        second_part = parts[1].zfill(5)
        return first_part + second_part
    return reg_no


def title_product_name(name):
    words = name.split()
    for i in range(len(words)):
        if not all(char in "IVXLCDM" for char in words[i]):
            words[i] = words[i].title()
    name = " ".join(words)
    return name


def pc_trans(pc):
    return f"{float(pc) / 10000:.4f}".rstrip('0').rstrip('.')


def xml2csv_write_row(csv_writer, xml_data, product_status):
    xml_tree = ET.parse(xml_data)
    xml_root = xml_tree.getroot()

    for product in xml_root.findall('PRODUCT'):
        eparegistration_number = product.find('EPAREGISTRATIONNUMBER').text
        product_name = product.find('PRODUCTNAME').text
        restricted_use = product.find('RESTRICTEDUSEPRODUCT').text
        company_number = product.find('COMPANY/COMPANYNUMBER').text
        company_name = product.find('COMPANY/COMPANYNAME').text

        type_list = []
        for product_type in product.findall('TYPESLIST/TYPES'):
            type_list.append(list(product_type)[1].text)
        type_list = ", ".join(type_list)

        previous_reg_no = []
        if product.find('TRANSFERLIST/TRANSFER'):
            for previous_reg in product.findall('TRANSFERLIST/TRANSFER'):
                previous_reg_no.append(list(previous_reg)[0].text)
            previous_reg_no = ", ".join(previous_reg_no)
        else:
            previous_reg_no = ""

        distributor_reg_no = []
        distributor_product_name = []
        if product.find('DISTRIBUTORLIST/DISTRIBUTOR'):
            for distributor in product.findall('DISTRIBUTORLIST/DISTRIBUTOR'):
                distributor_reg_no.append(list(distributor)[0].text)
                distributor_product_name.append(
                    list(distributor)[2].text if len(list(distributor)) == 3 else list(distributor)[3].text)
            distributor_reg_no = ", ".join(distributor_reg_no)
            distributor_product_name = ", ".join(distributor_product_name)
        else:
            distributor_reg_no = ""
            distributor_product_name = ""

        row = [eparegistration_number, product_name, previous_reg_no, distributor_reg_no, distributor_product_name,
               restricted_use, product_status, company_number, company_name, type_list]
        csv_writer.writerow(row)


def refresh_epa_data(root_path):
    # File Paths

    csv_file = root_path + 'Trac Cloud EPA Product Data {}.csv'.format(datetime.now().strftime("%Y-%m-%d"))

    chemname_file = root_path + 'PPIS-XML/chemname.txt'

    formula_sec3 = root_path + 'PPIS-XML/formula.txt'
    sec3_active_xml_data = glob.glob(root_path + 'PPIS-XML/PPIS-SEC3-ACTIVE-*.xml')[0]
    sec3_cancelled_xml_data = glob.glob(root_path + 'PPIS-XML/PPIS-SEC3-CANCELLED-*.xml')[0]

    formula_sec24c = root_path + 'PPIS-XML/form24c.txt'
    sec24c_active_xml_data = glob.glob(root_path + 'PPIS-XML/PPIS-SEC24C-ACTIVE-*.xml')[0]
    sec24c_cancelled_xml_data = glob.glob(root_path + 'PPIS-XML/PPIS-SEC24C-CANCELLED-*.xml')[0]

    # Create initial csv file using xml

    with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile, quoting=csv.QUOTE_NONNUMERIC)
        writer.writerow(
            ['EPA REGISTRATION NUMBER', 'PRODUCT NAME', 'PREVIOUS REG NUMBER_EPA', 'DISTRIBUTOR REG NUMBER_EPA',
             'DISTRIBUTOR PRODUCT NAME_EPA', 'RESTRICTED USE', 'PRODUCT STATUS', 'COMPANY CODE', 'COMPANY NAME',
             'PRODUCT TYPE'])

        xml2csv_write_row(writer, sec3_active_xml_data, "ACTIVE")
        xml2csv_write_row(writer, sec3_cancelled_xml_data, "CANCELLED")
        xml2csv_write_row(writer, sec24c_active_xml_data, "ACTIVE")
        xml2csv_write_row(writer, sec24c_cancelled_xml_data, "CANCELLED")

    # Add Active Ingredient Info

    df_product = pd.read_csv(csv_file)
    df_product = df_product.astype(str)
    df_product['PRODUCT NAME'] = df_product['PRODUCT NAME'].apply(title_product_name)
    df_product['DISTRIBUTOR PRODUCT NAME_EPA'] = df_product['DISTRIBUTOR PRODUCT NAME_EPA'].apply(title_product_name)
    df_product['RESTRICTED USE'] = df_product['RESTRICTED USE'].str.replace('T', 'Y')
    df_product['RESTRICTED USE'] = df_product['RESTRICTED USE'].str.replace('F', 'N')

    df_chemname = pd.read_fwf(chemname_file, encoding='ISO-8859-1', dtype=str, header=None, widths=[6, 20, 270, 1],
                              names=["PC_CODE", "CNAME_TYPE", "PC_NAME", "DISPLAY_IND"])
    df_chemname = df_chemname[df_chemname["DISPLAY_IND"] == "Y"]

    df_formula_sec3 = pd.read_fwf(formula_sec3, encoding='ISO-8859-1', dtype=str, header=None, widths=[11, 6, 7],
                                  names=["REG_NR", "PC_CODE", "PC_PCT"])
    df_formula_sec24c = pd.read_fwf(formula_sec24c, encoding='ISO-8859-1', dtype=str, header=None, widths=[8, 6, 7],
                                    names=["REG_NR", "PC_CODE", "PC_PCT"])
    df_formula = pd.concat([df_formula_sec3, df_formula_sec24c])

    df_formula = pd.merge(df_formula, df_chemname, on="PC_CODE", how='left')
    df_formula = df_formula[["REG_NR", "PC_NAME", "PC_PCT"]]
    df_formula["PC_PCT"] = df_formula["PC_PCT"].apply(pc_trans)

    df_product["REG_NR"] = df_product["EPA REGISTRATION NUMBER"].apply(reg_no_trans)
    group_list = df_product.columns.tolist()
    epa_data = pd.merge(df_product, df_formula, on='REG_NR', how='left')
    grouped = epa_data.groupby(group_list)
    epa_data = grouped['PC_NAME'].apply(lambda x: ' / '.join(x.astype(str))).reset_index()
    epa_data['PC_PCT'] = grouped['PC_PCT'].apply(lambda x: ', '.join(x.astype(str))).reset_index()['PC_PCT']
    epa_data = epa_data.drop("REG_NR", axis=1)

    epa_data = epa_data[list(epa_data.columns.drop('PRODUCT TYPE')) + ['PRODUCT TYPE']]
    epa_data = epa_data.astype(str)
    epa_data.replace('Nan', '', inplace=True)
    epa_data.replace('nan', '', inplace=True)
    epa_data.to_csv(csv_file, index=False)