import pandas as pd
import json
import sys


def json_to_excel(json_data, excel_file):
    try:
        # Преобразовать JSON в DataFrame
        df = pd.json_normalize(json_data)

        # Записать DataFrame в Excel файл
        df.to_csv(excel_file, index=False)
        print(f"Данные успешно сохранены в файл {excel_file}")
    except Exception as e:
        print(f"Произошла ошибка: {e}")


if __name__ == "__main__":
    # python json_to_excel.py train_data.json output2.csv
    if len(sys.argv) != 3:
        print("Использование: python script.py input.json output.xlsx")
    else:
        json_file = sys.argv[1]
        excel_file = sys.argv[2]

        # Прочитать JSON файл
        with open(json_file, 'r', encoding='utf-8') as f:
            json_data = json.load(f)

        # Преобразовать JSON в Excel
        json_to_excel(json_data, excel_file)

