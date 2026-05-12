from flask import Flask, render_template, request, jsonify
import os
import csv
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = "recordings"
METADATA_FILE = "metadata.csv"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

if not os.path.exists(METADATA_FILE):
    with open(METADATA_FILE, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow([
            "filename",
            "name",
            "age_range",
            "gender",
            "language",
            "emotion",
            "script",
            "noise_level",
            "timestamp"
        ])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    audio = request.files.get("audio")

    name = request.form.get("name")
    age_range = request.form.get("age_range")
    gender = request.form.get("gender")
    language = request.form.get("language")
    emotion = request.form.get("emotion")
    script = request.form.get("script")
    noise_level = request.form.get("noise_level")

    if audio is None:
        return jsonify({"error": "No audio received"}), 400

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_emotion = secure_filename(emotion)
    safe_language = secure_filename(language)

    folder_path = os.path.join(UPLOAD_FOLDER, safe_emotion)
    os.makedirs(folder_path, exist_ok=True)

    filename = f"{safe_emotion}_{safe_language}_{timestamp}.webm"
    filepath = os.path.join(folder_path, filename)

    audio.save(filepath)

    with open(METADATA_FILE, "a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow([
            filepath,
            name,
            age_range,
            gender,
            language,
            emotion,
            script,
            noise_level,
            timestamp
        ])

    return jsonify({"message": "Voice submitted successfully!"})

if __name__ == "__main__":
    app.run(debug=True)