import { mockCategories } from "../../mockData";

const INITIAL_STATE: string[] = mockCategories;

export const categoriesReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
