import numpy as np
from collections import Counter
import joblib
class KNN:
    def __init__(self, k=3, model_path=None):
        self.k = k
        self.X_train = None
        self.y_train = None
        if model_path:
            self.load_model(model_path)

    def fit(self, X, y):
        self.X_train = X.values if hasattr(X, 'values') else np.array(X)
        self.y_train = y.values if hasattr(y, 'values') else np.array(y)

    def _predict_one(self, x):
        distances = np.linalg.norm(self.X_train - x, axis=1)
        k_idx    = np.argsort(distances)[:self.k]
        labels   = self.y_train[k_idx]
        return Counter(labels).most_common(1)[0][0]

    def predict(self, X):
        X_arr = X.values if hasattr(X, 'values') else np.array(X)
        return np.array([self._predict_one(x) for x in X_arr])

    def predict_proba(self, X):
        X_arr = X.values if hasattr(X, 'values') else np.array(X)
        probs = []
        for x in X_arr:
            distances = np.linalg.norm(self.X_train - x, axis=1)
            k_idx     = np.argsort(distances)[:self.k]
            labels    = self.y_train[k_idx]
            probs.append(np.mean(labels == 1))
        probs = np.array(probs)
        return np.vstack([1 - probs, probs]).T

    def load_model(self, filename):
        state = joblib.load(filename)
        self.X_train = state['X_train']
        self.y_train = state['y_train']
        self.k = state['k']