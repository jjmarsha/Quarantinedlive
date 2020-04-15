import React from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
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
  const [language, setLanguage] = React.useState(undefined);
  const [date, setDate] = React.useState(undefined);
  const filters = useSelector((state) => state.filters);
  const dispatchFilters = useDispatch();

  const addFilter = (event) => {
    const filterName = event.currentTarget.title;
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
    const parsedDate = ParseUTCToBackend(date.toString(), "00:00:00");
    dispatchFilters(SetDateFilter(parsedDate));
  };

  const handleLanguage = (event) => {
    const language = event.target.value;
    setLanguage(language);
    dispatchFilters(SetLanguageFilter(language));
  };

  return (
    <Row className="mt-2 text-left">
      <Col md="12">
        <Row>
          <Col md="12">
            <div style={{ fontSize: "20px", fontWeight: 300 }}>Filters</div>
          </Col>
        </Row>
        <Row className="mt-2 mb-4">
          <Col md="12">
            <Dropdown
              isOpen={topicIsOpen}
              toggle={(e) => setTopicIsOpen(!topicIsOpen)}
              direction="down"
            >
              <DropdownToggle
                className="topic w-100 d-flex justify-content-between m-auto align-items-center"
                caret
              >
                Topics
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
            </Dropdown>
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <Col md="12">
            <CustomDropdown
              className="w-100"
              list={Language}
              placeholder="Select Language..."
              value={language}
              onChange={handleLanguage}
            />
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <Col md="12">
            <DatePicker
              className="w-100 border rounded pl-2 pt-1 pb-1 text-muted input-field-grey-border input-field-height"
              wrapperClassName="w-100"
              placeholderText="Select date..."
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
