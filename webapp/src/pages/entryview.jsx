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
      href: "",
    };
  }

  async componentDidMount() {
    const id = this.props.history.location.pathname.substring("/view/".length);
    await axios
      .get(`https://quarantined.azurewebsites.net/api/Event/${id}`)
      .then((resp) => {
        this.setState({
          entry: resp.data,
          parsedDateString: this.ParseDate(resp.data),
        });
      });
    await this.handleRedirect();
  }

  ParseDate = (entry) => {
    const date = new Date(entry.time + " UTC");
    if (entry.time)
      return `${ParseDateString(date.toString())} ${ParseTimeString(
        date.toString().split(" ")[4]
      )}`;
  };

  handleRedirect = async () => {
    const link = this.state.entry.link;
    if (link.startsWith("https://") || link.startsWith("http://")) {
      this.setState({ href: link });
    } else {
      this.setState({ href: `http://${link}` });
    }
  };

  render() {
    if (!this.state.entry) return <Loading />;
    return (
      <Page>
        <Navigation />
        <Row className="mt-5 text-left">
          {this.state.entry.image_url ? (
            <Col md="12" className="text-center">
              <img src={this.state.entry.image_url} width="100%" />
            </Col>
          ) : null}
          <Col md="12" className="mt-5">
            <h3 className="font-weight-normal">{this.state.entry.title}</h3>
            <div className="pt-3">
              <div className="d-inline font-weight-bold">Name of host: </div>
              {this.state.entry.nameofhost}
            </div>
            <div className="pt-3">
              <div className="d-inline font-weight-bold">Date: </div>
              {this.state.parsedDateString}
            </div>
            <div className="pt-3">
              <div className="d-inline font-weight-bold">Topics: </div>
              {this.state.entry.topics
                ? this.state.entry.topics.map((topic, key) => {
                    return (
                      <React.Fragment key={key}>
                        {(key === 0 ? "" : ", ") + topic}
                      </React.Fragment>
                    );
                  })
                : null}
            </div>
            <div className="pt-3">
              <div className="d-inline font-weight-bold">Language: </div>
              {this.state.entry.language}
            </div>
            <div className="pt-3 pb-1">
              <p className="d-inline font-weight-bold">Description: </p>
            </div>
            <p>{this.state.entry.description}</p>
            <a href={this.state.href}>Link to Event</a>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withRouter(EntryView);
