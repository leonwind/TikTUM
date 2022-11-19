import React, {ChangeEvent, Component, FormEvent} from "react";
import styles from "../styles/mediacard.module.css";
import AddCommentIcon from '@mui/icons-material/AddComment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Snowfall from "react-snowfall";

import demoVid from "../static/demo_vid.mp4";
import fireEmoji from "../static/fire-emoji.png"
import joyEmoji from "../static/joy-emoji.png"
import shitEmoji from "../static/shit-emoji.png"
import CommentSection from "./CommentSection";
import {Footer} from "./footer";

interface State {
    shitCount: number,
    fireCount: number,
    joyCount: number,
}

export class MediaCard extends Component<{}, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            shitCount: 0,
            fireCount: 0,
            joyCount: 0,
        }
    }

    componentDidMount() {
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(emoji: string) {
        const shit = document.createElement('img')
            shit.src = "../static/shit-emoji.png";
            const joy = document.createElement('img')
            joy.src = "../static/joy-emoji.png";
            const fire = document.createElement('img')
            fire.src = "../static/fire-emoji.png"

            switch (emoji) {
                case "fire": {
                    this.setState({fireCount: this.state.fireCount + 15});
                    setTimeout(() => this.setState({fireCount: 0}), 5000);
                    break;
                }
                case "shit": {
                    this.setState({shitCount: this.state.shitCount + 15});
                    setTimeout(() => this.setState({shitCount: 0}), 5000);
                    break;
                }
                case "joy": {
                    this.setState({joyCount: this.state.joyCount + 15});
                    setTimeout(() => this.setState({joyCount: 0}), 5000);
                    break;
                }
            }
            console.log(this.state);

    }


    render() {
        const shit: CanvasImageSource = document.createElement('img')
        shit.src = shitEmoji;
        shit.style.width = "100%";
        shit.style.height = "100%";
        const joy: CanvasImageSource = document.createElement('img')
        joy.src = joyEmoji;
        const fire: CanvasImageSource = document.createElement('img')
        fire.src = fireEmoji;

        return (
            <div className={styles.body}>
                <video autoPlay controls className={styles.video}>
                    <source src={demoVid} type="video/mp4" className={styles.video}/>
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
                    <div onClick={() => this.handleClick("fire")}>🔥</div>
                    <div onClick={() => this.handleClick("joy")}>😂</div>
                    <div onClick={() => this.handleClick("shit")}>💩</div>
                </div>

                <Snowfall
                  snowflakeCount={this.state.shitCount}
                  radius={[30.0, 30.0]}
                  // Pass in the images to be used
                  images={[shit]}/>

                <Snowfall
                  snowflakeCount={this.state.fireCount}
                  radius={[30.0, 30.0]}
                  images={[fire]}/>

                <Snowfall
                  snowflakeCount={this.state.joyCount}
                  radius={[30.0, 30.0]}
                  images={[joy]}/>

                <Footer/>
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