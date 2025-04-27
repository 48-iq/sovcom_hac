import styled from "styled-components"
import { ExpensesPieChart, PieChartData } from "../features/ExpensesPieChart"
import { BarChartData, ExpensesBarChart } from "../features/ExpensesBarChart"
import { useEffect, useState } from "react"
import { DatePicker, Radio, Select, SelectProps, Spin } from "antd"
import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons"
import { CategoryCard } from "../features/CategoryCard"
import { fetchStatistic } from "../entities/statisticSlice"
import { useAppDispatch, useAppSelector } from "../app/store"
import dayjs, { Dayjs } from "dayjs"
import 'dayjs/locale/ru'
dayjs.locale('ru')

interface PeriodSelectProps extends SelectProps<'week' | 'month' | 'year'> {
  options: Array<{ value: 'week' | 'month' | 'year'; label: string }>;
}

const colors = [
  '#FAA2A2',
  '#FAA2E1',
  '#A4A2FA',
  '#A2FAFA',
  '#A4FAA2',
  '#F8FAA2',
  '#d2a2fa',
  '#faa2eb',
  '#faa2a2',
  '#eafaa2',
  '#6362a9',
]

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

export const ChartContainer = () => {
  const dispatch = useAppDispatch();
  const { statistics, loading, error } = useAppSelector((state) => state.statistics);
  const [chartType, setChartType] = useState('bar');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    let fromDate: string, toDate: string;

    if (selectedDate) {
      switch (period) {
        case 'week':
          fromDate = selectedDate.startOf('week').format('YYYY-MM-DD/HH:mm:ss');
          toDate = selectedDate.endOf('week').format('YYYY-MM-DD/HH:mm:ss');
          break;
        case 'month':
          fromDate = selectedDate.startOf('month').format('YYYY-MM-DD/HH:mm:ss');
          toDate = selectedDate.endOf('month').format('YYYY-MM-DD/HH:mm:ss');
          break;
        case 'year':
          fromDate = selectedDate.startOf('year').format('YYYY-MM-DD/HH:mm:ss');
          toDate = selectedDate.endOf('year').format('YYYY-MM-DD/HH:mm:ss');
          break;
      }
    } else {
      const currentDate = dayjs();
      switch (period) {
        case 'week':
          fromDate = currentDate.subtract(1, 'week').format('YYYY-MM-DD/HH:mm:ss');
          toDate = currentDate.format('YYYY-MM-DD/HH:mm:ss');
          break;
        case 'month':
          fromDate = currentDate.subtract(1, 'month').format('YYYY-MM-DD/HH:mm:ss');
          toDate = currentDate.format('YYYY-MM-DD/HH:mm:ss');
          break;
        case 'year':
          fromDate = currentDate.subtract(1, 'year').format('YYYY-MM-DD/HH:mm:ss');
          toDate = currentDate.format('YYYY-MM-DD/HH:mm:ss');
          break;
      }
    }

    dispatch(fetchStatistic({ from: fromDate, to: toDate }));
  }, [dispatch, period, selectedDate]);

  const barChartData: BarChartData[] = statisticss?.receipt
    ? statisticss.receipt.map((receipt) => {
        const date = dayjs(receipt.date);
        let label: string;

        switch (period) {
          case 'week':
            label = date.format('dddd')[0].toUpperCase();
            break;
          case 'month':
            label = date.format('MMMM')[0].toUpperCase();
            break;
          case 'year':
            label = date.format('YYYY');
            break;
          default:
            label = '';
        }

        return {
          label,
          total: receipt.total,
        };
      })
    : [];

  const pieChartData: PieChartData[] = statisticss?.receipt
    ? Object.values(
        statisticss.receipt.reduce((acc, receipt) => {
          const category = receipt.category;
          if (!acc[category]) {
            acc[category] = {
              name: category,
              value: 0,
              color: getColorForCategory(category),
            };
          }
          acc[category].value += receipt.total;
          return acc;
        }, {} as Record<string, PieChartData>)
      )
    : [];

  const totalSpent = statisticss?.receipt
    ? statisticss.receipt.reduce((sum, receipt) => sum + receipt.total, 0).toFixed(1)
    : 0;

  const handlePeriodChange = (value: unknown) => {
    setPeriod(value as 'week' | 'month' | 'year');
    setSelectedDate(null);
  };

  const handleDateChange = (value: Dayjs | null) => {
    setSelectedDate(value);
  };

  if (error) return <Container>Упс... Возникла ошибка</Container>;
  if (loading) return <Container style={{ alignItems: 'center', alignContent: 'center' }}><Spin /></Container>;

  return (
    <Container>
      Траты: {totalSpent}
      <ControlsWrapper>
        <PeriodSelect 
          value={period}
          onChange={handlePeriodChange}
          options={[
            { value: 'week', label: 'Неделя' },
            { value: 'month', label: 'Месяц' },
            { value: 'year', label: 'Год' }
          ]}
        />
        {period === 'week' ? (
          <DatePicker picker="week" onChange={handleDateChange} value={selectedDate} />
        ) : period === 'month' ? (
          <DatePicker picker="month" onChange={handleDateChange} value={selectedDate} />
        ) : (
          <DatePicker picker="year" onChange={handleDateChange} value={selectedDate} />
        )}
      </ControlsWrapper>

      {chartType === 'bar' ? (
        <ExpensesBarChart data={barChartData} />
      ) : (
        <ExpensesPieChart data={pieChartData} />
      )}

      <RadioWrapper>
        <Radio.Group
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <RadioButton value="pie">
            <PieChartOutlined />
          </RadioButton>
          <RadioButton value="bar">
            <BarChartOutlined />
          </RadioButton>
        </Radio.Group>
      </RadioWrapper>

      <CategoriesWrapper>
        {pieChartData.map((item) => (
          <CategoryCard
            key={item.name}
            category={item.name}
            color={item.color}
          />
        ))}
      </CategoriesWrapper>
    </Container>
  );
}

const getColorForCategory = (category: string) => {
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #202020;
  border-radius: 20px;
  color: white;
  gap: 20px;
`
const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`
const RadioWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`
const RadioButton = styled(Radio.Button)`
  background: transparent;
  color: white;
  .ant-radio-button-checked {
    background-color: #202020;
  }
`
const PeriodSelect = styled(Select)<PeriodSelectProps>`
  width: 50%;
  .ant-select-dropdown {
    background-color: #001991;
    .ant-select-item {
      background-color: #001991;
      color: white;
      
      &:hover {
        background-color: #002aff !important;
      } 
      
      &-option-selected {
        background-color: #002aff !important;
      }
    }
  } 
`
