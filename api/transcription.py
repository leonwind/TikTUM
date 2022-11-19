import os.path
import subprocess
import whisper

model = whisper.load_model("base")


def _extract_audio(video_path: str, audio_path: str) -> None:
    subprocess.run(["ffmpeg", "-i", video_path, "-t", "1", "-acodec", "copy", audio_path])


def get_transcription(video_path: str, timestamp: int) -> dict:
    audio_path = "tmp.wav"
    if os.path.exists(audio_path):
        os.remove(audio_path)
    _extract_audio(video_path, audio_path)

    result = model.transcribe(audio_path)
    os.remove(audio_path)
    return result
