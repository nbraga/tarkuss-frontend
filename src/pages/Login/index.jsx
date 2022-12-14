import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Message from '../../components/Message'

import bgLogin from "../../assets/img/backgrounds/bgLogin.png";

import { Link as LinkDom } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "50%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            background: "#E5E5E5",
          }}
        >
          <img src={bgLogin} alt="Imagem Login" width="80%" />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", md: "50%" },
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f5f5",
          }}
        >
          <Grid item xs={12} sm={8} md={8} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>

              <Box component="form" validate onSubmit={handleSubmit}>
                {error === "Insira um e-mail v??lido" ? (
                  <TextField
                    error
                    helperText="Insira um e-mail v??lido"
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                )}

                {error === "Senha inv??lida!" ? (
                  <TextField
                    error
                    helperText="Senha incorreta, verifique e tente novamente."
                    margin="normal"
                    label="Senha"
                    variant="standard"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={!visiblePass ? "password" : "text"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visiblePass ? (
                            <Button onClick={() => setVisiblePass(true)}>
                              <Visibility />
                            </Button>
                          ) : (
                            <Button onClick={() => setVisiblePass(false)}>
                              <VisibilityOff />
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <TextField
                    margin="normal"
                    label="Senha"
                    variant="standard"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={!visiblePass ? "password" : "text"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visiblePass ? (
                            <Button onClick={() => setVisiblePass(true)}>
                              <Visibility />
                            </Button>
                          ) : (
                            <Button onClick={() => setVisiblePass(false)}>
                              <VisibilityOff />
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                <FormControlLabel
                  sx={{ mt: 2, width: "100%" }}
                  control={<Checkbox value="remember" color="success" />}
                  label="Mantenha-me conectado"
                />
                {loading ? (
                  <Button className="button-disabled" disabled>
                    Aguarde...
                  </Button>
                ) : (
                  <Button type="submit" className="button-main">
                    Entrar
                  </Button>
                )}
                {error && <Message msg={error} type="error"/>}
                <Stack spacing={5} alignItems="center">
                  <Grid mt={5} item>
                    <Link
                      underline="none"
                      href="#"
                      variant="body2"
                      color="#0EC582"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </Grid>

                  <Grid
                    sx={{ width: "100%", borderTop: "1px solid #EAEAEA" }}
                    item
                  >
                    <Typography variant="body1" align="center">
                      Ainda n??o possui uma conta?
                    </Typography>
                  </Grid>
                  <LinkDom to="/register">
                    <button className="button-empty">
                      Cadastre-se gr??tis!
                    </button>
                  </LinkDom>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
