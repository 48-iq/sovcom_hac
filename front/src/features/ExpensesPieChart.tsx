import { Cell, Pie, PieChart } from "recharts";
// TO-DO выбрать красивые цвета, и придумать подписи
// TO-DO заменить мок данные

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export const ExpensesPieChart = (props: {data: PieChartData[]}) => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={props.data}
        innerRadius={90}
        outerRadius={120}
        paddingAngle={5}
        dataKey="value"
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  )
}