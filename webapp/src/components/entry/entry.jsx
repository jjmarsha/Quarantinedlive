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
  const [live, setLive] = React.useState(<div className="entry-live"></div>);

  useEffect(() => {
    const entryDate = new Date(entry.time + " UTC");
    const currDate = new Date();
    const timeDifference = entryDate.getTime() - currDate.getTime();
    if (timeDifference <= 3600000 && timeDifference >= -1200000) {
      // If within an hour
      setLive(
        <div className="bg-success entry-live entry-live-border">
          <div className="text-rotated live">LIVE</div>
        </div>
      );
    } else if (timeDifference <= 86400000 && timeDifference >= 0) {
      // If within 24 hours
      setLive(
        <div className="bg-warning entry-live entry-live-border">
          <div className="text-rotated soon">SOON</div>
        </div>
      );
    }
  }, []);

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
              className="mt-2 entry-text w-100 d-flex align-items-end"
              style={{ fontSize: "20px", fontWeight: 600 }}
            >
              <div>{entry.title}</div>
            </p>
            <div className="h-30 pt-0">
              <p className="entry-text font-weight-normal text-truncate w-100">
                {entry.nameofhost}
              </p>
              <p className="entry-text font-weight-normal text-truncate w-100">
                {ParseDate()}
              </p>
              <p className="mb-2">
                Topics(s):&nbsp;
                {entry.topics
                  ? entry.topics.map((topic, key) => {
                      return <>{(key === 0 ? "" : ", ") + topic}</>;
                    })
                  : null}
              </p>
            </div>
          </Col>
          <Col xs="1"></Col>
        </Row>
      </div>
    );
  }

  return (
    <div className={"entry " + className} onClick={redirectEntryView}>
      {live}
      <Row className="h-100 align-items-center">
        <Col md="12">
          <Row className="pb-2 pt-2">
            <Col md="12">
              <p
                className="entry-text text-truncate"
                style={{ fontWeight: 500 }}
              >
                {entry.title}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Row className={"entry-info" + className}>
                <Col md="3" className="m-auto">
                  <p
                    className="entry-text text-right"
                    style={{ fontSize: "13px" }}
                  >
                    {entry.nameofhost}
                  </p>
                </Col>
                <Col md="6" className="m-auto entry-text-small">
                  {ParseDate()}
                </Col>
                <Col
                  md="3"
                  className="mt-auto mb-auto pl-0 entry-text-small text-left"
                >
                  Topic:&nbsp;
                  {entry.topics
                    ? entry.topics.map((topic, key) => {
                        return <>{(key === 0 ? "" : ", ") + topic}</>;
                      })
                    : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(Entry);
