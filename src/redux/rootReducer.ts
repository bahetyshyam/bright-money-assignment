import { combineReducers } from "redux";
import { billsReducer } from "./bills/bills.reducer";

export default combineReducers({
  billsReducer,
});
