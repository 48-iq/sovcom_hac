import { ReactNode, useState } from 'react';
import { Layout, Drawer, Button, Menu, Typography } from 'antd';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../entities/authSlice';
import { MenuOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout
const { Title } = Typography

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <MobileLayoutContainer>
      <MobileHeader>
        <BurgerMenu />
        <Title level={3}>
          Статистика
        </Title>
      </MobileHeader>
      <MobileContent>{children}</MobileContent>
      <MobileFooter>©2025 dev inside</MobileFooter>
    </MobileLayoutContainer>
  );
};

function BurgerMenu () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const items = isAuthenticated ? 
    [
      { key: '/', label: 'Главная', onClick: () => handleMenuClick('/') },
      { key: '/recommendations', label: 'Рекомендации', onClick: () => handleMenuClick('/recommendations') },
      { key: 'logout', label: 'Выйти', onClick: () => handleMenuClick('logout') },
    ] : [
      { key: '/login', label: 'Войти', onClick: () => handleMenuClick('/login') },
      { key: '/registration', label: 'Регистрация', onClick: () => handleMenuClick('/registration') },
    ]

  const handleMenuClick = (key: string) => {
    closeDrawer();
    if (key === 'logout') {
      dispatch(logout());
      navigate('/login');
    } else {
      navigate(key);
    }
  };

  return (
    <>
      <Button icon={<MenuOutlined />} onClick={showDrawer} />
      <StyledDrawer
        title="Меню"
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </StyledDrawer>
    </>
  )
}

const MobileLayoutContainer = styled(Layout)`
  min-height: 100vh;
`
const MobileHeader = styled(Header)`
  display: flex;
  align-items: center;
  gap: 8%;
  padding: 0 16px;
  position: fixed;
  width: 100%;
  z-index: 1000;
`
const MobileContent = styled(Content)`
  margin-top: 64px;
  padding: 16px;
`
const MobileFooter = styled(Footer)`
  text-align: center;
  padding: 10px 16px;
`
const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`
