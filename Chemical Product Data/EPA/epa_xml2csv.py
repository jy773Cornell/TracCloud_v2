import xml.etree.ElementTree as ET
import pandas as pd
import glob
import csv


def reg_no_trans(reg_no):
    if "-" in reg_no:
        parts = reg_no.split("-")
        first_part = parts[0].zfill(6)
        second_part = parts[1].zfill(5)
        return first_part + second_part
    return reg_no


def pc_trans(pc):
    return f"{float(pc) / 1000000:.6f}".rstrip('0').rstrip('.')


def xml2csv_write_row(csv_writer, xml_root):
    for product in xml_root.findall('PRODUCT'):
        eparegistration_number = product.find('EPAREGISTRATIONNUMBER').text
        product_name = product.find('PRODUCTNAME').text
        restricted_use_product = product.find('RESTRICTEDUSEPRODUCT').text
        company_number = product.find('COMPANY/COMPANYNUMBER').text
        company_name = product.find('COMPANY/COMPANYNAME').text

        type_list = []
        for product_type in product.findall('TYPESLIST/TYPES'):
            type_list.append(list(product_type)[1].text)
        type_list = ", ".join(type_list)

        row = [eparegistration_number, product_name, restricted_use_product, company_number, company_name, type_list]
        csv_writer.writerow(row)


def refresh_epa_data():

    # File Paths

    csv_file = 'Trac Cloud EPA Product Data.csv'

    chemname_file = 'PPIS-XML/chemname.txt'

    formula_sec3 = 'PPIS-XML/formula.txt'
    sec3_xml_data = glob.glob('PPIS-XML/PPIS-SEC3-ACTIVE-*.xml')[0]
    sec3_tree = ET.parse(sec3_xml_data)
    sec3_root = sec3_tree.getroot()

    formula_sec24c = 'PPIS-XML/form24c.txt'
    sec24c_xml_data = glob.glob('PPIS-XML/PPIS-SEC24C-ACTIVE-*.xml')[0]
    sec24c_tree = ET.parse(sec24c_xml_data)
    sec24c_root = sec24c_tree.getroot()

    # Create initial csv file using xml
    # Create initial csv file using xml

    with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile, quoting=csv.QUOTE_NONNUMERIC)
        writer.writerow(
            ['EPA REGISTRATION NUMBER', 'PRODUCT NAME', 'RESTRICTED USE', 'Company Code', 'Company Name',
             'PRODUCT TYPE'])

        xml2csv_write_row(writer, sec3_root)
        xml2csv_write_row(writer, sec24c_root)

    # Add Active Ingredient Info

    df_product = pd.read_csv(csv_file)
    df_product = df_product.astype(str)

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
    chemical_data = pd.merge(df_product, df_formula, on='REG_NR', how='left')
    grouped = chemical_data.groupby(group_list)
    chemical_data = grouped['PC_NAME'].apply(lambda x: ' / '.join(x.astype(str))).reset_index()
    chemical_data['PC_PCT'] = grouped['PC_PCT'].apply(lambda x: ', '.join(x.astype(str))).reset_index()['PC_PCT']
    chemical_data = chemical_data.drop("REG_NR", axis=1)

    chemical_data.to_csv('Trac Cloud EPA Product Data.csv', index=False)

    return ()


refresh_epa_data()
