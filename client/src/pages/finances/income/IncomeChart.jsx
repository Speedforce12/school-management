import moment from "moment";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useValue } from "../../../context/AuthContext";

const months = 6;
const today = new Date();
const tempData = [];

for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format("MMM YYYY"),
    incomes: 0,
  });
}

export default function IncomeChart() {
  const {
    state: { incomes },
  } = useValue();

  const [data, setData] = useState([]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].incomes = 0;
    }
    incomes.forEach((income) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(income?.income_date, "month"))
          return tempData[i].incomes++;
      }
    });
    setData([...tempData]);
  }, [incomes]);

  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='incomes'
          stroke='#2451B7'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
