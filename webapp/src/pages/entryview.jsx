import React from "react";
import { withRouter } from "react-router-dom";
import Page from "./page";
import { Row, Col } from "reactstrap";
import Navigation from "../components/navigation/navigation";
import Rising from "../static/88.jpg";
import TrendingSection from "../components/navigation/trendingsection";
import axios from "axios";
import Loading from "../common/loading";
import { ParseDateString, ParseTimeString } from "../lists/daterefs";

class EntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: undefined,
      parsedDateString: "",
    };
  }

  componentDidMount() {
    const id = this.props.history.location.pathname.substring("/view/".length);
    axios
      .get(`http://quarantined.azurewebsites.net/api/Event/${id}`)
      .then((resp) => {
        this.setState({
          entry: resp.data,
          parsedDateString: this.ParseDate(resp.data),
        });
      });
  }

  ParseDate = (entry) => {
    const date = new Date(entry.time + " UTC");
    if (entry.time)
      return `${ParseDateString(date.toString())} ${ParseTimeString(
        date.toString().split(" ")[4]
      )}`;
  };

  render() {
    if (!this.state.entry) return <Loading />;
    return (
      <Page>
        <Navigation />
        <Row className="mt-5 text-left">
          <Col md="12" className="text-center">
            <img src={Rising} width="100%" />
          </Col>
          <Col md="12" className="mt-5">
            <h4>Title of the event</h4>
            <br />
            <p>Name of host: {this.state.entry.nameofhost}</p>
            <p>Date: {this.state.parsedDateString}</p>
            <p>
              Topics:{" "}
              {this.state.entry.topics
                ? this.state.entry.topics.map((topic, key) => {
                    return (
                      <React.Fragment key={key}>
                        {(key === 0 ? "" : ", ") + topic}
                      </React.Fragment>
                    );
                  })
                : null}
            </p>
            <p>Language: {this.state.entry.language}</p>
            <p>Description: </p>
            <p>{this.state.entry.description}</p>
            <a href={this.state.entry.link}>Link to event</a>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withRouter(EntryView);
