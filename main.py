from flask import Flask, request, send_file
import cv2
import os
import json
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['FRAME_FOLDER'] = 'frames'

# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['FRAME_FOLDER'], exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_video():
    print('Request is', request.files['video'])
    video_file = request.files['video']
    print('Video file type is ', type(video_file))
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(video_file.filename))
    video_file.save(video_path)
    extract_frames(video_path)
    return {'message': 'Video uploaded and frames extracted'}

def extract_frames(video_path):
    video = cv2.VideoCapture(video_path)
    success, frame = video.read()
    count = 0
    while success and count < 50:  # Limit to 50 frames
        frame_path = os.path.join(app.config['FRAME_FOLDER'], f'frame{count}.jpg')
        cv2.imwrite(frame_path, frame)
        success, frame = video.read()
        count += 1

@app.route('/frame/<int:frame_number>')
def get_frame(frame_number):
    frame_path = os.path.join(app.config['FRAME_FOLDER'], f'frame{frame_number}.jpg')
    return send_file(frame_path)

@app.route('/save_annotations', methods=['POST'])
def save_annotations():
    annotations = request.json
    with open('annotations.json', 'w') as file:
        json.dump(annotations, file)
    return {'message': 'Annotations saved'}

if __name__ == '__main__':
    app.run(debug=True)
