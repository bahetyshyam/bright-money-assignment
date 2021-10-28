import { BillsTypes } from "./bills.constants";

const INITIAL_STATE: BillsState = {
  activeBills: [],
  billsToPay: [],
  budget: 0,
};

export const billsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case BillsTypes.APPEND_BILLS:
      return {
        ...state,
        activeBills: [...state.activeBills, ...action.data],
      };
    case BillsTypes.ADD_NEW_BILL:
      return {
        ...state,
        activeBills: [...state.activeBills, action.data],
      };
    case BillsTypes.EDIT_BILL:
      const editedArray = state.activeBills.map((item) => {
        if (item.id === action.data.id) {
          return action.data;
        } else return item;
      });
      return {
        ...state,
        activeBills: editedArray,
      };
    case BillsTypes.DELETE_BILL:
      const filteredArray = state.activeBills.filter(
        (item) => item.id !== action.data.billId
      );
      return {
        ...state,
        activeBills: filteredArray,
      };
    case BillsTypes.BUDGET_UPDATED:
      console.log(action.data.budget);
      if (action.data.budget === 0) {
        return {
          ...state,
          budget: action.data.budget,
          billsToPay: [],
        };
      } else {
        const sortedActiveBills = state.activeBills.sort(
          (a, b) => b.amount - a.amount
        );
        let budgetUsed = 0;
        let tempBillsToPay: Bill[] = [];
        sortedActiveBills.forEach((billItem) => {
          if (billItem.amount + budgetUsed > action.data.budget) {
            //do nothing
          } else {
            budgetUsed = budgetUsed + billItem.amount;
            tempBillsToPay.push(billItem);
          }
        });
        return {
          ...state,
          billsToPay: tempBillsToPay,
          budget: action.data.budget,
        };
      }
    default:
      return state;
  }
};
