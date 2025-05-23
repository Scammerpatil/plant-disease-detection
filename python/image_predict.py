import os
import locale
import json
import sys
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

# Setup encoding for output
sys.stdout.reconfigure(encoding='utf-8')
os.environ["PYTHONIOENCODING"] = "utf-8"
myLocale = locale.setlocale(category=locale.LC_ALL, locale="en_GB.UTF-8")

# ----------------- Config -----------------
IMAGE_PATH = 'python/upload/plant.jpg'
MODEL_PATH = 'python/model.h5'

diseases = [
    'Tomato___Late_blight', 'Tomato___healthy', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Soybean___healthy', 
    'Squash___Powdery_mildew', 'Potato___healthy', 
    'Corn_(maize)___Northern_Leaf_Blight', 'Tomato___Early_blight', 
    'Tomato___Septoria_leaf_spot', 'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot',
    'Strawberry___Leaf_scorch', 'Peach___healthy', 'Apple___Apple_scab',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Bacterial_spot',
    'Apple___Black_rot', 'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew', 'Peach___Bacterial_spot',
    'Apple___Cedar_apple_rust', 'Tomato___Target_Spot', 
    'Pepper,_bell___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 
    'Potato___Late_blight', 'Tomato___Tomato_mosaic_virus',
    'Strawberry___healthy', 'Apple___healthy', 'Grape___Black_rot',
    'Potato___Early_blight', 'Cherry_(including_sour)___healthy', 
    'Corn_(maize)___Common_rust_', 'Grape___Esca_(Black_Measles)',
    'Raspberry___healthy', 'Tomato___Leaf_Mold', 
    'Tomato___Spider_mites Two-spotted_spider_mite', 
    'Pepper,_bell___Bacterial_spot', 'Corn_(maize)___healthy'
]
diseases.sort()
disease_to_pesticide = {
    "Apple___Apple_scab": "Captan, Mancozeb",
    "Apple___Black_rot": "Ziram, Captan",
    "Apple___Cedar_apple_rust": "Myclobutanil",
    "Apple___healthy": "No pesticide needed",
    "Blueberry___healthy": "No pesticide needed",
    "Cherry_(including_sour)___Powdery_mildew": "Sulfur, Myclobutanil",
    "Cherry_(including_sour)___healthy": "No pesticide needed",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Strobilurins",
    "Corn_(maize)___Common_rust_": "Propiconazole",
    "Corn_(maize)___Northern_Leaf_Blight": "Azoxystrobin",
    "Corn_(maize)___healthy": "No pesticide needed",
    "Grape___Black_rot": "Mancozeb, Captan",
    "Grape___Esca_(Black_Measles)": "No effective chemical control",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Mancozeb",
    "Grape___healthy": "No pesticide needed",
    "Orange___Haunglongbing_(Citrus_greening)": "Vector control: Imidacloprid",
    "Peach___Bacterial_spot": "Copper-based sprays",
    "Peach___healthy": "No pesticide needed",
    "Pepper,_bell___Bacterial_spot": "Copper-based sprays",
    "Pepper,_bell___healthy": "No pesticide needed",
    "Potato___Early_blight": "Chlorothalonil, Mancozeb",
    "Potato___Late_blight": "Metalaxyl, Mancozeb",
    "Potato___healthy": "No pesticide needed",
    "Raspberry___healthy": "No pesticide needed",
    "Soybean___healthy": "No pesticide needed",
    "Squash___Powdery_mildew": "Sulfur, Neem oil",
    "Strawberry___Leaf_scorch": "Captan",
    "Strawberry___healthy": "No pesticide needed",
    "Tomato___Bacterial_spot": "Copper sprays",
    "Tomato___Early_blight": "Chlorothalonil, Mancozeb",
    "Tomato___Late_blight": "Metalaxyl",
    "Tomato___Leaf_Mold": "Copper-based fungicides",
    "Tomato___Septoria_leaf_spot": "Chlorothalonil",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Insecticidal soap, Neem oil",
    "Tomato___Target_Spot": "Chlorothalonil",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Vector control: Imidacloprid",
    "Tomato___Tomato_mosaic_virus": "Sanitation, resistant varieties",
    "Tomato___healthy": "No pesticide needed"
}

# ----------------- Load Model -----------------
model = load_model(MODEL_PATH)

# ----------------- Predict Function -----------------
def predict_diseases(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((256, 256))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]
    predicted_prob = int(round(float(np.max(predictions)) * 100, 2))
    pesticide = disease_to_pesticide.get(diseases[predicted_class], "No pesticide needed")

    return {
        "disease": diseases[predicted_class],
        "probability": predicted_prob,
        "pesticide": pesticide
    }

# ----------------- Check if Image is of Leaf -----------------
def detect_leaf(image):
    """ Checks if the image contains a leaf using color thresholding. """
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lower_green = np.array([25, 40, 40], dtype=np.uint8)
    upper_green = np.array([90, 255, 255], dtype=np.uint8)

    mask = cv2.inRange(hsv, lower_green, upper_green)
    leaf_pixels = np.count_nonzero(mask)

    return leaf_pixels > (0.1 * image.size)

# ----------------- Run Prediction -----------------
if __name__ == "__main__":
    if not os.path.exists(IMAGE_PATH):
        print("Image not found")
        sys.exit(1)
    # Check if the image is a leaf
    img = cv2.imread(IMAGE_PATH)
    if not detect_leaf(img):
        print("Not a leaf image")
    else: 
        prediction = predict_diseases(IMAGE_PATH)
        if prediction:
            print(json.dumps(prediction, ensure_ascii=False))
        else:
            print("No disease detected")
