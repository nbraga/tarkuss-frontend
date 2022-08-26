import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from 'axios';

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [cpf, setCpf] = useState("");



const [endereco,setEndereco] = useState({
  cep:"",
  rua:"",
  complemento:"",
  numero:"",
  cidade:"",
  bairro:"",
  uf:""
})
   const [cep, setCep] = useState('');
   const [erro, setErro] = useState("")

  /* const [rua, setRua] = useState('')
  const [complemento, setComplemento] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [uf, setUf] = useState(""); */


  
  const [gender, setGender] = useState("");
  const [civil, setCivil] = useState("");
  const [activeEmail, setActiveEmail] = useState(true);
  


  const handleActive = () => {
    if (activeEmail === true) {
      setActiveEmail(false);
    } else {
      setActiveEmail(true);
    }
  };

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

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // change image state
    setProfileImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = FormData()

    formData.append("nome", name);
    formData.append("email", email);
    formData.append("cpf", cpf);
    formData.append("gender", gender);
    formData.append("civil", civil);
    formData.append("cep", cep);
    formData.append("rua", endereco.cep);
    formData.append("complemento", endereco.complemento);
    formData.append("numero", endereco.numero);
    formData.append("cidade", endereco.cidade);
    formData.append("bairro", endereco.bairro);
    formData.append("uf", endereco.uf);

    if (previewImage) {
      formData.append("imagem", previewImage);
    }

    /* api
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setNome("")
        setDescricao("")
        setRestaurante("")
        setTag("")
        alert("Prato cadastrado com sucesso!")
      })
      .catch((error) => console.log(error)); */
    
  };
  
    useEffect(() => {
      if(cep.length === 8){
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(function (response) {
        if (response.data.erro){
          setEndereco({
            rua:"",
            complemento:"",
            numero:"",
            cidade:"",
            bairro:"",
            uf:""
          })
          return setErro("Cep inválido, digite as informações manualmente!");
        }
        setErro("")
        setEndereco({
          rua:response.data.logradouro,
          complemento:response.data.complemento,
          bairro:response.data.bairro,
          uf:response.data.uf,
          cidade:response.data.localidade
        })
      })
      .catch(function (error) {
        console.error(error);
      })
    }
    }, [cep]);
 
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
            <div>
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
                  <MenuItem value="solteiro(a)">Solteiro(a)</MenuItem>
                  <MenuItem value="casado(a)">Casado(a)</MenuItem>
               
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
                type="number"
                id="cep"
                label="CEP"
                name="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}

              />
              <TextField
                variant="standard"
                margin="normal"
                required
                id="rua"
                label="Rua"
                name="rua"
                value={endereco.rua}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                id="complemento"
                label="Complemento"
                name="complemento"
                value={endereco.complemento}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <Stack direction="row" spacing={5}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="bairro"
                  label="Bairro"
                  name="bairro"
                  value={endereco.bairro}
                  onChange={(e) => setEndereco(e.target.value)}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  required
                  id="numero"
                  label="N°"
                  name="numero"
                  value={endereco.numero}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </Stack>
              <Stack direction="row" spacing={5}>
               <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    UF
                  </InputLabel>
                  <Select
                    value={endereco.uf}
                    onChange={(e) => setEndereco(e.target.value)}
                    label="Uf"
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    <MenuItem value={"AM"}>AM</MenuItem>
                    <MenuItem value={"AC"}>AC</MenuItem>
                    <MenuItem value={"RR"}>RR</MenuItem>
                  </Select>
                </FormControl> 
                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  required
                  fullWidth
                  id="cidade"
                  label="Cidade"
                  name="cidade"
                  value={endereco.cidade}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </Stack>
            </Stack>
            
            {erro.length >= 1 && <p>{erro}</p> }
            <Stack my={5} direction="row" spacing={15}>
              <button className="button-cancel">Cancelar</button>
              <button type="submit" className="button-main">Salvar</button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
