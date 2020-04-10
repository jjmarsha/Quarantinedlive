import React from "react";
import {withRouter} from "react-router-dom";
import Page from "./page";
import { Row, Col } from "reactstrap";
import Navigation from "../components/navigation/navigation";
import Rising from "../static/88.jpg";
import TrendingSection from "../components/navigation/trendingsection";


class EntryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {}

    render() {
        return(
            <Page>
                <Navigation/>
                <Row className="mt-5 text-left">
                    <Col md="12" className="text-center">
                        <img src={Rising} width="100%"/>
                    </Col>
                    <Col md="12" className="mt-5">
                        <h4>Title of the event</h4><br/>
                        <p>Name of host</p>
                        <p>Wednesday, April 8 | 3:00 PM (PST)</p>
                        <p>Topic</p>
                        <p>Language</p>
                        <p>Description</p>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        <a href="https://google.com">Link to event</a>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default withRouter(EntryView);