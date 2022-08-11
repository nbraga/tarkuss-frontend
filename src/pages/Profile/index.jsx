import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Button, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import iconProfile from "../../assets/img/icons/editProfile.png";

import InputMask from "react-input-mask";

import "./profile.css";

import { uploads } from "../../utils/config";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { profile } from "../../slices/userSlice";

// components

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  console.log(user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [cpf, setCpf] = useState("");

  const [activeEmail, setActiveEmail] = useState(true);

  const [gender, setGender] = useState("");
  const [civil, setCivil] = useState("");
  const [uf, setUf] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleActive = () => {
    if (activeEmail === true) {
      setActiveEmail(false);
    } else {
      setActiveEmail(true);
    }
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // change image state
    setProfileImage(image);
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography
        margin="30px 0 30px 10%"
        component="h1"
        variant="h5"
        fontWeight={900}
        letterSpacing={2}
      >
        Olá, termine de preencher seu perfil.
      </Typography>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            my: 8,
            display: "flex",
            padding: 5,
            background: "#E5E5E5",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mr: 2,
              maxWidth: "100em",
            }}
          >
            <div id="edit-profile">
              <Stack spacing={2}>
                {user.profileImage || previewImage ? (
                  <img
                    className="profile-image"
                    src={
                      previewImage
                        ? URL.createObjectURL(previewImage)
                        : `${uploads}/users/${user.profileImage}`
                    }
                    alt={user.name}
                  />
                ) : (
                  <img src={iconProfile} alt="iconProfile" width="100%" />
                )}
                <Button
                  className="button-main"
                  variant="contained"
                  component="label"
                >
                  Alterar Foto
                  <input onChange={handleFile} hidden type="file" />
                </Button>
              </Stack>
            </div>
          </Box>

          <Box noValidate sx={{ maxWidth: "300em" }}>
            <Typography component="h1" variant="h5">
              Seus dados pessoais
            </Typography>

            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
              autoFocus
            />
            <Stack
              position="relative"
              alignItems="center"
              direction="row"
              spacing={1}
            >
              {activeEmail ? (
                <TextField
                  variant="filled"
                  margin="normal"
                  disabled
                  value={email || ""}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              ) : (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              )}
              <Button
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  left: { xs: "70%", md: "100%" },
                  border: "2px solid #2ADB86",
                  p: 1,
                  borderRadius: "50%",
                }}
                onClick={handleActive}
              >
                <ModeEditOutlineSharpIcon
                  fontSize="small"
                  sx={{ color: "#2ADB86" }}
                />
              </Button>
            </Stack>

            <Stack direction="row" spacing={5}>
              <FormControl variant="standard" fullWidth sx={{ width: "50%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Gênero
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gênero"
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value="masculino">Masculino</MenuItem>
                  <MenuItem value="feminina">Feminina</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ width: "50%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Estado Civil
                </InputLabel>
                <Select
                  value={civil}
                  onChange={(e) => setCivil(e.target.value)}
                  label="Civil"
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value={10}>Solteiro(a)</MenuItem>
                  <MenuItem value={20}>Casado(a)</MenuItem>
                  <MenuItem value={30}>Divorciodado(a)</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack mt={2} direction="row" spacing={5}>
              <TextField
                InputLabelProps={{ shrink: true }}
                variant="standard"
                fullWidth
                required
                type="date"
                id="dataNascimento"
                label="Data de nascimento"
                name="dataNascimento"
              />
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                maskChar="_"
              >
                {() => (
                  <TextField
                    variant="standard"
                    fullWidth
                    required
                    id="cpf"
                    label="CPF"
                    name="cpf"
                  />
                )}
              </InputMask>
            </Stack>

            <Typography my={4} component="h1" variant="h5">
              Endereço
            </Typography>
            <Stack spacing={1}>
              <TextField
                variant="standard"
                margin="normal"
                required
                id="cep"
                label="CEP"
                name="cep"
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                id="endereco"
                label="Endereço"
                name="endereco"
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                id="complemento"
                label="Complemento"
                name="complemento"
              />
              <Stack direction="row" spacing={5}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="bairro"
                  label="Bairro"
                  name="bairro"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  required
                  id="numero"
                  label="N°"
                  name="numero"
                />
              </Stack>
              <Stack direction="row" spacing={5}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    UF
                  </InputLabel>
                  <Select
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                    label="Uf"
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    <MenuItem value={10}>AM</MenuItem>
                    <MenuItem value={20}>AC</MenuItem>
                    <MenuItem value={30}>RR</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="cidade"
                  label="Cidade"
                  name="cidade"
                  autoComplete="email"
                />
              </Stack>
            </Stack>
            <Stack my={5} direction="row" spacing={15}>
              <button className="button-cancel">Cancelar</button>
              <button className="button-main">Salvar</button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
