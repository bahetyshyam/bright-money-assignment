import { mockBills } from "../mockData";

export const mockGetAllBills = () => {
  return new Promise<{ data: Bill[] }>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: mockBills,
      });
    }, 1000);
  });
};
