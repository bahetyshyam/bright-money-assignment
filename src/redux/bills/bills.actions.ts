import { Action, ActionCreator } from "redux";
import { BillsTypes } from "./bills.constants";

export const appendBills: ActionCreator<Action> = (data: Bill[]) => {
  return {
    type: BillsTypes.APPEND_BILLS,
    data,
  };
};
