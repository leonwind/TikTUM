
JSON_PATH = 'result_full.json'

import json

def seconds_to_hours_mins_secs_ms(seconds_float: float):
    hours = int(seconds_float // 3600)
    minutes = int(seconds_float // 60 % 60)
    seconds = int(seconds_float % 60)
    return f'{hours}:{minutes:02d}:{seconds:02d}.000'

with open(JSON_PATH, 'r') as f:
    segments = json.load(f)['segments']


with open('result_full.vtt', 'w') as f:
    f.write('WEBVTT\n\n')
    for segment in segments:
        start = seconds_to_hours_mins_secs_ms(segment['start'])
        end = seconds_to_hours_mins_secs_ms(segment['end'])
        text = segment['text']

        f.write('{} --> {}\n{}\n\n'.format(start, end, text))
