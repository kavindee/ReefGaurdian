from datetime import datetime

import uvicorn
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from pymongo import MongoClient
import geocoder
from bson.binary import Binary
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://admin:rgCdETW7ZhVmsKCN@cluster0.qawdgv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# Select the database and collection
db = client['coralDB']
collection = db['coral']
collection1 = db['coralHealth']

app = Flask(__name__)
CORS(app)

# Load your model
model = tf.keras.models.load_model("../Model/coral2.h5")
modelHealth = tf.keras.models.load_model("../Model/coralHealth.h5")
class_names = ['Hammer_coral', 'Red_bubble_tip_anemone', 'Trumpet_coral', 'Zoanthid']
class_names1 = ['Bleached', 'Coral_healthy', 'Cyanobacteria']


def prepare_image(img, target_size):
    if img.mode != "RGB":
        img = img.convert("RGB")
    img = img.resize(target_size)
    img_array = np.array(img)
    if img_array.shape[-1] == 4:  # Remove alpha channel if present
        img_array = img_array[:, :, :3]
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


@app.route('/predicthealth', methods=['POST'])
def predict1():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file1 = request.files['file']
    if file1:
        img1 = Image.open(io.BytesIO(file1.read()))
        img_prepared1 = prepare_image(img1, target_size=(256, 256))
        predictions1 = modelHealth.predict(img_prepared1) # get model prediction
        predicted_index1 = np.argmax(predictions1[0])
        confidence1 = float(np.max(predictions1[0])) * 100

        file1.seek(0)  # Reset file pointer
        img_binary1 = Binary(file1.read())

        ip_address = request.remote_addr
        location = geocoder.ip(ip_address)

        if confidence1 >= 80:
            predicted_class1 = class_names1[predicted_index1] if 0 <= predicted_index1 < len(class_names1) else 'Unidentified'
        else:
            predicted_class1 = 'Unidentified'

        db_entry1 = {
            'predicted_class': predicted_class1,
            'confidence': confidence1,
            'timestamp': datetime.utcnow(),
            'location': location.geojson,
            'image_data': img_binary1
        }
        collection1.insert_one(db_entry1)

        return jsonify({'predicted_class': predicted_class1, 'confidence': confidence1})
    else:
        return jsonify({'error': 'Error processing the file'}), 500


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file:
        img = Image.open(io.BytesIO(file.read()))
        img_prepared = prepare_image(img, target_size=(256, 256))
        predictions = model.predict(img_prepared)
        predicted_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0])) * 100

        file.seek(0)  # Reset file pointer
        img_binary = Binary(file.read())

        ip_address = request.remote_addr
        location = geocoder.ip(ip_address)

        if confidence >= 80:
            predicted_class = class_names[predicted_index] if 0 <= predicted_index < len(
                class_names) else 'Unidentified'
        else:
            predicted_class = 'Unidentified'

        db_entry = {
            'predicted_class': predicted_class,
            'confidence': confidence,
            'timestamp': datetime.utcnow(),
            'location': location.geojson,
            'image_data': img_binary
        }
        collection.insert_one(db_entry)

        return jsonify({'predicted_class': predicted_class, 'confidence': confidence})
    else:
        return jsonify({'error': 'Error processing the file'}), 500


@app.route('/imagehealth/<doc_id>')
def image1(doc_id):
    document1 = collection1.find_one({'_id': ObjectId(doc_id)})
    if document1 and 'image_data' in document1:
        return Response(document1['image_data'], mimetype='image/jpeg')
    else:
        return jsonify({'error': 'Image not found'}), 404


@app.route('/image/<doc_id>')
def image(doc_id):
    document = collection.find_one({'_id': ObjectId(doc_id)})
    if document and 'image_data' in document:
        return Response(document['image_data'], mimetype='image/jpeg')
    else:
        return jsonify({'error': 'Image not found'}), 404


@app.route('/historyhealth', methods=['GET'])
def get_history1():
    try:
        records1 = collection1.find({}).sort("timestamp", -1)
        data1 = []
        for record1 in records1:
            # Convert ObjectId to string
            record1['_id'] = str(record1['_id'])
            # Exclude the image_data field
            if 'image_data' in record1:
                del record1['image_data']
            data1.append(record1)
        return jsonify(data1), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/history', methods=['GET'])
def get_history():
    try:
        records = collection.find({}).sort("timestamp", -1)
        data = []
        for record in records:
            # Convert ObjectId to string
            record['_id'] = str(record['_id'])
            # Exclude the image_data field
            if 'image_data' in record:
                del record['image_data']
            data.append(record)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/deletehealth/<doc_id>', methods=['DELETE'])
def delete_entry1(doc_id):
    try:
        result1 = collection1.delete_one({'_id': ObjectId(doc_id)})
        if result1.deleted_count == 1:
            return jsonify({'message': 'Record deleted successfully'}), 200
        else:
            return jsonify({'error': 'Record not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/delete/<doc_id>', methods=['DELETE'])
def delete_entry(doc_id):
    try:
        result = collection.delete_one({'_id': ObjectId(doc_id)})
        if result.deleted_count == 1:
            return jsonify({'message': 'Record deleted successfully'}), 200
        else:
            return jsonify({'error': 'Record not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
