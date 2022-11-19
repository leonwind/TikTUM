import React, {ChangeEvent, Component, FormEvent} from "react";
import styles from "../styles/mediacard.module.css";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Snowfall from "react-snowfall";

import fireEmoji from "../static/fire-emoji.png"
import joyEmoji from "../static/joy-emoji.png"
import shitEmoji from "../static/shit-emoji.png"

interface State {
    shitCount: number,
    fireCount: number,
    joyCount: number,
}

type Props = {
    video: string,
}

export class MediaCard extends Component<Props, State> {

    constructor(props: Props) {
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
    }


    render() {
        const shit: CanvasImageSource = document.createElement('img')
        shit.src = shitEmoji;
        const joy: CanvasImageSource = document.createElement('img')
        joy.src = joyEmoji;
        const fire: CanvasImageSource = document.createElement('img')
        fire.src = fireEmoji;

        return (
            <div className={styles.body}>
                <video controls className={styles.video}>
                    <source src={this.props.video} type="video/mp4" className={styles.video}/>
                </video>

                <div className={styles.emojis}>
                    <AddCommentIcon/>
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
            </div>
        );
    }
}
