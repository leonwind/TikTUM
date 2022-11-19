import os.path
from typing import Optional

from PIL import Image
import pytesseract


def extract_title_from_frame(frame_path: str) -> Optional[str]:
    if not os.path.exists(frame_path):
        return None

    lines = pytesseract.image_to_string(Image.open(frame_path)).split('\n')
    for line in lines:
        if not line or line.lower() == "tum":
            continue
        return line
