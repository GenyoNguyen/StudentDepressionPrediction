import joblib

class LogisticRegressionSKLearn:
    def __init__(self):
        self.model = joblib.load("models/logreg_sklearn.pkl")

    def predict(self, X):
        return self.model.predict(X)

class LogisticRegressionScratch:
    def __init__(self):
        self.model = joblib.load("models/logreg_scratch.pkl")

    def predict(self, X):
        return self.model.predict(X)

class RandomForestSKLearn:
    def __init__(self):
        self.model = joblib.load("models/rf_sklearn.pkl")

    def predict(self, X):
        return self.model.predict(X)

class RandomForestScratch:
    def __init__(self):
        self.model = joblib.load("models/rf_scratch.pkl")

    def predict(self, X):
        return self.model.predict(X)

class KNNSKLearn:
    def __init__(self):
        self.model = joblib.load("models/knn_sklearn.pkl")

    def predict(self, X):
        return self.model.predict(X)

class KNNScratch:
    def __init__(self):
        self.model = joblib.load("models/knn_scratch.pkl")

    def predict(self, X):
        return self.model.predict(X)

class SVMSKLearn:
    def __init__(self):
        self.model = joblib.load("models/svm_sklearn.pkl")

    def predict(self, X):
        return self.model.predict(X)

class SVMScratch:
    def __init__(self):
        self.model = joblib.load("models/svm_scratch.pkl")

    def predict(self, X):
        return self.model.predict(X)