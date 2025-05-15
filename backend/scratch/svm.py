import numpy as np
from cvxopt import matrix, solvers
import joblib

class SVMLinear:
    def __init__(self, C=1.0, threshold=1e-5, model_path=None):
        self.C = C
        self.threshold = threshold
        self.w = None
        self.b = None
        self.support_vectors = None
        self.support_labels = None
        self.support_lambdas = None
        if model_path:
            self.load_model(model_path)

    def fit(self, X_train, y_train):
        # Convert labels to {-1, 1}
        y_train_svm = np.where(y_train == 0, -1, 1)
        N = X_train.shape[0]

        # Compute the kernel matrix K for linear kernel: K[i,j] = y_i * y_j * (x_i . x_j)
        K = np.zeros((N, N))
        for i in range(N):
            for j in range(N):
                K[i, j] = y_train_svm[i] * y_train_svm[j] * np.dot(X_train[i], X_train[j])
        K = matrix(K)

        # Define QP problem parameters
        p = matrix(-np.ones((N, 1)))  # Linear term: -1 for all lambdas
        # Soft-margin constraints: 0 <= lambda <= C
        G = matrix(np.vstack((-np.eye(N), np.eye(N))))
        h = matrix(np.hstack((np.zeros(N), np.ones(N) * self.C)))
        A = matrix(y_train_svm, (1, N), 'd')  # Equality constraint: y^T lambda = 0
        b = matrix(0.0)

        # Solve QP problem
        solvers.options['show_progress'] = False
        sol = solvers.qp(K, p, G, h, A, b)
        l = np.array(sol['x']).flatten()  # Lagrange multipliers

        # Identify support vectors (lambda > small threshold)
        support_indices = np.where(l > self.threshold)[0]
        self.support_vectors = X_train[support_indices]
        self.support_labels = y_train_svm[support_indices]
        self.support_lambdas = l[support_indices]

        # Compute weight vector w
        self.w = np.sum(self.support_lambdas[:, None] * self.support_labels[:, None] * self.support_vectors, axis=0)

        # Compute bias b using average over support vectors
        self.b = np.mean(self.support_labels - self.support_vectors.dot(self.w))

    def predict(self, X):
        # Predict using decision function
        prediction = np.sign(X.dot(self.w) + self.b)
        return 0 if prediction == [-1] else 1

    def save_model(self, filename):
        model_dict = {
            'w': self.w,
            'b': self.b,
            'support_vectors': self.support_vectors,
            'support_labels': self.support_labels,
            'support_lambdas': self.support_lambdas,
            'C': self.C,
            'threshold': self.threshold
        }
        joblib.dump(model_dict, filename)

    def load_model(self, filename):
        model_dict = joblib.load(filename)
        self.w = model_dict['w']
        self.b = model_dict['b']
        self.support_vectors = model_dict['support_vectors']
        self.support_labels = model_dict['support_labels']
        self.support_lambdas = model_dict['support_lambdas']
        self.C = model_dict['C']
        self.threshold = model_dict['threshold']