import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { Button, Stack } from "@mui/material";
import Message from "../../components/Message";

import bgRegister from "../../assets/img/backgrounds/bgRegister.png";
//Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../slices/authSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);
  const [confirmText, setConfirmText] = useState(false);

  const dispatch = useDispatch();
  console.log(dispatch);

  const { loading, error } = useSelector((state) => state.auth || {});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      setConfirmText(true);
    } else {
      setConfirmText(false);
      const user = {
        name,
        email,
        password: password,
        confirmPassword: confirmPassword,
      };
      dispatch(register(user));
    }
  };

  //clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main">
        <Grid
          container
          component="main"
          sx={{ py: 15, height: "100%", boxShadow: "none" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${bgRegister})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="h1" variant="h5">
                Cadastro
              </Typography>

              <Box
                component="form"
                validate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  name="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                {confirmText ? (
                  <TextField
                    error
                    helperText="Senhas não conferem, tente novamente."
                    required
                    label="Confirme sua senha"
                    margin="normal"
                    variant="standard"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={!visibleConfirmPass ? "password" : "text"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visibleConfirmPass ? (
                            <Button onClick={() => setVisibleConfirmPass(true)}>
                              <Visibility />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setVisibleConfirmPass(false)}
                            >
                              <VisibilityOff />
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <TextField
                    required
                    label="Confirme sua senha"
                    margin="normal"
                    variant="standard"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={!visibleConfirmPass ? "password" : "text"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visibleConfirmPass ? (
                            <Button onClick={() => setVisibleConfirmPass(true)}>
                              <Visibility />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setVisibleConfirmPass(false)}
                            >
                              <VisibilityOff />
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                <Stack direction="row" alignItems="center">
                  <Checkbox
                    sx={{ my: 2 }}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    color="success"
                    required
                  />

                  <span>
                    Eu li e concordo com os{" "}
                    <span style={{ color: "#4080FF" }}>Termos de uso</span> e{" "}
                    <span style={{ color: "#4080FF" }}>
                      Política de Privacidade
                    </span>
                  </span>
                </Stack>

                {loading ? (
                  <Button className="button-disabled" disabled>
                    Cadastrando...
                  </Button>
                ) : (
                  <Button type="submit" className="button-main">
                    Cadastrar
                  </Button>
                )}
              </Box>
              <Stack mt={10} spacing={5}>
                {error && <Message msg={error} type="error" />}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

const theme = createTheme();
