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

export class MediaCard extends Component<{}, {}> {
    render() {
        return (
            <div>
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
                    <img src={fireEmoji} alt="fire emoji" className={styles.emoji}/>
                    <br/>
                    <img src={joyEmoji} alt="fire emoji" className={styles.emoji}/>
                    <br/>
                    <img src={shitEmoji} alt="fire emoji" className={styles.emoji}/>
                </div>
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
        height="500"
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