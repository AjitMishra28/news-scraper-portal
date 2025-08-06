# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from scraper import get_news

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React frontend

@app.after_request
def adjust_headers(response):
    # Fix COOP/COEP postMessage error from Google OAuth
    response.headers['Cross-Origin-Opener-Policy'] = 'unsafe-none'
    response.headers['Cross-Origin-Embedder-Policy'] = 'unsafe-none'
    return response

@app.route('/', methods=['GET'])
def home():
    return "✅ Flask Backend is Running. Go to /api/news to get data."

@app.route('/api/news', methods=['GET'])
def news():
    try:
        data = get_news()
        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
