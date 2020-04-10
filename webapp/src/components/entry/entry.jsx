import React from "react";
import "./entry.css";
import { Row, Col } from "reactstrap";

const Entry = ({entry, className, onClick, isMobile}) => {
    if(isMobile) {
        return(
            <div className={"entry-mobile " + className} onClick={onClick}>
                <Row className="h-100">
                    <Col xs="2" className="m-auto text-right">
                        <i className="fa fa-circle text-success"></i>
                    </Col>
                    <Col xs="9" className="h-100 m-auto text-left d-flex align-content-between flex-wrap">
                        <p className="mt-2 entry-text text-truncate w-100" style={{fontSize: "20px", fontWeight: 600}}>{entry.title}</p>
                        <p className="entry-text font-weight-normal text-truncate w-100">{entry.hostName}</p>
                        <p className="entry-text font-weight-normal text-truncate w-100">{entry.date}</p>
                        <p className="mb-2">
                            Topics(s):&nbsp;          
                            {
                                entry.topics.map((topic, key) => {
                                    return <>{topic + ", "}</>
                                })
                            }
                        </p>
                    </Col>
                    <Col xs="1"></Col>
                </Row>
            </div>
        );
    }

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
                    Topics(s):&nbsp; 
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