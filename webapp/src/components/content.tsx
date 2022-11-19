import React, {ChangeEvent, Component, FormEvent, useRef, useState} from "react";
import styles from "../styles/mediacard.module.css";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Snowfall from "react-snowfall";

import fireEmoji from "../static/fire-emoji.png"
import joyEmoji from "../static/joy-emoji.png"
import shitEmoji from "../static/shit-emoji.png"
import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import SpeedIcon from '@mui/icons-material/SlowMotionVideo';


type Props = {
    video: string,
    onToggleComments: () => void,
}

export const MediaCard = ({video, onToggleComments}: Props) => {
        const shit: CanvasImageSource = document.createElement('img')
        shit.src = shitEmoji;
        const joy: CanvasImageSource = document.createElement('img')
        joy.src = joyEmoji;
        const fire: CanvasImageSource = document.createElement('img')
        fire.src = fireEmoji;

        const onEmojiyClick = (emoji: string) => {
             const shit = document.createElement('img')
            shit.src = "../static/shit-emoji.png";
            const joy = document.createElement('img')
            joy.src = "../static/joy-emoji.png";
            const fire = document.createElement('img')
            fire.src = "../static/fire-emoji.png"

            switch (emoji) {
                case "fire": {
                    setFireCount(fireCount + 15);
                    setTimeout(() => setFireCount(0), 5000);
                    break;
                }
                case "shit": {
                    setShitCount(shitCount + 15);
                    setTimeout(() => setShitCount(0), 5000);
                    break;
                }
                case "joy": {
                    setJoyCount(joyCount + 15);
                    setTimeout((joyCount) => setJoyCount(0), 5000);
                    break;
                }
            }
        }

        const [shitCount, setShitCount] = useState(0);
        const [fireCount, setFireCount] = useState(0);
        const [joyCount, setJoyCount] = useState(0);

        const videoRef = useRef<any>();
        const handleChange = () => {
            if (videoRef !== null) {
                if (videoRef.current.paused) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            }
        }
        return (
            <div className={styles.body}>
                <video className={styles.video} onClick={handleChange} ref={videoRef}>
                    <source src={video} type="video/mp4" className={styles.video}/>
                </video>

                <div className={styles.emojis}>
                    <div onClick={() => onEmojiyClick("fire")}>🔥</div>
                    <div onClick={() => onEmojiyClick("joy")}>😂</div>
                    <div onClick={() => onEmojiyClick("shit")}>💩</div>
                </div>

                <div className={styles.rightColumn}>
                    <SpeedIcon className={styles.speedIcon} style={{fontSize: 35}}/>

                    <ReplyIcon className={styles.replyIcon} style={{fontSize: 35}} />

                    <IconButton color="inherit" aria-label="open drawer" onClick={onToggleComments}>
                        <CommentIcon className={styles.commentIcon} style={{fontSize: 35}}/>
                    </IconButton>
                </div>

                <Snowfall
                  snowflakeCount={shitCount}
                  radius={[30.0, 30.0]}
                  // Pass in the images to be used
                  images={[shit]}/>

                <Snowfall
                  snowflakeCount={fireCount}
                  radius={[30.0, 30.0]}
                  images={[fire]}/>

                <Snowfall
                  snowflakeCount={joyCount}
                  radius={[30.0, 30.0]}
                  images={[joy]}/>
            </div>
        );
}
