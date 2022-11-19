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
OUTLINES_DIR = 'outlines'


def get_transcription(lecture_id) -> dict:
    transcription_path = os.path.join(TRANSCRIPTION_DIR, lecture_id + ".json")
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
        # extra_information = get_transcription(f'{VIDEOS_DIR}/{video_id}.mp4').get("text")
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


@app.route('/lecture/<lecture_id>/search/<query>', methods=['GET'])
def query_lecture(lecture_id, query):
    # Get transcript
    transcript_response = get_transcription(lecture_id)
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


@app.route('/lecture/<lecture_id>/outline', methods=['GET'])
def lecture_outline(lecture_id):
    outline_path = os.path.join(OUTLINES_DIR, lecture_id + ".json")
    if os.path.exists(outline_path):
        with open(outline_path, "r") as f:
            return json.load(f)

    frames_path = os.path.join(FRAMES_DIR, lecture_id)
    if not os.path.exists(frames_path):
        return 'Lecture does not exist', 404
    # Loop over frames
    frame_paths = [frame_path for frame_path in os.listdir(frames_path) if frame_path.endswith('.jpg')]
    outline = []
    titles = []
    for frame_path in frame_paths:
        title = extract_title_from_frame(os.path.join(frames_path, frame_path)).strip()
        if title not in titles:
            outline.append({
                "timestamp": float(frame_path[6:-4]) / FPS,
                "title": title,
            })
            titles.append(title)

    result = sorted(outline, key=lambda outline_element: outline_element["timestamp"])
    with open(outline_path, 'w') as f:
        json.dump(result, f)

    return result
