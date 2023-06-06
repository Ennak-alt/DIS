import pandas as pd
import math

df = pd.read_csv('vehicles.csv')

#df.pop('url')
#df.pop('region_url')
#df.pop('image_url')
#df.pop('lat')
#df.pop('long')
#df.pop('title_status')

newdf = []
for index, row in df.iterrows(): 
    if str(row['region']) == "nan":
        df.at[index, 'region'] = "auburn"
    df.at[index, 'price'] = str(row['price'])[:5]
    if str(row['year']) == "nan":
        df.at[index, 'year'] = 2010
    df.at[index, 'year'] = int(df['year'][index])
    if str(row['manufacturer']) == "nan":
        df.at[index, 'manufacturer'] = "gmc"
    if str(row['model']) == "nan":
        df.at[index, 'model'] = "unknown"
    else:
        df.at[index, 'model'] = row['model'].replace(';', '')
    if str(row['condition']) == "nan":
        df.at[index,'condition'] = "good"
    if str(row['cylinders']) == "nan":
        df.at[index, 'cylinders'] = 6
    elif row['cylinders'][0].isdigit():
        df.at[index, 'cylinders'] = int(row['cylinders'][0])
    else: 
        df.at[index, 'cylinders'] = 8
    if str(row['fuel']) == "nan":
        df.at[index, 'fuel'] = "other"
    if str(row['odometer']) == "nan":
        df.at[index,'odometer'] = 0
    # df.at['odometer'] = int(df['odometer'][index])
    if str(row['transmission']) == "nan":
        df.at[index, 'transmission'] = "other"
    if str(row['drive']) == "nan":
        df.at[index, 'drive']= "rwd"
    if str(row['size']) == "nan":
        df.at[index, 'size'] = "mid-size"
    if str(row['type']) == "nan":
        df.at[index, 'type'] = "other"
    if str(row['paint_color']) == "nan":
        df.at[index, 'paint_color'] = "blue"
    if str(row['description']) != "nan":
        df.at[index, 'description'] = row['description'].replace(';', '')
#    if index == 10100:
#        break
#newdf = df[27:].head(10000)
newdf = df
newdf['year'] = newdf['year'].fillna(0).astype(int)
newdf['odometer'] = newdf['odometer'].fillna(0).astype(int)
newdf['cylinders'] = newdf['cylinders'].fillna(0).astype(int)

print(newdf.to_csv("oldcars.csv", sep = ';'))
