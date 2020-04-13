import { combineReducers } from "redux";
import TimeZoneReducer from "./timezone";
import FiltersReducer from "./filters";
import UIStatusReducer from "./ui_status";

const rootReducer = combineReducers({
  timezone: TimeZoneReducer,
  filters: FiltersReducer,
  uiStatus: UIStatusReducer,
});

export default rootReducer;
