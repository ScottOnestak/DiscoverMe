import pandas as pd
data = pd.io.stata.read_stata('ICPSR6379.dta')
data.to_csv('stataFile.csv')