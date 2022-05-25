import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Logo = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  useEffect(() => {
    if (route === "authenticated") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [route]);

  function handleLoginButtonClick() {
    navigate("/login");
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleProfile() {
    handleClose();
    navigate("/profile");
  }

  function handleLogout() {
    handleClose();
    signOut();
  }

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4">
          <Logo to="/">Book Recycle</Logo>
        </Typography>

        <Box>
          {loggedIn ? (
            <>
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginButtonClick}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
