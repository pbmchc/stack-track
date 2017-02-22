from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os
import analyzer
import scrapper

app = Flask(__name__)
CORS(app)

urls = {
    "questions": "http://stackoverflow.com/questions?page=",
    "jobs": "http://stackoverflow.com/jobs?sort=p&pg=",
    "jobs_in_poland": "http://stackoverflow.com/jobs?location=poland&range=20&pg="
}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/stack/api/v1.0/questions', methods=['GET'])
def get_newest_questions():
    pages = int(request.args.get("pages")) if request.args.get("pages") else 1
    tags = analyzer.analyze_tags(scrapper.find_newest_tags(pages, urls["questions"]))
    return jsonify(tags)


@app.route('/stack/api/v1.0/jobs', methods=['GET'])
def get_newest_job_offers():
    pages = int(request.args.get("pages")) if request.args.get("pages") else 1
    tags = analyzer.analyze_tags(scrapper.find_newest_tags(pages, urls["jobs"]))
    return jsonify(tags)


@app.route('/stack/api/v1.0/jobs/poland', methods=['GET'])
def get_newest_job_offers_poland():
    pages = int(request.args.get("pages")) if request.args.get("pages") else 1
    tags = analyzer.analyze_tags(scrapper.find_newest_tags(pages, urls["jobs_in_poland"]))
    return jsonify(tags)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
