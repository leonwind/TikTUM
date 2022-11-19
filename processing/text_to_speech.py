import fakeyou


USERNAME = "nate1234567890"
PASSWORD = "RaQKa8W6R3eAUum"


def text_to_speech(text_file: str, tts_model_token: str):
    fy = fakeyou.FakeYou()
    fy.login(USERNAME, PASSWORD)
    
    with open(text_file) as f:
        text = f.read()
        try:
            fy.say(text=text, ttsModelToken=tts_model_token, cooldown=3)
        except fakeyou.exception.TooManyRequests:
            print("Too many requests. Try again later.")
        


if __name__ == "__main__":
    text_to_speech(text_file="text.txt", tts_model_token="TM:7wbtjphx8h8v")