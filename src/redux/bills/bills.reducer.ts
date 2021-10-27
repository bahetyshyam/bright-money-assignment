import { BillsTypes } from "./bills.constants";

const INITIAL_STATE: BillsState = {
  bills: [],
  categories: [],
};

export const billsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case BillsTypes.APPEND_BILLS:
      return {
        ...state,
        bills: [...state.bills, ...action.data],
      };
    case BillsTypes.ADD_NEW_BILL:
      return {
        ...state,
        bills: [...state.bills, action.data],
      };
    case BillsTypes.EDIT_BILL:
      const editedArray = state.bills.map((item) => {
        if (item.id === action.data.id) {
          return action.data;
        } else return item;
      });
      return {
        ...state,
        bills: editedArray,
      };
    case BillsTypes.DELETE_BILL:
      console.log("Hitting here");
      const filteredArray = state.bills.filter(
        (item) => item.id !== action.data.billId
      );
      return {
        ...state,
        bills: filteredArray,
      };
    default:
      return state;
  }
};
