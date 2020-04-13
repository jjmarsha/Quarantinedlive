import React from "react";
import Loading from "../../common/loading";
import Entry from "./entry";
import { useSelector, useDispatch } from "react-redux";
import { SetLoadingStatus } from "../../actions/index";

export const SetLoadingHandler = () => {
  const dispatch = useDispatch();
  dispatch(SetLoadingStatus());
};

const EntryList = ({ entries, isMobile }) => {
  const loading = useSelector((state) => state.uiStatus.loading);
  return (
    <>
      {!loading ? (
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
    </>
  );
};

export default EntryList;
