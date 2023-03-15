import glob
import pandas as pd

ref_file = glob.glob('Trac Cloud-Reference*.xlsx')[0]
print(ref_file)
data = pd.read_excel(ref_file, sheet_name='Crop')
print(data)