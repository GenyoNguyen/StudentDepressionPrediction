import joblib
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

class LogisticRegressionScratch:
    def __init__(self, learning_rate=0.001, n_iters=1000, model_path=None):
        self.lr = learning_rate
        self.n_iters = n_iters
        self.weights = None
        self.bias = None
        if model_path:
            self.load_model(model_path)

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0

        for _ in range(self.n_iters):
            linear_model = np.dot(X, self.weights) + self.bias
            y_pred = sigmoid(linear_model)

            dw = (1 / n_samples) * np.dot(X.T, (y_pred - y))
            db = (1 / n_samples) * np.sum(y_pred - y)

            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        y_pred = sigmoid(linear_model)
        return np.where(y_pred > 0.5, 1, 0)

    def predict_proba(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        probs = sigmoid(linear_model)
        return np.vstack([1 - probs, probs]).T
    
    def load_model(self, filename):
        state = joblib.load(filename)
        self.weights = state['weights']
        self.bias = state['bias']