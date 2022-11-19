import json
import os.path
from datetime import datetime

from flask import Flask, request
from flask_cors import CORS

from api.comments import comments_object_from_txt
from api.qa_bot import ask_question
from api.segmentation import extract_title_from_frame

app = Flask(__name__)
cors = CORS(app)
COMMENTS_DIR = 'comments'
VIDEOS_DIR = 'videos'
FRAMES_DIR = 'frames'
FPS = 25.0
TRANSCRIPTION_DIR = "transcriptions"


def get_transcription(video_id) -> dict:
    transcription_path = os.path.join(TRANSCRIPTION_DIR, video_id + ".json")
    if not os.path.exists(transcription_path):
        return {}
    with open(transcription_path, "r") as f:
        return json.load(f)


# Endpoint to post comment on video with video_id
@app.route('/video/<video_id>/comment', methods=['POST'])
def post_comment(video_id):
    username = request.form.get('username')
    comment = request.form.get('comment')
    timestamp = int(round(datetime.now().timestamp()))
    if not username or not comment:
        return 'Missing parameters', 400
    # Parse question and get an answer from GPT-3 (if applicable)
    answer = None
    if comment.endswith('?'):
        # Get extra information for video_id
        # extra_information = get_transcription(f'{VIDEOS_DIR}/{video_id}.mp4', 0).get("text")
        # Ask question to GPT-3
        answer = ask_question(comment)
    # Save comment to a txt file
    with open(f'{COMMENTS_DIR}/{video_id}.txt', 'a+') as f:
        f.write(f'{username}\t{comment}\t{timestamp}\n')
        if answer:
            answer_timestamp = int(round(datetime.now().timestamp()))
            f.write(f'TutorBot\t{answer}\t{answer_timestamp}\n')

    # Return success message
    return 'Successfully posted comment', 200


# Endpoint to get comments on video with video_id
@app.route('/video/<video_id>/comments', methods=['GET'])
def get_comments(video_id):
    # Create comments object from txt file
    comments = comments_object_from_txt(f'{COMMENTS_DIR}/{video_id}.txt')
    # Return comments
    return comments


@app.route('/video/<video_id>/search/<query>', methods=['GET'])
def query_lecture(video_id, query):
    # Get transcript
    transcript_response = get_transcription(f'{VIDEOS_DIR}/{video_id}.mp4', 0)
    segments = transcript_response.get("segments")
    # Search for query
    timestamp = -1
    text = ""
    for segment in segments:
        text = segment.get("text")
        if query in segment.get("text"):
            timestamp = segment.get("start")
            break
    # Return transcript
    return {
        "timestamp": timestamp,
        "text": text
    }


@app.route('/video/<video_id>/outline', methods=['GET'])
def lecture_outline(video_id):
    frames_path = f'{FRAMES_DIR}/{video_id}'
    if not os.path.exists(frames_path):
        return 'Video does not exist', 404
    # Loop over frames
    frame_paths = [frame_path for frame_path in os.listdir(frames_path) if frame_path.endswith('.jpg')]
    outline = []
    for frame_path in frame_paths:
        outline.append({
            "timestamp": float(frame_path[6:-4]) / FPS,
            "title": extract_title_from_frame(os.path.join(frames_path, frame_path)),
        })

    return outline
