import React, { useEffect } from "react";
import "./entry.css";
import { Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import {
  ParseDateString,
  ParseTimeString,
  ParseDateTimeToUTC,
} from "../../lists/daterefs";
import "../../styles/colors.css";

const Entry = ({ entry, className, onClick, isMobile, history }) => {
  const [live, setLive] = React.useState(undefined);

  useEffect(() => {
    const entryDate = new Date(entry.time + " UTC");
    const currDate = new Date();
    const timeDifference = entryDate.getTime() - currDate.getTime();
    if (timeDifference <= 3600000 && timeDifference >= -1200000) {
      // If within an hour
      if (!isMobile) {
        setLive(
          <div className="color-green entry-live entry-live-border">
            <div className="text-rotated live">LIVE</div>
          </div>
        );
      } else {
        setLive(
          <div className="color-green entry-live-mobile entry-live-border" />
        );
      }
    } else if (timeDifference <= 86400000 && timeDifference >= 0) {
      // If within 24 hours
      if (!isMobile) {
        setLive(
          <div className="bg-warning entry-live entry-live-border ">
            <div className="text-rotated soon">SOON</div>
          </div>
        );
      } else {
        setLive(
          <div className="bg-warning entry-live-mobile entry-live-border" />
        );
      }
    } else {
      if (!isMobile) {
        setLive(<div className="entry-live"></div>);
      } else {
        setLive(<div className="entry-live-mobile"></div>);
      }
    }
  }, [entry]);

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
        {live}
        <Row className="h-100">
          <Col
            xs="10"
            className="h-100 m-auto text-left d-flex align-content-between flex-wrap"
          >
            <p
              className="mt-4 h-70 entry-text d-flex align-items-end overflow-hidden"
              style={{ fontSize: "20px", fontWeight: 600 }}
            >
              {entry.title.substring(0, 60) +
                (entry.title.length > 59 ? "..." : "")}
            </p>
            <div className="h-30 pt-0 w-100">
              <p className="entry-text font-weight-normal text-truncate w-100">
                {"Host: " + entry.nameofhost}
              </p>
              <p className="entry-text font-weight-normal text-truncate w-100">
                {ParseDate()}
              </p>
              <p className="mb-2">
                Topic:&nbsp;
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
                    className="entry-text text-left text-truncate"
                    style={{ fontSize: "13px" }}
                  >
                    {"Host: " + entry.nameofhost}
                  </p>
                </Col>
                <Col md="6" className="m-auto entry-text-small ">
                  {ParseDate()}
                </Col>
                <Col
                  md="3"
                  className="mt-auto mb-auto pl-0 entry-text-small text-right"
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
