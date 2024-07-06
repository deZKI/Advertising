import pandas as pd

# Загрузка данных из Excel
file_path = 'объекты.xlsx'
df = pd.read_excel(file_path)

# Извлечение уникальных значений для District и LargeArea
unique_districts = set()
unique_large_areas = set()

# Разделение строк по запятым и добавление в множество уникальных значений
for districts in df['district'].dropna():
    unique_districts.update(districts.split(','))

for large_areas in df['large_area'].dropna():
    unique_large_areas.update(large_areas.split(','))

unique_districts = sorted(unique_districts)
unique_large_areas = sorted(unique_large_areas)

print(unique_districts)
print(unique_large_areas)

