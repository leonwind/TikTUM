from datetime import datetime

from flask import Flask, request
from flask_cors import CORS

from api.comments import comments_object_from_txt
from api.qa_bot import ask_question

app = Flask(__name__)
cors = CORS(app)
COMMENTS_DIR = 'comments'


# Placeholder
def get_transcription(video_id: str, timestamp: int) -> str:
    return ""


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
        extra_information = get_transcription(video_id, timestamp)
        # Ask question to GPT-3
        answer = ask_question(comment, extra_information)
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
