import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


class Preprocess:
    def __init__(self):
        self.__data = pd.read_csv("../dataset/student_depression_dataset_encoded.csv")
        self.__data = self.__data.drop(columns=["id", "Depression"])
        self.__data = self.__data.reindex(sorted(self.__data.columns), axis=1)
        self.__cat_features = ['Gender', 'Sleep Duration', 'Dietary Habits', 'Degree',
                'Have you ever had suicidal thoughts ?', 'Family History of Mental Illness', 'Financial Stress']
        self.__cat_dict = dict()
        for feature in self.__cat_features:
            columns = list(col.split('_')[-1] for col in self.__data.filter(like=feature).columns)
            self.__cat_dict[feature] = columns
        
        self.scaler = StandardScaler()

        X_train, _ = train_test_split(self.__data, test_size=0.2, random_state=42)

        self.scaler = StandardScaler()
        self.scaler.fit(X_train)

    def preprocess(self, data):
        sleep_duration_mapping = {
            "'Less than 5 hours'": 1,
            "'5-6 hours'": 2,
            "'7-8 hours'": 3,
            "'More than 8 hours'": 4
        }

        # Apply the mapping to the 'Sleep Duration' column
        data['Sleep Duration'] = data['Sleep Duration'].map(sleep_duration_mapping)

        data = self.__one_hot_encode(data)
        data = data.reindex(sorted(data.columns), axis=1)
        print(data.T)

        return self.scaler.transform(data)
    
    def __one_hot_encode(self, df):
        non_categorical_features = [col for col in df.columns if col not in self.__cat_features]
        result_df = df[non_categorical_features].copy()
        
        for feature in self.__cat_features:
            # Apply one-hot encoding to each value in the column
            encoded_dfs = [self.__encode(self.__cat_dict[feature], value, prefix=feature) 
                        for value in df[feature]]
            encoded_df = pd.concat(encoded_dfs, ignore_index=True)
            encoded_df.index = df.index
            
            # Concatenate encoded columns
            result_df = pd.concat([result_df, encoded_df], axis=1)
        
        return result_df
    
    def __encode(self, categories, value, prefix=''):
        if prefix:
            columns = [f"{prefix}_{cat}" for cat in categories]
        else:
            columns = list(categories)
        
        encoded = np.zeros(len(categories), dtype=bool)
        if value in categories:
            encoded[categories.index(value)] = True
        
        return pd.DataFrame([encoded], columns=columns)