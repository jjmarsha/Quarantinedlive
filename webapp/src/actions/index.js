export const SetTimeZone = (timezone) => {
  return {
    type: "SET_TIME_ZONE",
    timezone: timezone,
  };
};

export const SetDateFilter = (date) => {
  return {
    type: "SET_DATE",
    dateFilter: date,
  };
};

export const RemoveDateFilter = () => {
  return {
    type: "REMOVE_DATE",
  };
};

export const SetLanguageFilter = (language) => {
  return {
    type: "SET_LANG",
    language: language,
  };
};

export const SetFilters = (filters) => {
  return {
    type: "ALTER_FILTERS",
    filters: filters,
  };
};

export const SetLoadingStatus = () => {
  return {
    type: "LOADING",
  };
};

export const StopLoadingStatus = () => {
  return {
    type: "STOP_LOADING",
  };
};
