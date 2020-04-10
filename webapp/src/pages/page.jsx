import React from "react";
import { Row, Col } from "reactstrap";

const Page = (props) => {
    return(
        <Row className="ml-auto mr-auto mt-4 w-100 h-100">
            <Col md="1" lg="2"/>
            <Col md="10" lg="8">
                {props.children}
                <Row>
                    <Col md="12" className="border-top mt-5 mb-5 pb-5"></Col>
                </Row>
            </Col>
            <Col md="1" lg="2"/>
        </Row>
    )
}

export default Page;