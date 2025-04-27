import { CreditCardOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/store";
import { Badge, Spin } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Category, fetchRecommendations } from "../entities/recommendationsSlice";

//TO-DO убрать моковые данные
const recommendationss: Category[] = [
  {
    name: "Продукты",
    recs: [
      {
        seller: "Магазин А",
        cashback: 5.0,
        category: "Продукты",
      },
      {
        seller: "Супермаркет Б",
        cashback: 3.5,
        category: "Продукты",
      },
    ],
  },
  {
    name: "Одежда",
    recs: [
      {
        seller: "Магазин В",
        cashback: 10.0,
        category: "Одежда",
      },
    ],
  },
  {
    name: "Такси",
    recs: [
      {
        seller: "Яндекс Такси",
        cashback: 7.0,
        category: "Такси",
      },
      {
        seller: "Uber",
        cashback: 6.5,
        category: "Такси",
      },
    ],
  },
];

export const Advertising = () => {
  const dispatch = useAppDispatch();
  const { recommendations, loading, error } = useAppSelector((state) => state.recommendations);

  useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  if (loading) return <Recommendation style={{justifyContent: 'center'}}><Spin /></Recommendation>;

  if (error) return <Recommendation>Упс... возникла ошибка: {error}</Recommendation>;

  return (
    <Recommendation>
      {recommendationss!.map((item) => (
        <Box key={item.name}>
          <StyledBadge
            count={item.recs.reduce((max, rec) => Math.max(max, rec.cashback), 0)}
            showZero
          >
            <CreditCardOutlined />
            <CategoryName>{item.name}</CategoryName>
          </StyledBadge>
        </Box>
      ))}
      <Link to={`/recommendations`}>
        <ArrowRightOutlined />
      </Link>
    </Recommendation>
  );
};

const Recommendation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  background-color: #202020;
  border-radius: 20px;
  padding: 10px 30px;
  max-height: 10vh;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 8px;
`;

const StyledBadge = styled(Badge)`
  .ant-badge-count {
    background-color: #001991;
    color: white;
  }
  .anticon {
    color: white;
    font-size: 20px;
    margin-right: 8px;
  }
`;

const CategoryName = styled.div`
  color: white;
  font-size: 14px;
`;

