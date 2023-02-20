import xml.etree.ElementTree as ET
import glob

xml_data = glob.glob('PPIS-SEC3-ACTIVE-*.xml')[0]

tree = ET.parse(xml_data)

root = tree.getroot()

# Iterate over the PRODUCT elements
for product in root.findall('PRODUCT'):
    # Extract the data for each product
    product_name = product.find('PRODUCTNAME').text
    eparegistration_number = product.find('EPAREGISTRATIONNUMBER').text
    pesticide_form = product.find('PESTICIDEFORM').text
    approved_date = product.find('APPROVEDDATE').text
    cancel_transfer_date = product.find('CANCELTRANSFERDATE').text
    restricted_use_product = product.find('RESTRICTEDUSEPRODUCT').text
    conditionally_flag = product.find('CONDITIONALLYFLAG').text
    signal_word = product.find('SIGNALWORD').text
    alt_brand_name_list = product.find('ALTBRANDNAMELIST').text
    company_number = product.find('COMPANY/COMPANYNUMBER').text
    formulation = product.find('FORMULATIONLIST').text


    print(eparegistration_number)

    # Print the extracted data
    # print('Product name:', product_name)
    # print('EPA registration number:', eparegistration_number)
    # print('Pesticide form:', pesticide_form)
    # print('Approved date:', approved_date)
    # print('Cancel transfer date:', cancel_transfer_date)
    # print('Restricted use product:', restricted_use_product)
    # print('Conditionally flag:', conditionally_flag)
    # print('Signal word:', signal_word)
    # print('Alternate brand name list:', alt_brand_name_list)
    # print('Company number:', company_number)
    # print('Company name:', company_name)

