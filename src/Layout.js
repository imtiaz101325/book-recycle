// components/Layout.js
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuthenticator, Button, Heading, View } from "@aws-amplify/ui-react";
import { Layout, Typography, Menu } from "antd";
import styled from "styled-components";

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Container = styled(Layout)`
  min-height: 100vh;
`;

const HeaderContainer = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Title)`
  && {
    color: #fff;
    margin: 0;
    display: span;
  }
`;

const MenuContainer = styled.div`
  min-width: 25vw;
`;

const FooterContainer = styled(Footer)`
  display: flex;
  justify-content: center;
`;

const defaultMenuItems = [
  {
    key: "",
    label: "Home",
  },
  {
    key: "profile",
    label: "Profile",
  },
];

export default function LayoutComp() {
  const [menuItems, setMenuItems] = useState(defaultMenuItems);

  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (route === "authenticated") {
      setMenuItems([
        ...defaultMenuItems,
        {
          key: "logout",
          label: "Log Out",
        },
      ]);
    } else {
      setMenuItems([
        ...defaultMenuItems,
        {
          key: "login",
          label: "Log In",
        },
      ]);
    }
  }, [route]);

  function logOut() {
    signOut();
    navigate("/");
  }

  function handleMenuClick(e) {
    if (e.key === "logout") {
      logOut();
      return
    }

    navigate(e.key);
  }

  return (
    <Container>
      <HeaderContainer>
        <Link to="/">
          <Logo>Book Recycle</Logo>
        </Link>
        <MenuContainer>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            onClick={handleMenuClick}
            items={menuItems}
          />
        </MenuContainer>
      </HeaderContainer>
      <Content>
        <Outlet />
      </Content>
      <FooterContainer>
        <Text>Built by Ahad</Text>
      </FooterContainer>
    </Container>
  );
}
