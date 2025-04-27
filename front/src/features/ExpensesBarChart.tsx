import { Bar, BarChart, XAxis } from "recharts";

export interface BarChartData {
  label: string;
  total: number;
}

export const ExpensesBarChart = (props: {data: BarChartData[]}) => {
  return (
    <>
      <BarChart width={300} height={300} data={props.data} barSize={20}>
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: '#FFFFFF' }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <Bar dataKey="total" fill="#001991" radius={[10, 10, 10, 10]}/>
      </BarChart>
    </>
  )
}
