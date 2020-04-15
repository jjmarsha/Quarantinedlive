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

const EntryList = ({ isMobile, entrylist, filters, dateFilter }) => {
  const parentRef = useRef();
  const loading = useSelector((state) => state.uiStatus.loading);
  const [entries, setEntries] = useState(undefined);

  useEffect(() => {
    let newEntryList = [];
    if (filters.filters.length !== 0 || dateFilter.dateFilter) {
      for (const element of entrylist) {
        if (element.topics) {
          for (const topic of element.topics) {
            if (
              CompareFilters(topic, element.language) &&
              CompareDate(element.time)
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
      if (a.time) return new Date(b.time) - new Date(a.time);
    });
    setEntries(newEntryList);
  }, [entrylist, filters, dateFilter]);

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

  const CompareFilters = (topic, language) => {
    if (filters.filters.length === 0) return true;
    return (
      filters.filters.includes(topic) || filters.filters.includes(language)
    );
  };

  return (
    <React.Fragment>
      {!loading && entries ? (
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
  };
};

export default connect(mapStateToProps)(withRouter(EntryList));
