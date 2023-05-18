import pandas as pd

df = pd.read_csv('vehicles.csv')

df.pop('url')
df.pop('region_url')
df.pop('image_url')
df.pop('lat')
df.pop('long')
df.pop('title_status')

print(df.head(2000).to_csv("cars.csv", sep = ';'))
