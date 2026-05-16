# 🎤 Voice Sentiment Data Collection Form

A web-based voice recording and dataset collection platform designed for multilingual voice sentiment analysis research using English, Sinhala, and Sinhala-English mixed speech.

## Project Overview

This system allows participants to:

* Select an emotion category
* Read a randomly generated script
* Record their voice directly from the browser
* Submit recordings securely to cloud storage

The collected dataset is intended for AI-based speech emotion recognition and sentiment analysis research.

---

#  Features

*  Browser-based voice recording
*  English, Sinhala, and Mixed-language support
*  Emotion selection system
*  Random script generation
*  Cloud audio storage using Vercel Blob
*  Mobile-friendly responsive interface
*  Metadata collection for research purposes
*  Fast deployment with Vercel

---

#  Supported Emotions

* Happy
* Sad
* Angry
* Neutral

---

# 🌍 Supported Languages

* English
* Sinhala
* Sinhala-English Mixed

---

# 🛠 Technologies Used

| Technology                  | Purpose                  |
| --------------------------- | ------------------------ |
| HTML                        | Frontend structure       |
| CSS                         | UI styling               |
| JavaScript                  | Recording & upload logic |
| MediaRecorder API           | Voice recording          |
| Vercel Blob                 | Cloud file storage       |
| Vercel Serverless Functions | Upload API               |

---

#  Project Structure

```text
voice-collection-form/
│
├── api/
│   └── upload.js
│
├── index.html
├── package.json
├── vercel.json
└── README.md
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/voice-collection-form.git
```

---

## 2. Navigate to Project

```bash
cd voice-collection-form
```

---

## 3. Install Dependencies

```bash
npm install
```

---

# 🚀 Running Locally

Open `index.html` using Live Server or deploy using Vercel.

---

# ☁ Deploying to Vercel

## Install Vercel CLI

```bash
npm install -g vercel
```

---

## Deploy

```bash
vercel
```

---

#  Environment Variables

Create a Vercel Blob Storage and ensure the following variable exists:

```text
BLOB_READ_WRITE_TOKEN
```

---

#  Dataset Information

Each recording contains:

* Audio clip
* Emotion label
* Language
* Gender
* Age range
* Noise level
* Spoken script
* Submission timestamp

---

#  Research Purpose

This project is developed for research in:

* Speech Emotion Recognition (SER)
* Voice Sentiment Analysis
* Multilingual AI Systems
* Sinhala-English Code-Switched Speech Analysis

---

#  Ethical Considerations

* No sensitive personal data is collected
* Voice recordings are used only for academic research
* Participants voluntarily submit recordings
* Recordings are stored securely in cloud storage

---

#  Mobile Compatibility

The application supports:

* Android browsers
* iPhone Safari
* Desktop browsers

---

#  Future Improvements

* Real-time emotion prediction
* AI model integration
* User authentication
* Dashboard analytics
* Automatic noise detection
* Dataset export tools

---

#  Author

Sewwando Kodippili 

---

# License

This project is intended for educational and academic research purposes.
