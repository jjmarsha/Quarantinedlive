import React, { useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import Tag from "../tag/tag";
import Topics from "../../lists/topics";
import { useDispatch, useSelector } from "react-redux";
import { SetFilters } from "../../actions/index";
import "../../styles/colors.css";

const TrendingSection = (props) => {
  const filters = useSelector((state) => state.filters.filters);
  const dispatchFilters = useDispatch();

  const toggleFilter = (event) => {
    const filterName = event.currentTarget.title;
    const filtersList = filters;
    if (!filtersList.includes(filterName)) {
      filtersList.push(filterName);
      dispatchFilters(SetFilters(filtersList));
    } else {
      for (let i = 0; i < filtersList.length; ++i) {
        if (filtersList[i] === filterName) {
          filtersList[i] = filtersList[filtersList.length - 1];
          filtersList.pop();
          dispatchFilters(SetFilters(filtersList));
          break;
        }
      }
    }
  };

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
            if ((!props.isMobile && key > 7) || (props.isMobile && key > 5))
              return null;
            return (
              <div className="mt-auto mb-auto p-1" key={key}>
                <Tag
                  placename={topics}
                  onClick={toggleFilter}
                  className={props.isMobile ? "tag-stick" : "tag-normal"}
                  isMobile={props.isMobile}
                />
              </div>
            );
          })}
        </div>
      </Col>
      {!props.isMobile ? (
        <Col xs="0" md="12" lg="2" className="d-flex justify-content-end">
          <Button
            onClick={props.modalToggle}
            className="float-right mt-auto mb-auto color-green"
          >
            Add New &nbsp;
            <i className="fa fa-plus" />
          </Button>
        </Col>
      ) : (
        ""
      )}
    </Row>
  );
};

export default TrendingSection;
