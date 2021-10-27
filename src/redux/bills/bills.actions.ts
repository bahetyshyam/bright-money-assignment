import { Action, ActionCreator } from "redux";
import { BillsTypes } from "./bills.constants";

export const appendBills: ActionCreator<Action> = (data: Bill[]) => {
  return {
    type: BillsTypes.APPEND_BILLS,
    data,
  };
};

export const addBill = (data: Bill) => {
  return {
    type: BillsTypes.ADD_NEW_BILL,
    data,
  };
};

export const editBill = (data: Bill) => {
  return {
    type: BillsTypes.EDIT_BILL,
    data,
  };
};

export const deleteBill: ActionCreator<Action> = (billId: string | number) => {
  return {
    type: BillsTypes.DELETE_BILL,
    data: {
      billId,
    },
  };
};
