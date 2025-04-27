import { ChartContainer } from "../widgets/ChartContainer";
import { SpendTable } from "../widgets/SpendTable";
import { Advertising } from "../widgets/Advertising";

const statisticss = {
  receipt: [
    {
      id: "1",
      total: 150.50,
      date: "2025-04-01T10:15:00",
      seller: "Магазин А",
      category: "Продукты"
    },
    {
      id: "2",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Одежда"
    },
    {
      id: "3",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Образование"
    },
    {
      id: "4",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Информация"
    },
    {
      id: "5",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Маркетплейсы"
    },
    {
      id: "6",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Такси"
    },
    {
      id: "7",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Цветы"
    },
    {
      id: "6",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Такси"
    },
    {
      id: "7",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Спорттовары"
    },
    {
      id: "6",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Развлечения"
    },
    {
      id: "7",
      total: 75.20,
      date: "2025-04-10T12:45:00",
      seller: "Магазин Б",
      category: "Рестораны"
    }
  ]
};

export const DashboardPage = () => {
  return (
    <>
      <ChartContainer />
      <br />
      <Advertising />
      <br />
      <SpendTable data={statisticss.receipt}/>
    </>
  )
}