import { Button, Card, Form, Input, Typography } from "antd"
import { useAppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { login } from "../entities/authSlice";
import { PhoneOutlined } from "@ant-design/icons";
const { Title } = Typography;

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(login({ username: values.username }));
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <LoginContainer>
      <FormCard>
        <Title level={3} style={{ textAlign: 'center', color: 'white' }}>
          Введите <br /> по номеру телефона
        </Title>
        <SubTitle>
          Чтобы войти или стать клиентом <br /> Совкомбанка
        </SubTitle>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Введите номер телефона!' }]}
          >
            <Input 
              variant="underlined"
              placeholder="Номер телефона"
              prefix={<PhoneOutlined />}
              style={{backgroundColor: 'transparent', color: 'white'}}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Войти
            </Button>
          </Form.Item>
        </Form>
        <div>
          Войдите по <span style={{color: '#003791', cursor: 'pointer'}}>номеру карты</span>
        </div>
      </FormCard>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: white;
  background-image: url('/bg.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 16px;
`
const FormCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgba(25, 25, 25, 0.8);
  border-radius: 40px;
  color: white;
  div {
    text-align: center;
  }
`
const SubTitle = styled.div`
  text-align: center;
  color: #C7C7C7;
`