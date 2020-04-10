import React from "react";
import "./entry.css";
import { Row, Col } from "reactstrap";

const Entry = ({entry, className, onClick}) => {
    return(
        <div className={"entry " + className} onClick={onClick}>
            <Row className="h-100">
                <Col md="1" className="m-auto text-right">
                    <i className="fa fa-circle text-success"></i>
                </Col>
                <Col md="4 m-auto text-left">
                    <p className="entry-text font-weight-normal text-truncate">{entry.title}</p>
                    <p className="entry-text" style={{fontSize: "13px"}}>{entry.hostName}</p>
                </Col>
                <Col md="3" className="m-auto entry-text-small">
                    {entry.date}
                </Col>
                <Col md="4" className="mt-auto mb-auto float-right entry-text-small">
                    {
                        entry.topics.map((topic, key) => {
                            return <>{topic + ", "}</>
                        })
                    }
                </Col>
            </Row>
        </div>
    );
}

export default Entry;