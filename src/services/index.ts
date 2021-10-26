import mockData from "../mockData";

export const mockGetAllBills = () => {
  return new Promise<{ data: Bill[] }>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: mockData,
      });
    }, 1000);
  });
};
