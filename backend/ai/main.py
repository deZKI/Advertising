import pandas as pd
import numpy as np
import json
import joblib
from sklearn.preprocessing import OneHotEncoder
from typing import Dict, List, Union


def split_on_intervals(min_val: float, max_val: float, n: int) -> List[float]:
    """
    Разделяет диапазон значений на равные интервалы.

    :param min_val: Минимальное значение диапазона.
    :param max_val: Максимальное значение диапазона.
    :param n: Количество интервалов.
    :return: Список границ интервалов.
    """
    step = (max_val - min_val) / n
    intervals = [min_val + (step * x) for x in range(n + 1)]
    return intervals


def create_groups(x_intervals: np.ndarray, y_intervals: np.ndarray) -> Dict[str, int]:
    """
    Создает группы на основе интервалов по координатам x и y.

    :param x_intervals: Интервалы для координаты x.
    :param y_intervals: Интервалы для координаты y.
    :return: Словарь, где ключи - это названия групп, а значения - количество точек в группе.
    """
    groups = {}
    x_intervals = np.concatenate([[-np.inf], x_intervals, [np.inf]])
    y_intervals = np.concatenate([[-np.inf], y_intervals, [np.inf]])

    for x_i in range(len(x_intervals) - 1):
        for y_i in range(len(y_intervals) - 1):
            groups[
                f'x : {x_intervals[x_i]} - {x_intervals[x_i + 1]} | y : {y_intervals[y_i]} - {y_intervals[y_i + 1]}'] = 0

    return groups


def sort_on_groups(x_vals: np.ndarray, y_vals: np.ndarray, x_intervals: np.ndarray, y_intervals: np.ndarray,
                   groups: Dict[str, int], only_vals: bool = False) -> Union[Dict[str, int], List[int]]:
    """
    Сортирует точки по группам и подсчитывает количество точек в каждой группе.

    :param x_vals: Значения координаты x.
    :param y_vals: Значения координаты y.
    :param x_intervals: Интервалы для координаты x.
    :param y_intervals: Интервалы для координаты y.
    :param groups: Словарь групп.
    :param only_vals: Возвращать только значения (True) или словарь групп (False).
    :return: Словарь групп или список значений.
    """
    for x, y in zip(x_vals, y_vals):
        for x_i in range(len(x_intervals) - 1):
            for y_i in range(len(y_intervals) - 1):
                if (x_intervals[x_i] <= x < x_intervals[x_i + 1]) and (y_intervals[y_i] <= y < y_intervals[y_i + 1]):
                    groups[
                        f'x : {x_intervals[x_i]} - {x_intervals[x_i + 1]} | y : {y_intervals[y_i]} - {y_intervals[y_i + 1]}'] += 1

    if only_vals:
        return list(groups.values())

    return groups


def create_dataset(config: Dict[str, Union[float, int]], df: pd.DataFrame) -> Dict[str, np.ndarray]:
    """
    Создает датасет на основе заданной конфигурации и исходного DataFrame.

    :param config: Конфигурация с параметрами интервалов.
    :param df: Исходный DataFrame.
    :return: Датасет в виде словаря, где ключи - группы, а значения - количество точек в каждой группе.
    """
    x_intervals = split_on_intervals(config['min_xval'], config['max_xval'], config['x_ngroups'])
    y_intervals = split_on_intervals(config['min_yval'], config['max_yval'], config['y_ngroups'])

    groups = create_groups(np.array(x_intervals), np.array(y_intervals))
    groups_values = []

    for i in range(len(df)):
        g = df.iloc[i]

        # Проверяем, является ли 'points' строкой, и конвертируем ее в список словарей, если это так
        if isinstance(g['points'], str):
            try:
                g['points'] = json.loads(g['points'].replace("'", "\""))  # Заменяем одинарные кавычки на двойные
            except json.JSONDecodeError as e:
                print(f"Ошибка декодирования JSON в строке {i}: {g['points']}")
                continue

        points = np.array([[float(x['lat']), float(x['lon'])] for x in g['points']])

        group_values = sort_on_groups(points[:, 0], points[:, 1], np.array(x_intervals), np.array(y_intervals),
                                      groups.copy(), only_vals=True)
        groups_values.append(group_values)

    groups_values = np.array(groups_values)

    for i, key in enumerate(groups.keys()):
        groups[key] = groups_values[:, i]

    return groups


def apply_onehotencoding(df: pd.DataFrame, columns: List[str]) -> pd.DataFrame:
    """
    Применяет one-hot encoding к заданным колонкам DataFrame.

    :param df: Исходный DataFrame.
    :param columns: Список колонок для one-hot encoding.
    :return: DataFrame с one-hot encoding колонками.
    """
    df_encoded = df.copy()
    encoder = OneHotEncoder(drop='first')

    for column in columns:
        encoded_data = encoder.fit_transform(df_encoded[[column]])
        encoded_df = pd.DataFrame(encoded_data.toarray(), columns=encoder.get_feature_names_out([column]))
        df_encoded = pd.concat([df_encoded.drop(columns=[column]), encoded_df], axis=1)

    return df_encoded


def main(df: pd.DataFrame) -> pd.DataFrame:
    """
    Основная функция для обработки данных и предсказаний модели.

    :param df: Исходный DataFrame.
    :return: DataFrame с предсказаниями модели.
    """
    if 'points' in df.columns and isinstance(df['points'].iloc[0], str):
        df['points'] = df['points'].apply(lambda x: json.loads(x.replace("'", "\"")))

    # Заменяем одинарные кавычки на двойные в колонке 'targetAudience', если она присутствует
    if 'targetAudience' in df.columns and isinstance(df['targetAudience'].iloc[0], str):
        df['targetAudience'] = df['targetAudience'].apply(lambda x: json.loads(x.replace("'", "\"")))

    if 'targetAudience' in df.columns:
        df = pd.concat([df, pd.json_normalize(df['targetAudience'])], axis=1)
        df.drop('targetAudience', axis=1, inplace=True)

    if 'targetAudience.id' in df.columns:
        df.drop('targetAudience.id', axis=1, inplace=True)

    # Переименовываем колонки, содержащие 'targetAudience.'
    new_columns = {col: col.replace('targetAudience.', '') for col in df.columns if 'targetAudience.' in col}
    df.rename(columns=new_columns, inplace=True)

    config = {'min_xval': 55.55, 'max_xval': 55.95, 'min_yval': 37.3, 'max_yval': 37.9, 'x_ngroups': 3, 'y_ngroups': 3}
    dataset = pd.DataFrame(create_dataset(config, df))

    columns_to_encode = ['income', 'name', 'gender']
    df2 = apply_onehotencoding(df, columns_to_encode)
    df2_filtered = df2.iloc[:, 2:]

    dataset = dataset.join(df2_filtered)
    X = dataset

    # Загружаем модель CatBoost
    loaded_model = joblib.load('ai/catboost_model.pkl')

    # Прогнозируем с помощью модели CatBoost
    predictions = loaded_model.predict(X)

    predictions_df = pd.DataFrame(predictions, columns=['prediction'])
    result_df = pd.concat([df.reset_index(drop=True), predictions_df], axis=1)
    return result_df


if __name__ == "__main__":
    df = pd.read_csv('path_to_your_file.csv')  # Загрузите ваш DataFrame из файла
    result = main(df)
    result.to_csv('result.csv', index=False)
    print("Результат сохранен в 'result.csv'")
