import { useEffect } from "react";
import { appendBills } from "../../redux/bills/bills.actions";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { mockGetAllBills } from "../../services";

const MainContent = () => {
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllBills = async () => {
      const response = await mockGetAllBills();
      reduxDispatch(appendBills(response.data));
    };
    fetchAllBills();
  }, [reduxDispatch]);
  const state = useAppSelector((state) => state.billsReducer);
  console.log(state);
  return <div>Main COntent</div>;
};

export default MainContent;
