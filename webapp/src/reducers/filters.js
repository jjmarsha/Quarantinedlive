const intitialFilterState = {
  filters: [],
};

export const FiltersReducer = (state = intitialFilterState, action) => {
  switch (action.type) {
    case "ALTER_FILTERS":
      return {
        filters: action.filters,
      };
    default:
      return state;
  }
};

const initialLanguageState = {
  language: undefined,
};

export const LanguageReducer = (state = initialLanguageState, action) => {
  switch (action.type) {
    case "SET_LANG":
      return {
        language: action.language,
      };
    default:
      return state;
  }
};
