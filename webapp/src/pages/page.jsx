import React from "react";
import { Row, Col } from "reactstrap";

const Page = (props) => {
    return(
        <Row className="ml-auto mr-auto mt-4 w-100 h-100">
            <Col md="2"/>
            <Col md="8">
                {props.children}
            </Col>
            <Col md="2"/>
        </Row>
    )
}

export default Page;