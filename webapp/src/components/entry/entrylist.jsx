import React, { useState, useRef, useEffect } from "react";
import Loading from "../../common/loading";
import Entry from "./entry";
import { useSelector, useDispatch } from "react-redux";
import { SetLoadingStatus } from "../../actions/index";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export const SetLoadingHandler = () => {
  const dispatch = useDispatch();
  dispatch(SetLoadingStatus());
};

const EntryList = ({ isMobile, entrylist, filters, dateFilter, language }) => {
  const loading = useSelector((state) => state.uiStatus.loading);
  const [entries, setEntries] = useState(undefined);

  useEffect(() => {
    let newEntryList = [];
    if (
      filters.filters.length !== 0 ||
      dateFilter.dateFilter ||
      language.language
    ) {
      for (const element of entrylist) {
        if (element.topics) {
          for (const topic of element.topics) {
            if (
              CompareFilters(topic) &&
              CompareDate(element.time) &&
              CompareLanguage(element.language)
            ) {
              newEntryList.push(element);
              break;
            }
          }
        }
      }
    } else {
      newEntryList = entrylist;
    }
    newEntryList.sort((a, b) => {
      if (a.time) return new Date(a.time) - new Date(b.time);
    });
    setEntries(newEntryList);
  }, [entrylist, filters, dateFilter, language]);

  const CompareDate = (date) => {
    if (!dateFilter.dateFilter) return true;
    const filteredDate = new Date(dateFilter.dateFilter + " UTC");
    const compareDate = new Date(date + " UTC");
    if (
      filteredDate.getDate() === compareDate.getDate() &&
      filteredDate.getMonth() === compareDate.getMonth() &&
      filteredDate.getFullYear() == compareDate.getFullYear()
    ) {
      return true;
    }
    return false;
  };

  const CompareFilters = (topic) => {
    if (filters.filters.length === 0) return true;
    return filters.filters.includes(topic);
  };

  const CompareLanguage = (elementLang) => {
    if (!language.language) return true;
    return elementLang === language.language;
  };

  return (
    <React.Fragment>
      {entries ? (
        entries.map((entry, key) => {
          return (
            <Entry
              className="mt-3 mb-3 entry-hover-cursor rounded"
              entry={entry}
              key={key}
              isMobile={isMobile}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    dateFilter: state.dateFilter,
    language: state.language,
  };
};

export default connect(mapStateToProps)(withRouter(EntryList));
