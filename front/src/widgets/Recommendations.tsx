import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect } from "react";
import { Category, fetchRecommendations } from "../entities/recommendationsSlice";
import { Typography, Badge, Card, Row, Col } from "antd";
import styled from "styled-components";
import PharmacyBeauty from "/PharmacyBeauty.png";
import delivery  from "/delivery.png";
import entertainment from "/entertainment.png";
import gasStation from "/gasStation.png";
import { darken, rgba } from "polished";
const { Title } = Typography;

const colorMap: Record<string, string> = {
  "Доставка": "#FAA2A2",
  "Продукты": "#A4FAA2",
  "Красота и аптеки": "#A2FAFA",
  "Заправки": "#6362a9",
};

const backgroundMap: Record<string, string> = {
  "Доставка": delivery,
  "Продукты": entertainment,
  "Красота и аптеки": PharmacyBeauty,
  "Заправки": gasStation,
};

export const Recommendations = () => {
  const dispatch = useAppDispatch();
  const { recommendations, loading, error } = useAppSelector((state) => state.recommendations);

  useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  const recommendationss: Category[] = [
    {
      name: "Доставка",
      recs: [
        { seller: "Delivery Club", cashback: 5.0, category: "Доставка" },
        { seller: "Яндекс Еда", cashback: 4.5, category: "Доставка" },
      ],
    },
    {
      name: "Продукты",
      recs: [
        { seller: "Магазин А", cashback: 5.0, category: "Продукты" },
        { seller: "Супермаркет Б", cashback: 3.5, category: "Продукты" },
      ],
    },
    {
      name: "Красота и аптеки",
      recs: [
        { seller: "Аптека 36.6", cashback: 6.0, category: "Красота и аптеки" },
        { seller: "Рив Гош", cashback: 8.5, category: "Красота и аптеки" },
      ],
    },
    {
      name: "Заправки",
      recs: [
        { seller: "Лукойл", cashback: 7.5, category: "Заправки" },
        { seller: "Газпромнефть", cashback: 6.0, category: "Заправки" },
      ],
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Title level={3}>Рекомендации для вас</Title>
      {recommendationss && recommendationss.length > 0 ? (
        recommendationss.map((category) => (
          <CategoryWrapper
            key={category.name}
            $background={backgroundMap[category.name] || ""}
            $bgColor={colorMap[category.name] || "#f0f0f0"}
          >
            <Title level={4} style={{ color: "#fff", textShadow: "0 0 5px rgba(0,0,0,0.5)" }}>
              {category.name}
            </Title>
            <Row gutter={[16, 16]}>
              {category.recs.map((rec, index) => {
                const color = colorMap[rec.category] || "#ccc";
                return (
                  <Col key={index} xs={24} sm={12} md={8} lg={6}>
                    <Badge.Ribbon text={`${rec.cashback}%`} color="#ff4d4f">
                      <PartnersCard $bgColor={color}>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 600,
                            marginBottom: 8,
                          }}
                        >
                          {rec.seller}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                          }}
                        >
                          {rec.category}
                        </div>
                      </PartnersCard>
                    </Badge.Ribbon>
                  </Col>
                );
              })}
            </Row>
          </CategoryWrapper>
        ))
      ) : (
        <p>Нет доступных рекомендаций.</p>
      )}
    </div>
  );
};

const CategoryWrapper = styled.div<{ $background: string; $bgColor: string }>`
  background-image: 
    url(${(props) => props.$background});
  background-color: ${(props) => rgba(darken(0.5, props.$bgColor), 0.5)};
  background-size: cover; 
  background-position: center;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 32px;
`
const PartnersCard = styled(Card)<{ $bgColor: string }>`
  display: "flex";
  flex-direction: "column";
  justify-content: "center";
  align-items: "center";
  background-color: ${props => props.$bgColor};
  color: ${(props) => rgba(darken(0.6, props.$bgColor), 0.9)};
  border-radius: 20px;
  height: 120;
  opacity: 0.95;
`