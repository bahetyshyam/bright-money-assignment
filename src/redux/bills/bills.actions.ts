import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { BillsTypes } from "./bills.constants";

export const appendBills =
  (data: Bill[]): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch({
      type: BillsTypes.APPEND_BILLS,
      data,
    });
    dispatch(budgetUpdated(getState().billsReducer.budget));
  };

export const addBill =
  (data: Bill): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch({
      type: BillsTypes.ADD_NEW_BILL,
      data,
    });
    dispatch(budgetUpdated(getState().billsReducer.budget));
  };

export const editBill =
  (data: Bill): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch({
      type: BillsTypes.EDIT_BILL,
      data,
    });
    dispatch(budgetUpdated(getState().billsReducer.budget));
  };

export const deleteBill =
  (billId: string | number): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch({
      type: BillsTypes.DELETE_BILL,
      data: {
        billId,
      },
    });
    dispatch(budgetUpdated(getState().billsReducer.budget));
  };

export const budgetUpdated = (budget: number) => {
  return {
    type: BillsTypes.BUDGET_UPDATED,
    data: {
      budget,
    },
  };
};
