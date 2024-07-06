import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import json
from sklearn.preprocessing import OneHotEncoder


class NeuralNetwork(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNetwork, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out


def split_on_intervals(min_val, max_val, n):
    step = (max_val - min_val) / n
    intervals = [min_val + (step * x) for x in range(n + 1)]
    return intervals


def create_groups(x_intervals, y_intervals):
    groups = {}
    x_intervals = np.concatenate([[-np.inf], x_intervals, [np.inf]])
    y_intervals = np.concatenate([[-np.inf], y_intervals, [np.inf]])

    for x_i in range(len(x_intervals) - 1):
        for y_i in range(len(y_intervals) - 1):
            groups[f'x : {x_intervals[x_i]} - {x_intervals[x_i + 1]} | y : {y_intervals[y_i]} - {y_intervals[y_i + 1]}'] = 0

    return groups


def sort_on_groups(x_vals, y_vals, x_intervals, y_intervals, groups, only_vals=False):
    for x, y in zip(x_vals, y_vals):
        for x_i in range(len(x_intervals) - 1):
            for y_i in range(len(y_intervals) - 1):
                if ((x_intervals[x_i] <= x < x_intervals[x_i + 1]) and (y_intervals[y_i] <= y < y_intervals[y_i + 1])):
                    groups[f'x : {x_intervals[x_i]} - {x_intervals[x_i + 1]} | y : {y_intervals[y_i]} - {y_intervals[y_i + 1]}'] += 1

    if only_vals:
        return list(groups.values())

    return groups


def create_dataset(config, df):
    x_intervals = split_on_intervals(config['min_xval'], config['max_xval'], config['x_ngroups'])
    y_intervals = split_on_intervals(config['min_yval'], config['max_yval'], config['y_ngroups'])

    groups = create_groups(x_intervals, y_intervals)
    groups_values = []

    for i in range(len(df)):
        g = df.iloc[i]

        # Check if 'points' is a string and convert it to a list of dictionaries if so
        if isinstance(g['points'], str):
            try:
                g['points'] = json.loads(g['points'].replace("'", "\""))  # Replace single quotes with double quotes
            except json.JSONDecodeError as e:
                print(f"JSON decoding error in row {i}: {g['points']}")
                continue

        points = np.array([[float(x['lat']), float(x['lon'])] for x in g['points']])

        group_values = sort_on_groups(points[:, 0], points[:, 1], x_intervals, y_intervals, groups.copy(),
                                      only_vals=True)
        groups_values.append(group_values)

    groups_values = np.array(groups_values)

    for i, key in enumerate(groups.keys()):
        groups[key] = groups_values[:, i]

    return groups


def apply_onehotencoding(df, columns):
    df_encoded = df.copy()
    encoder = OneHotEncoder(drop='first')

    for column in columns:
        encoded_data = encoder.fit_transform(df_encoded[[column]])
        encoded_df = pd.DataFrame(encoded_data.toarray(), columns=encoder.get_feature_names_out([column]))
        df_encoded = pd.concat([df_encoded.drop(columns=[column]), encoded_df], axis=1)

    return df_encoded


def main():
    use_json = False  # If True, read JSON; if False, read CSV

    if use_json:
        df = pd.read_json('train_data.json')
    else:
        df = pd.read_csv('train_data.csv')

        # Convert JSON strings in 'points' column to list of dictionaries
        if 'points' in df.columns and isinstance(df['points'].iloc[0], str):
            df['points'] = df['points'].apply(lambda x: json.loads(x.replace("'", "\"")))

        # Replace single quotes with double quotes in 'targetAudience' column if present
        if 'targetAudience' in df.columns and isinstance(df['targetAudience'].iloc[0], str):
            df['targetAudience'] = df['targetAudience'].apply(lambda x: json.loads(x.replace("'", "\"")))

    if 'targetAudience' in df.columns:
        df = pd.concat([df, pd.json_normalize(df['targetAudience'])], axis=1)
        df.drop('targetAudience', axis=1, inplace=True)

    if 'targetAudience.id' in df.columns:
        df.drop('targetAudience.id', axis=1, inplace=True)

    # Rename columns containing 'targetAudience.'
    new_columns = {col: col.replace('targetAudience.', '') for col in df.columns if 'targetAudience.' in col}
    df.rename(columns=new_columns, inplace=True)

    config = {'min_xval': 55.55, 'max_xval': 55.95, 'min_yval': 37.3, 'max_yval': 37.9, 'x_ngroups': 3, 'y_ngroups': 3}
    dataset = pd.DataFrame(create_dataset(config, df))

    columns_to_encode = ['income', 'name', 'gender']
    df = apply_onehotencoding(df, columns_to_encode)
    df2_filtered = df.iloc[:, 2:]

    dataset = dataset.join(df2_filtered)
    X = dataset

    input_size = X.shape[1]
    hidden_size = 256
    num_classes = 1
    loaded_model = NeuralNetwork(input_size, hidden_size, num_classes)
    loaded_model.load_state_dict(torch.load('model_parameters.pth'))
    loaded_model.eval()

    with torch.no_grad():  # Changed to torch.no_grad() for inference
        test_inputs = torch.tensor(X.values, dtype=torch.float32)
        y_pred = loaded_model(test_inputs)
        predictions_df = pd.DataFrame(y_pred.numpy(), columns=['prediction'])

    result_df = pd.concat([df.reset_index(drop=True), predictions_df], axis=1)
    print(result_df.head())  # Example of result output


if __name__ == "__main__":
    main()
