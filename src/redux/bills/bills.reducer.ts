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
    default:
      return state;
  }
};
