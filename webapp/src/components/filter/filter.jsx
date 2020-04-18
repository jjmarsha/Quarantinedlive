import React from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
} from "reactstrap";
import Language from "../../lists/languages";
import Topics from "../../lists/topics";
import Tag from "../tag/tag";
import "./filter.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  SetFilters,
  SetDateFilter,
  SetLanguageFilter,
} from "../../actions/index";
import { ParseUTCToBackend } from "../../lists/daterefs";
import CustomDropdown from "./dropdown";
import "../../styles/formfields.css";
import "../../styles/colors.css";

const modifiers = {
  setMaxHeight: {
    enabled: true,
    order: 890,
    fn: (data) => {
      return {
        ...data,
        styles: {
          ...data.styles,
          overflow: "auto",
          maxHeight: "200px",
        },
      };
    },
  },
};

const Filter = (props) => {
  const [topicIsOpen, setTopicIsOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("Language");
  const [date, setDate] = React.useState(undefined);
  const filters = useSelector((state) => state.filters);
  const dispatchFilters = useDispatch();
  const [filterButtonState, setfilterButtonState] = React.useState(false);

  const addFilter = (event) => {
    const filterName = event.currentTarget.title || event.currentTarget.value;
    const filtersList = filters.filters;
    if (!filtersList.includes(filterName)) {
      filtersList.push(filterName);
      dispatchFilters(SetFilters(filtersList));
    }
  };

  const removeFilter = (event) => {
    const filterName = event.currentTarget.title;
    const filtersList = filters.filters;
    for (let i = 0; i < filtersList.length; ++i) {
      if (filtersList[i] === filterName) {
        filtersList[i] = filtersList[filtersList.length - 1];
        filtersList.pop();
        dispatchFilters(SetFilters(filtersList));
        break;
      }
    }
  };

  const addDate = (date) => {
    setDate(date);
    if (!date) {
      dispatchFilters(SetDateFilter(undefined));
      return;
    }
    const parsedDate = ParseUTCToBackend(date.toString(), "00:00:00");
    dispatchFilters(SetDateFilter(parsedDate));
  };

  const handleLanguage = (event) => {
    const language = event.target.value;
    if (language === "-- None --") {
      setLanguage(undefined);
      dispatchFilters(SetLanguageFilter(undefined));
      return;
    }
    setLanguage(language);
    dispatchFilters(SetLanguageFilter(language));
  };

  return (
    <Row
      className={
        "mt-2 text-left " +
        (props.isMobile
          ? "filter-container-mobile" + (filterButtonState ? "-open " : "")
          : "")
      }
    >
      <Col md="12">
        <Row className="pt-1">
          <Col xs="3" md="12">
            <div style={{ fontSize: "30px", fontWeight: 300 }}>Filters</div>
          </Col>
          {props.isMobile ? (
            <>
              <Col xs="4" className="mt-auto mb-auto">
                <Button
                  className=" d-flex align-items-center color-green"
                  onClick={() => setfilterButtonState(!filterButtonState)}
                >
                  <div>
                    <i
                      className={
                        "fa fa-caret" + (filterButtonState ? "-up" : "-down")
                      }
                    ></i>
                  </div>
                </Button>
              </Col>
              <Col xs="5" className="d-flex justify-content-end">
                <Button
                  onClick={props.modalToggle}
                  className="float-right mt-auto mb-auto  color-green"
                >
                  Add New &nbsp;
                  <i className="fa fa-plus" />
                </Button>
              </Col>
            </>
          ) : (
            ""
          )}
        </Row>
        <Row className="mt-2 mb-4">
          <Col md="12">
            {/* <Dropdown
              isOpen={topicIsOpen}
              toggle={(e) => setTopicIsOpen(!topicIsOpen)}
              direction="down"
            >
              <DropdownToggle
                className="topic w-100 d-flex justify-content-between m-auto align-items-center"
                caret
              >
                Topic
              </DropdownToggle>
              <DropdownMenu className="w-100" modifiers={modifiers}>
                {Topics.map((topic, key) => {
                  return (
                    <DropdownItem title={topic} onClick={addFilter} key={key}>
                      {topic}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown> */}
            <CustomDropdown
              className="w-100"
              list={Topics}
              placeholder="Topic"
              onChange={addFilter}
            ></CustomDropdown>
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <Col className="mb-4" xs="6" md="12">
            <CustomDropdown
              className="w-100"
              list={Language}
              placeholder="Language"
              value={language}
              onChange={handleLanguage}
            />
          </Col>
          <Col xs="6" md="12">
            <DatePicker
              className="w-100 border rounded pl-2 pt-1 pb-1 text-muted input-field-grey-border input-field-height"
              wrapperClassName="w-100"
              placeholderText="Date"
              selected={date}
              onChange={addDate}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12" className="d-flex justify-content-start flex-wrap">
            {filters.filters.map((filters, key) => {
              return (
                <div
                  key={key}
                  title={filters}
                  onClick={removeFilter}
                  className="mt-auto mb-auto p-1"
                >
                  <Tag placename={filters} className="tag-normal" />
                </div>
              );
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Filter;
