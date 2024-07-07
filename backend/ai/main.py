import pandas as pd
import numpy as np
import json
import joblib
from sklearn.preprocessing import OneHotEncoder
from typing import Dict, List, Union

from ai.filters import all_points_on_water_or_vegetation

REQUIRED_COLUMNS = ['x : -inf - 55.55 | y : -inf - 37.3', 'x : -inf - 55.55 | y : 37.3 - 37.5',
                    'x : -inf - 55.55 | y : 37.5 - 37.699999999999996',
                    'x : -inf - 55.55 | y : 37.699999999999996 - 37.9',
                    'x : -inf - 55.55 | y : 37.9 - inf', 'x : 55.55 - 55.68333333333333 | y : -inf - 37.3',
                    'x : 55.55 - 55.68333333333333 | y : 37.3 - 37.5',
                    'x : 55.55 - 55.68333333333333 | y : 37.5 - 37.699999999999996',
                    'x : 55.55 - 55.68333333333333 | y : 37.699999999999996 - 37.9',
                    'x : 55.55 - 55.68333333333333 | y : 37.9 - inf',
                    'x : 55.68333333333333 - 55.81666666666667 | y : -inf - 37.3',
                    'x : 55.68333333333333 - 55.81666666666667 | y : 37.3 - 37.5',
                    'x : 55.68333333333333 - 55.81666666666667 | y : 37.5 - 37.699999999999996',
                    'x : 55.68333333333333 - 55.81666666666667 | y : 37.699999999999996 - 37.9',
                    'x : 55.68333333333333 - 55.81666666666667 | y : 37.9 - inf',
                    'x : 55.81666666666667 - 55.95 | y : -inf - 37.3',
                    'x : 55.81666666666667 - 55.95 | y : 37.3 - 37.5',
                    'x : 55.81666666666667 - 55.95 | y : 37.5 - 37.699999999999996',
                    'x : 55.81666666666667 - 55.95 | y : 37.699999999999996 - 37.9',
                    'x : 55.81666666666667 - 55.95 | y : 37.9 - inf',
                    'x : 55.95 - inf | y : -inf - 37.3', 'x : 55.95 - inf | y : 37.3 - 37.5',
                    'x : 55.95 - inf | y : 37.5 - 37.699999999999996',
                    'x : 55.95 - inf | y : 37.699999999999996 - 37.9', 'x : 55.95 - inf | y : 37.9 - inf', 'value',
                    'ageFrom', 'ageTo', 'income_abc',
                    'income_ac', 'income_bc', 'income_c', 'name_18-55', 'name_20-55 BC', 'name_30-99 C',
                    'name_35-100 C', 'name_ALL 18-54',
                    'name_ALL 18-55 BC', 'name_ALL 25-45 ', 'name_ALL 25-55 BC', 'name_ALL 30-50 AB',
                    'name_ALL 35-55 BC', 'name_ALL 35-55 C',
                    'name_All 13-25', 'name_All 14-49', 'name_All 15-25', 'name_All 18+', 'name_All 18+ C',
                    'name_All 18-100 BC', 'name_All 18-35 C',
                    'name_All 18-45', 'name_All 18-50 ', 'name_All 18-55 BC', 'name_All 20-40', 'name_All 20-40 BC',
                    'name_All 20-45 BC', 'name_All 20-55',
                    'name_All 20-55 C', 'name_All 25+ C', 'name_All 25-44 BC', 'name_All 25-45', 'name_All 25-45 AB',
                    'name_All 25-45 BC', 'name_All 25-50',
                    'name_All 25-50 BC', 'name_All 25-54 BC', 'name_All 25-55', 'name_All 25-55 BC', 'name_All 25-55 C',
                    'name_All 25-55 leroy_2021_04_remont',
                    'name_All 25-60', 'name_All 30-55 BC', 'name_All 30-55 C', 'name_All 35-45', 'name_All 35-54',
                    'name_All 35-55 C', 'name_All 35-70 BC',
                    'name_All 45-65 BC', 'name_M 18-35', 'name_M 25-54', 'name_M 25-55 ', 'name_M 25-55 BC',
                    'name_M 30-55 BC', 'name_M 35-55 BС  ',
                    'name_M 35-60', 'name_W 18+', 'name_W 18-25', 'name_W 18-45', 'name_W 18-45 BC', 'name_W 20-49 BC',
                    'name_W 25-45', 'name_W 25-45 BC',
                    'name_W 25-54', 'name_W 25-55 ', 'name_W 25-55 BC', 'name_W 30+ BC', 'name_W 30-55 BC',
                    'name_W 30-60', 'name_W 35+ BC', 'name_W 35-55 BC',
                    'name_W24+', 'gender_female', 'gender_male']


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

    # Проверяем и добавляем недостающие столбцы
    for column in REQUIRED_COLUMNS:
        if column not in dataset.columns:
            dataset[column] = 0

    X = dataset

    # Загружаем модель CatBoost
    loaded_model = joblib.load('ai/catboost_model.pkl')

    # Прогнозируем с помощью модели CatBoost
    predictions = loaded_model.predict(X)

    predictions_df = pd.DataFrame(predictions, columns=['prediction'])
    result_df = pd.concat([df.reset_index(drop=True), predictions_df], axis=1)

    # Устанавливаем prediction в 0, если все точки находятся на воде или в зелени - такая фильтрация на зону

    result_df.loc[result_df['points'].apply(all_points_on_water_or_vegetation), 'prediction'] = 0

    return result_df