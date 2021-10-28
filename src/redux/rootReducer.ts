import { combineReducers } from "redux";
import { billsReducer } from "./bills/bills.reducer";
import { categoriesReducer } from "./categories/categories.reducer";

export default combineReducers({
  billsReducer,
  categoriesReducer,
});
