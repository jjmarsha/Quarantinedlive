const TimeZoneReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_TIME_ZONE":
      return {
        timezone: action.timezone,
      };
    default:
      return state;
  }
};

export default TimeZoneReducer;
