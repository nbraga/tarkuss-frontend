import MenuIcon from "@mui/icons-material/Menu";
import { Link as LinkReact } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { Button, Stack } from "@mui/material";

import logo from "../../assets/img/logotipos/logoHeader.png";

//Hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
//Redux
import { logout, reset } from "../../slices/authSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ResponsiveAppBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar sx={{ background: "#182436" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </Typography>
            {/* MOBILE */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {auth ? (
                 
                    <Stack>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <LinkReact
                          href="https://tarkuss.com.br/tarkuss"
                          target="_blank"
                          rel="noreferrer"
                          underline="none"
                          color="white"
                        >
                          Sobre
                        </LinkReact>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <LinkReact
                          href="https://tarkuss.com.br/contact"
                          target="_blank"
                          rel="noreferrer"
                          underline="none"
                          color="white"
                        >
                          Contato
                        </LinkReact>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Button className="button-link" onClick={handleLogout}>
                          Sair
                        </Button>
                      </MenuItem>
                    </Stack>
                 
                ) : (
                  
                    <Stack>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <LinkReact
                          href="https://tarkuss.com.br/tarkuss"
                          target="_blank"
                          rel="noreferrer"
                          underline="none"
                          color="white"
                        >
                          Sobre
                        </LinkReact>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <LinkReact
                          href="https://tarkuss.com.br/contact"
                          target="_blank"
                          rel="noreferrer"
                          underline="none"
                          color="white"
                        >
                          Contato
                        </LinkReact>
                      </MenuItem>
                    </Stack>
                 
                )}
              </Menu>
            </Box>
            {/* MOBILE */}

            {/* WEB */}
            <Typography
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              <Link to="/">
                <img id="logotipo" src={logo} alt="Logo" />
              </Link>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {auth ? (
                <>
                  <Stack direction="row" spacing={4}>
                    <LinkReact
                      href="https://tarkuss.com.br/tarkuss"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                      color="white"
                    >
                      Sobre
                    </LinkReact>
                    <LinkReact
                      href="https://tarkuss.com.br/contact"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                      color="white"
                    >
                      Contato
                    </LinkReact>
                    <Button className="button-link" onClick={handleLogout}>
                      Sair
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Stack direction="row" spacing={4}>
                    <LinkReact
                      href="https://tarkuss.com.br/tarkuss"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                      color="white"
                    >
                      Sobre
                    </LinkReact>
                    <LinkReact
                      href="https://tarkuss.com.br/contact"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                      color="white"
                    >
                      Contato
                    </LinkReact>
                  </Stack>
                </>
              )}
            </Box>
            {/* WEB */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
