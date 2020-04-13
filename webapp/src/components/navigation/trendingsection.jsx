import React from "react";
import { Row, Col, Button } from "reactstrap";
import Tag from "../tag/tag";
import Topics from "../../lists/topics";
import { useDispatch, useSelector } from "react-redux";
import { SetFilters } from "../../actions/index";

const TrendingSection = (props) => {
  const filters = useSelector((state) => state.filters.filters);
  const dispatchFilters = useDispatch();

  const addFilter = (event) => {
    const filterName = event.currentTarget.title;
    const filtersList = filters;
    if (!filtersList.includes(filterName)) {
      filtersList.push(filterName);
      dispatchFilters(SetFilters(filtersList));
    }
  };

  if (props.isMobile) {
    return (
      <Row className="mt-3">
        <Col xs="0" md="12" lg="2" className="d-flex justify-content-end">
          <Button
            onClick={props.modalToggle}
            className="mt-auto mb-auto w-100 d-flex justify-content-between"
          >
            Add New &nbsp;
            <i className="mt-auto mb-auto fa fa-plus" />
          </Button>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row className="mt-3 border-bottom pb-3">
        <Col xs="0" md="12" lg="10" className="d-flex justify-content-left ">
          <p
            className="font-weight-light ml-0 mr-2"
            style={{
              fontSize: "20px",
              margin: "auto",
            }}
          >
            Trending Now
          </p>
          <div className="d-flex justify-content-start flex-wrap">
            {Topics.map((topics, key) => {
              if (key > 7) return null;
              return (
                <div className="mt-auto mb-auto p-1" key={key}>
                  <Tag
                    placename={topics}
                    onClick={addFilter}
                    className="tag-normal"
                  />
                </div>
              );
            })}
          </div>
        </Col>
        <Col xs="0" md="12" lg="2" className="d-flex justify-content-end">
          <Button
            onClick={props.modalToggle}
            className="float-right mt-auto mb-auto"
          >
            Add New &nbsp;
            <i className="fa fa-plus" />
          </Button>
        </Col>
      </Row>
    );
  }
};

export default TrendingSection;
