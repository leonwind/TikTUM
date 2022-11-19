# from pydub import AudioSegment, silence

# audio = AudioSegment.from_wav('/Users/antonbaumann/Downloads/dl_math_intro.wav')

# silence = silence.detect_silence(audio, min_silence_len=1000, silence_thresh=-16)

# print(silence)


from pysilence import silence
import audio

def to_min_sec(x):
    min = int(x // 60)
    sec = int(x % 60)
    return f'{min}:{sec}'

sample_rate, audio_data = audio.get_audio_data(
    '/Users/antonbaumann/Downloads/dl_math_intro.wav', 
    threads=8,
)

ranges = silence.detect_silence_ranges(
    audio_data=audio_data,
    sample_rate=sample_rate,
    min_silence_len=600,
    step_duration=200,
    silence_threshold=0.2,
    verbose=False,
    progress=True,
)

print()
for start, end in ranges:
    print(to_min_sec(start), to_min_sec(end))
