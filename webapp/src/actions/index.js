export const SetTimeZone = (timezone) => {
  return {
    type: "SET_TIME_ZONE",
    timezone: timezone,
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
