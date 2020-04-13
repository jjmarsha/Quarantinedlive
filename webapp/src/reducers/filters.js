const intitialFilterState = {
  filters: [],
};

const FiltersReducer = (state = intitialFilterState, action) => {
  switch (action.type) {
    case "ALTER_FILTERS":
      return {
        filters: action.filters,
      };
    default:
      return state;
  }
};

export default FiltersReducer;
