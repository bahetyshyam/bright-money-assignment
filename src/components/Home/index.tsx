import { useEffect } from "react";
import { appendBills } from "../../redux/bills/bills.actions";
import { useAppDispatch } from "../../redux/hooks";
import { mockGetAllBills } from "../../services";
import BillsTable from "../BillsTable";
import TimeSeriesChart from "../TimeSeriesChart";

const Home = () => {
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllBills = async () => {
      const response = await mockGetAllBills();
      reduxDispatch(appendBills(response.data));
    };
    fetchAllBills();
  }, [reduxDispatch]);
  return (
    <div style={{ width: "100%" }}>
      <BillsTable />
      <TimeSeriesChart />
    </div>
  );
};

export default Home;
