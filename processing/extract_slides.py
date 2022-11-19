import json
import subprocess


FRAMES_PATH = 'out/slide_frames.json'

with open(FRAMES_PATH, 'r') as f:
    frames = json.load(f)['frames']


lastframe = -1000
for i, frame in enumerate(frames):
    if frame - lastframe < 25 * 5:
        continue

    frame += 10 # offset :)
    subprocess.call(
        fr"/opt/homebrew/bin/ffmpeg -i /Users/antonbaumann/Projects/hackatum_2022/lectures/dl_math_intro.mp4 -vf select='eq(n\,{frame})' -vframes 1 -vsync 0 out/frames/frames{frame}.jpg",
        shell=True,
    )
    lastframe = frame
