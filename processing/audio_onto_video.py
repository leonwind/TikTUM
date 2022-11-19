import os
import sys

AUDIO_FILE = sys.argv[1]
VIDEO_FILE = sys.argv[2]
OUTPUT_FILE = "output.mp4"
TEMP_FILE = "temp.wav"

audio_duration = float(
    os.popen(
        f"ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {AUDIO_FILE}"
    ).read()
)
video_duration = float(
    os.popen(
        f"ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {VIDEO_FILE}"
    ).read()
)

atempo = audio_duration / video_duration

os.popen(f'ffmpeg -i {AUDIO_FILE} -filter:a "atempo={atempo}" {TEMP_FILE}')

os.popen(
    f"ffmpeg -i {VIDEO_FILE} -i {TEMP_FILE} -map 0:v -map 1:a -c:v copy -shortest {OUTPUT_FILE}"
)
