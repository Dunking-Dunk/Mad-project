import tensorflow as tf
import numpy as np
import pandas as pd

loaded_model = tf.keras.models.load_model('best_model.h5')

new_data = pd.read_csv("test.csv")

new_data = new_data.values

new_data = np.expand_dims(new_data, axis=0)

predictions = loaded_model.predict(new_data).flatten()

print(predictions)