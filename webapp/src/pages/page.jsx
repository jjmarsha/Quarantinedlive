import React from "react";
import { Row, Col } from "reactstrap";
import "./page.css";

const Page = (props) => {
  return (
    <>
      <div className="background-image-qioo"></div>
      <Row className="ml-auto mr-auto w-100 h-100">
        <Col md="1" lg="2" />
        <Col md="10" lg="8" className="pt-4 h-100">
          {props.children}
          <Row>
            <Col md="12" className="border-top mt-5 mb-5 pb-5"></Col>
          </Row>
        </Col>
        <Col md="1" lg="2" className="" />
      </Row>
    </>
  );
};

export default Page;
