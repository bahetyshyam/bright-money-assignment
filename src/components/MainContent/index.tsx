import { useEffect } from "react";
import { appendBills } from "../../redux/bills/bills.actions";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { mockGetAllBills } from "../../services";
import BillsTable from "../BillsTable";

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
  return (
    <div style={{ width: "100%" }}>
      <BillsTable />
    </div>
  );
};

export default MainContent;
