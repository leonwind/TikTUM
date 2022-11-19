import React, {ChangeEvent, Component, FormEvent} from "react";
import { Navigate } from "react-router-dom";
import logo from "../tiktum.png";
import styles from "../styles/frontpage.module.css";
import { Form } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { InputGroup } from "react-bootstrap";

interface State {
    lecture: string,
    redirect: boolean
}

export class FrontPage extends Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            lecture: "",
            redirect: false
        };

        this.handleClientIDChange = this.handleClientIDChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleClientIDChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({lecture: event.target.value});
    }

    private handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({redirect: true})
    }

    render() {
        if (this.state.redirect) {
            return (
                <Navigate to={"/" + this.state.lecture}/>
            )
        }

        return (
            <div className={styles.body}>
                <h1 className={styles.logo}>
                    <img src={logo} alt={"Logo"} />
                </h1>

                <h1 className={styles.headline}>
                    TikTUM
                </h1>

                <br/>
                <br/>

                <Form onSubmit={this.handleSubmit}>
                <div className={styles.searchForm}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control className={styles.searchForm} value={this.state.lecture}
                            onChange={this.handleClientIDChange} size="lg" type="text"
                            placeholder="Find Your Lecture"/>
                        <InputGroup.Text className={styles.searchLogo}>
                            </InputGroup.Text>
                            <SearchIcon/>
                        </InputGroup>
                    </Form.Group>
                </div>
                </Form>

                <br/>
                <br/>

                <h2 className={styles.mediumText}>
                    Watch your Lectures in 2022 style.
                </h2>

                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}