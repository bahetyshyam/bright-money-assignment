import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";

const TimeSeriesChart = () => {
  const billData = useAppSelector((state) => state.billsReducer.activeBills);
  const sortedData = billData.sort(
    (a, b) => moment(a.date).unix() - moment(b.date).unix()
  );
  console.log("Sorted Data", sortedData);
  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(TimeSeriesChart);
