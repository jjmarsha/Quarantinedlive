import React from "react";
import { Row, Col, Modal, ModalBody } from "reactstrap";
import Page from "./page";
import Navigation from "../components/navigation/navigation";
import { EntryExamples } from "../components/entry/entryexamples";
import Entry from "../components/entry/entry";
import Filter from "../components/filter/filter";
import EntryForm from "../components/forms/entryform";
import TrendingSection from "../components/navigation/trendingsection";
import "../styles/formfields.css";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { GetURLParams } from "../common/urlparser";
import Loading from "../common/loading";
import axios from "axios";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      loadingComponents: true,
      entries: [],
      currURL: "",
    };
  }

  async componentDidMount() {
    this.GetEntries();
    this.setState({
      loadingComponents: true,
      currURL: this.props.history.location.search,
    });
  }

  async componentDidUpdate() {
    const currURL = this.props.history.location.search;
    if (currURL !== this.state.currURL) {
      await this.GetEntries();
    }
  }

  GetEntries = async (url) => {
    // const params = GetURLParams();
    // let keywords;
    // if(params.keywords) keywords = params.keywords.split(",");
    // Make the ajax call here
    axios
      .get("http://quarantined.azurewebsites.net/api/Event/")
      .then(resp => {
        this.setState({entries: resp.data});
      })
  };

  render() {
    return (
      <Page>
        <Navigation modalToggle={this.modalToggle} isMobile={isMobile} />
        <TrendingSection modalToggle={this.modalToggle} isMobile={isMobile} />
        <Row>
          <Col xs="0" md="3">
            <Filter />
          </Col>
          <Col xs="12" md="9">
            {this.state.loadingComponents ? (
              this.state.entries.map((entry, key) => {
                return (
                  <Entry
                    className="mt-3 mb-3 entry-hover-cursor rounded"
                    entry={entry}
                    key={key}
                    isMobile={isMobile}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </Col>
        </Row>
        <Modal isOpen={this.state.modalIsOpen} toggle={this.modalToggle}>
          <ModalBody>
            <EntryForm
              modalToggle={this.modalToggle}
              onSubmit={this.addNewEntry}
            />
          </ModalBody>
        </Modal>
      </Page>
    );
  }

  modalToggle = () => {
    this.setState((prevState) => {
      return {
        modalIsOpen: !prevState.modalIsOpen,
      };
    });
  };

  addNewEntry = (entry) => {
    this.setState((prevState) => {
      const entries = [];
      entries.push(entry);
      const newEntries = entries.concat(prevState.entries);
      return {
        entries: newEntries,
      };
    });
  };
}

export default withRouter(Homepage);
