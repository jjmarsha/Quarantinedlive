import React, { useEffect } from "react";
import "./entry.css";
import { Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import {
  ParseDateString,
  ParseTimeString,
  ParseDateTimeToUTC,
} from "../../lists/daterefs";

const Entry = ({ entry, className, onClick, isMobile, history }) => {
  const redirectEntryView = () => {
    history.push(`/view/${entry.id}`);
  };

  const ParseDate = () => {
    const date = new Date(entry.time + " UTC");
    if (entry.time)
      return `${ParseDateString(date.toString())} ${ParseTimeString(
        date.toString().split(" ")[4]
      )}`;
  };

  if (isMobile) {
    return (
      <div className={"entry-mobile " + className} onClick={redirectEntryView}>
        <Row className="h-100">
          <Col xs="1" className="m-auto text-right"></Col>
          <Col
            xs="10"
            className="h-100 m-auto text-left d-flex align-content-between flex-wrap"
          >
            <p
              className="mt-2 entry-text text-truncate w-100"
              style={{ fontSize: "20px", fontWeight: 600 }}
            >
              {entry.title}
            </p>
            <p className="entry-text font-weight-normal text-truncate w-100">
              {entry.nameofhost}
            </p>
            <p className="entry-text font-weight-normal text-truncate w-100">
              {ParseDate()}
            </p>
            <p className="mb-2">
              Topics(s):&nbsp;
              {entry.topics.map((topic, key) => {
                return <>{topic + ", "}</>;
              })}
            </p>
          </Col>
          <Col xs="1"></Col>
        </Row>
      </div>
    );
  }

  return (
    <div
      className={"entry border-left-success " + className}
      onClick={redirectEntryView}
    >
      <Row className={"h-100 entry" + className}>
        <Col md="3" className="m-auto">
          <p className="entry-text font-weight-normal text-truncate">
            {entry.title}
          </p>
          <p className="entry-text" style={{ fontSize: "13px" }}>
            {entry.nameofhost}
          </p>
        </Col>
        <Col md="4" className="m-auto entry-text-small">
          {ParseDate()}
        </Col>
        <Col md="4" className="mt-auto mb-auto pl-0 entry-text-small text-left">
          Topics(s):&nbsp;
          {entry.topics
            ? entry.topics.map((topic, key) => {
                return <>{(key === 0 ? "" : ", ") + topic}</>;
              })
            : null}
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(Entry);
