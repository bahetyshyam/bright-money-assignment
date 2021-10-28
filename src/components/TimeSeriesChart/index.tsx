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
  const memoObject: { [key: string]: number } = {};
  billData.forEach((billItem) => {
    console.log(billItem);
    if (billItem.date in memoObject) {
      memoObject[billItem.date] = memoObject[billItem.date] + billItem.amount;
    } else {
      memoObject[billItem.date] = billItem.amount;
    }
  });
  const sortedData = Object.keys(memoObject)
    .map((objectkey) => ({ date: objectkey, amount: memoObject[objectkey] }))
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
  return (
    <div style={{ width: "100%", height: 500, marginTop: 100 }}>
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
          <Bar name="Amount" dataKey="amount" fill="#1890FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(TimeSeriesChart);
