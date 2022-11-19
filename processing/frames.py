import skvideo.io
import numpy as np
import matplotlib.pyplot as plt
import json

# ffmpeg -i dl_math_intro.mp4 -s 320:240 -vf "boxblur=15" dl_math_intro_small.mp4

def smoothen(video, iters=1):
    for _ in range(iters):
        video = (video[1:] + video[:-1]) / 2
    return video

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

video = skvideo.io.vread(
    "/Users/antonbaumann/Projects/hackatum_2022/lectures/dl_math_intro_small_blurr.mp4",
    as_grey=True,
    # num_frames=20000,
)

video = video[:, 50:100, 100:200, 0]

video = smoothen(video, iters=2)

err = np.square(np.diff(video, axis=0)).mean(axis=-1).mean(axis=-1)

plt.plot(
    np.arange(0, len(err), 1) / 25,
    err,
)
plt.savefig('out/changes.png')

change_frames = np.concatenate([[0], np.argwhere(err > 15)[..., 0]], axis=0)

with open('out/slide_frames.json', 'w') as f:
    json.dump(dict(frames=change_frames), f, cls=NpEncoder)
