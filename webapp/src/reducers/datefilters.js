const initialState = {
  dateFilter: undefined,
};

const DateFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATE":
      return {
        dateFilter: action.dateFilter,
      };
    case "REMOVE_DATE":
      return {
        dateFilter: undefined,
      };
    default:
      return state;
  }
};

export default DateFilterReducer;
