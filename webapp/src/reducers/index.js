import { combineReducers } from "redux";
import TimeZoneReducer from "./timezone";
import { FiltersReducer, LanguageReducer } from "./filters";
import UIStatusReducer from "./ui_status";
import DateFilterReducer from "./datefilters";

const rootReducer = combineReducers({
  timezone: TimeZoneReducer,
  filters: FiltersReducer,
  uiStatus: UIStatusReducer,
  dateFilter: DateFilterReducer,
  language: LanguageReducer,
});

export default rootReducer;
