import { darken, rgba } from "polished";
import styled from "styled-components"

export const CategoryCard = (props: {category: string, color: string}) => {
  return (
    <Card $color={props.color}>
      <span>{props.category}</span>
    </Card>
  )
}

const Card = styled.div<{ $color: string }>`
  background-color: ${props => `${props.$color}`};
  color: ${props => rgba(darken(0.9, props.$color), 0.5)};
  border-radius: 20px;
  max-width: 35%;
  font-size: 16px;
  padding: 5px;
`
