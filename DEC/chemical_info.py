import glob
import pandas as pd

product_file = glob.glob('product-open-data/*ProductData-*.csv')[0]
ai_file = glob.glob('product-open-data/*ProductData_ActiveIngredients-*.csv')[0]
type_file = glob.glob('product-open-data/*ProductData_ProductType-*.csv')[0]
use_file = glob.glob('product-open-data/*ProductData_ProductUse-*.csv')[0]
route_file = glob.glob('product-open-data/*ProductData_RouteOfExposure-*.csv')[0]
toxicity_file = glob.glob('product-open-data/*ProductData_Toxicity-*.csv')[0]

df_product = pd.read_csv(product_file)
df_ai = pd.read_csv(ai_file)
df_type = pd.read_csv(type_file)
df_use = pd.read_csv(use_file)
df_route = pd.read_csv(route_file)
df_toxicity = pd.read_csv(toxicity_file)

info_product = df_product[
    ['PRODUCT ID', 'EPA REGISTRATION NUMBER', 'PRODUCT NAME', 'RESTRICTED USe', 'FORMULATION', 'DENSITY',
     'REGISTRATION STATUS', ]]
info_ai = df_ai[['PRODUCT ID', 'ACTIVE INGREDIENT ID', 'PC CODE', 'PC NAME', 'ACTIVE INGREDIENT PERCENTAGE']]

result = pd.merge(info_product, info_ai, on='PRODUCT ID', how='left')
result.to_csv('Trac Cloud DEC Product Data.csv', index=False)
