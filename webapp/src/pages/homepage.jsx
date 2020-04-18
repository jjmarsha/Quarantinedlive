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
import EntryList from "../components/entry/entrylist";
import store from "../redux/store";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      loadingComponents: true,
      entries: [],
      currURL: "",
      searchedEntries: [],
    };
  }

  async componentDidMount() {
    const searchParams = this.props.history.location.search;
    searchParams
      ? (await this.GetEntries()) && (await this.SearchEntries(searchParams))
      : await this.GetEntries();
    this.setState({
      loadingComponents: true,
      currURL: searchParams ? searchParams : "",
    });
  }

  async componentDidUpdate() {
    const currURL = this.props.history.location.search
      ? this.props.history.location.search
      : "";

    // console.log(this.state.currURL === currURL);
    if (currURL !== this.state.currURL) {
      this.setState({ currURL: currURL });
      await this.SearchEntries(currURL);
    }
  }

  GetEntries = async (url) => {
    // const params = GetURLParams();
    // let keywords;
    // if (params.keywords) keywords = params.keywords.split(",");
    // console.log(params);
    await axios
      .get(`https://quarantined.azurewebsites.net/api/Event/`)
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ entries: resp.data, searchedEntries: resp.data });
      });
  };

  SearchEntries = async (url) => {
    // const params = GetURLParams();
    const keywords = url.substring("?keywords=".length);
    let keywordList = [];
    const newEntries = [];
    if (keywords) keywordList = keywords.split(",");
    if (keywordList.length === 0) {
      this.setState((prevState) => {
        return {
          ...prevState,
          searchedEntries: prevState.entries,
        };
      });
      return;
    }
    for (const keyword in keywordList) {
      keywordList[keyword] = keywordList[keyword].toLowerCase();
    }
    let stuffFound = false;
    for (const element in this.state.entries) {
      const titleWords = this.state.entries[element].title.split(" ");
      for (const word in titleWords) {
        if (keywordList.includes(titleWords[word].toLowerCase())) {
          stuffFound = true;
          newEntries.push(this.state.entries[element]);
          break;
        }
      }
    }
    this.setState({ searchedEntries: newEntries });
    // console.log(keywords);
    // if (params.keywords) keywords = params.keywords.split(",");
    // console.log(params.keywords);
    // await axios
    //   .get(
    //     `https://quarantined.azurewebsites.net/api/EventSearch/title/?keywords=${keywords}`
    //   )
    //   .then((resp) => {
    //     // console.log(resp.data);
    //     this.setState({ entries: resp.data });
    //   });
  };

  render() {
    return (
      <Page>
        <Navigation
          modalToggle={this.modalToggle}
          isMobile={isMobile}
          titleHeader="Discover and Share your Favorite Online Events"
        />
        <TrendingSection modalToggle={this.modalToggle} isMobile={isMobile} />
        <Row>
          <Col xs="0" md="3">
            <Filter isMobile={isMobile} modalToggle={this.modalToggle} />
          </Col>
          <Col xs="12" md="9">
            <EntryList
              isMobile={isMobile}
              entrylist={this.state.searchedEntries}
            />
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
