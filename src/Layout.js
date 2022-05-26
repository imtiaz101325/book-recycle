// components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import { Container, styled } from "@mui/material";
import Navbar from "./Navbar";

const LayoutContainer = styled(Container)`
  margin-top: 4rem;
`;

export default function Layout() {
  return (
    <LayoutContainer>
      <Navbar />
      <Outlet />
    </LayoutContainer>
  );
}
