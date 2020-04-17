const initialState = {
  loading: false,
};

const UIStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true };
    case "STOP_LOADING":
      return { loading: false };
    default:
      return state;
  }
};

export default UIStatusReducer;
