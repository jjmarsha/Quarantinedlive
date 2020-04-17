import React from "react";
import SearchBar from "../searchbar/searchbar";
import { Row, Col, Button } from "reactstrap";
import Tag from "../tag/tag";
import "../../styles/common.css";
import Logo from "../../static/Logo.png";
import { withRouter } from "react-router-dom";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isMobile) {
      return (
        <>
          <Row className="mt-3 mb-4 height-row-mobile">
            <Col xs="12">
              <a href="/">
                <img
                  alt=""
                  className="mb-auto mt-auto"
                  src={Logo}
                  style={{ height: "60px" }}
                />
              </a>
            </Col>
            {/* <Col xs="3"></Col>
            <Col xs="6" className="d-flex pb-3 justify-content-end h-100">
              <Button
                onClick={this.props.modalToggle}
                className="d-flex justify-content-between"
              >
                Add New &nbsp;
                <i className="mt-auto mb-auto fa fa-plus" />
              </Button>
            </Col> */}
          </Row>
          <Row className="pb-1">
            <Col md="12" className="text-center">
              <h3>{this.props.titleHeader}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="11" lg="11">
              <SearchBar />
            </Col>
          </Row>
        </>
      );
    }

    return (
      <>
        <Row>
          <Col xs="12" md="2">
            <a href="/">
              <img alt="" src={Logo} style={{ height: "40px" }} />
            </a>
          </Col>
          <Col xs="12" md="10">
            <SearchBar />
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Navigation);
