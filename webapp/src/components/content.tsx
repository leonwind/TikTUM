import React, {ChangeEvent, Component, FormEvent} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "../styles/mediacard.module.css";
import AddCommentIcon from '@mui/icons-material/AddComment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import prof from '../static/hot_prof.jpg'
import demoVid from "../static/demo_vid.mp4";
import fireEmoji from "../static/fire-emoji.png"
import joyEmoji from "../static/joy-emoji.png"
import shitEmoji from "../static/shit-emoji.png"
import CommentSection from "./CommentSection";

export class MediaCard extends Component<{}, {}> {
    render() {

        let random = (min: number, max: number): number => {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const handleClick = (emoji: any) => {
            const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
            if (canvas === null) {
                console.log("Canvas is null");
                return;
            }

            const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
            if (ctx === null) {
                console.log("Canvas context is null");
                return;
            }
            let image: any = new Image(50, 30);
            image.src = "../static/fire-emoji.png"
            //ctx.rect(20, 20, 150, 100);
            ctx.fillStyle = "red";
            //ctx.fill();
            switch(emoji) {
                case "shit": {
                    ctx.fillText("💩", random(0, canvas.width), random(0.8 * canvas.height, canvas.height) );
                    break;
                }
                case "joy": {
                    ctx.fillText("😂", random(0, canvas.width), random(0.8 * canvas.height, canvas.height) );
                    break;
                }
                case "fire": {
                    ctx.fillText("🔥", random(0, canvas.width), random(0.8 * canvas.height, canvas.height) );
                    break;
                }
                default: {
                    console.log("Emoji not found: ", emoji);
                }
            }
            //ctx.fillText("hallo welt", 20, 20, );
            console.log("Spawn emoji " + emoji);
        }

        return (
            <div className={styles.body}>
                <video autoPlay controls>
                    <source src={demoVid} type="video/mp4"/>
                </video>

                <div className={styles.buttons}>
                    <AddCommentIcon/>
                    <br/>
                    <PriorityHighIcon/>
                    <br/>
                    <AutoAwesomeIcon/>
                    <br/>
                    <AddReactionIcon/>
                </div>

                <div className={styles.emojis}>
                    <img src={fireEmoji} alt="fire emoji" className={styles.emoji} onClick={() => handleClick("fire")}/>
                    <br/>
                    <img src={joyEmoji} alt="joy emoji" className={styles.emoji} onClick={() => handleClick("joy")}/>
                    <br/>
                    <img src={shitEmoji} alt="shit emoji" className={styles.emoji} onClick={() => handleClick("shit")}/>
                </div>

                <CommentSection />
                <canvas id="canvas" className={styles.canvas}>

                </canvas>
            </div>
        );
    }
}

/*


export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="hot prof"
        height="400px"
        image={prof}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          What is a Matrix?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Learn about Linear Algebra today. Best homework gets to date me.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Go to lecture</Button>
      </CardActions>
    </Card>


    <Card className={styles.body}>
                    <CardMedia
                        component="video"
                        image={demoVid}
                        autoPlay/>

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          What is a Matrix?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Learn about Linear Algebra today. Best homework gets to date me.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Go to lecture</Button>
                      </CardActions>
                    </Card>
  );
}
 */