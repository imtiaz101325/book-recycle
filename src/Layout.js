// components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import {  Container,  } from "@mui/material";

import Navbar from "./Navbar";

export default function LayoutComp() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}
