import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import iconProfile from "../../assets/img/icons/editProfile.png";
import Message from '../../components/Message';
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
import { uploads } from "../../utils/config";

const theme = createTheme();

const Profile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [endereco,setEndereco] = useState({
    "rua":"",
    "complemento":"",
    "bairro":"",
    "cidade":"",
    "uf":""
  })
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [erro, setErro] = useState("")
  const [activeEmail, setActiveEmail] = useState(true);

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCpf(user.cpf);
      setGenero(user.genero);
      setEstadoCivil(user.estadoCivil);
      setDataNascimento(user.dataNascimento);
    }
  }, [user]);
  
  //api de cep
  useEffect(() => {
    if(cep?.length === 8){
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(function (response) {
      if (response.data.erro){
        setEndereco({
          "rua":"",
          "complemento":"",
          "cidade":"",
          "bairro":"",
          "uf":""
        })
        return setErro("Cep inválido, digite as informações manualmente!");
      }
      setErro("")
      setEndereco({
        "rua":response.data.logradouro,
        "complemento":response.data.complemento,
        "bairro":response.data.bairro,
        "cidade":response.data.localidade,
        "uf":response.data.uf
      })
    })
    .catch(function (error) {
      console.error(error);
    })
  }
  }, [cep]);

  //enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enderecoData = {cep, numero, ...endereco};

    await axios.post('http://localhost:5000/api/adress/register', enderecoData)
    .then(function (response) {
      alert(response.data.message)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
    
    // Gather user data from states
    const userData = {
      name,
      cpf,
      genero,
      estadoCivil,
      dataNascimento,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (cpf){
      userData.cpf = cpf
    }

    if(genero){
      userData.genero = genero;
    }

    if (estadoCivil) {
      userData.estadoCivil = estadoCivil;
    }

    if (dataNascimento) {
      userData.dataNascimento = dataNascimento;
    }

    // build form data
    const formData = new FormData()

    Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    ); 

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  //enviar foto
  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // change image state
    setProfileImage(image);
  };

  //ativar caixa de email
  const handleActive = () => {
    if (activeEmail === true) {
      setActiveEmail(false);
    } else {
      setActiveEmail(true);
    }
  };

  //formatar data
  const attDate = (e) => {
    setDataNascimento(e.target.value)
    /* const dataAtualizada = e.target.value.split('-').reverse().join('/')
    setDataNascimentoAtt(dataAtualizada) */
  }

  //OnChange endereço
  const submitEndereco = (e) => {
    if (e.target.getAttribute('name') === "rua"){
      setEndereco({ 
        "rua":endereco.rua,
        "complemento":endereco.complemento,
        "bairro":endereco.bairro,
        "cidade":endereco.cidade,
        "uf":endereco.uf
      })
    }
  }

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
              width: "200px",
             
            }}
          >
              <Stack spacing={2}>
                {user.profileImage || previewImage ? (
                  <img
                  className="profile-img"
                    src={
                      previewImage
                        ? URL.createObjectURL(previewImage)
                        : `${uploads}/users/${user.profileImage}`
                    }
                    alt={user.name}
                  />
                ) : (
                  <img src={iconProfile} alt="iconProfile" />
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
                  value={genero || ""}
                  name="genero"
                  onChange={(e) => setGenero(e.target.value)}
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
                  value={estadoCivil || ""}
                  onChange={(e) => setEstadoCivil(e.target.value)}
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
                value={dataNascimento || ""}
                onChange={attDate}
              />
              <InputMask
                mask="999.999.999-99"
                value={cpf || ""}
                onChange={(e) => setCpf(e.target.value.replace( /\D/g , ""))}
              >
                {() => (
                  <TextField
                    InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
                variant="standard"
                margin="normal"
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
                id="rua"
                label="Rua"
                name="rua"
                value={endereco.rua || ""}
                onChange={(e) => submitEndereco(e)}
              />
              <TextField
                variant="standard"
                margin="normal"
                id="complemento"
                label="Complemento"
                name="complemento"
                value={endereco.complemento || ""}
                onChange={(e) => submitEndereco(e)}
              />
              <Stack direction="row" spacing={5}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="bairro"
                  label="Bairro"
                  name="bairro"
                  value={endereco.bairro || ""}
                  onChange={(e) => submitEndereco(e)}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="numero"
                  label="N°"
                  name="numero"
                  required
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Stack>
              <Stack direction="row" spacing={5}>
               <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    UF
                  </InputLabel>
                  <Select
                    label="Uf"
                    value={endereco.uf || ""}
                    onChange={(e) => submitEndereco(e)}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="AC">AC</MenuItem>
                    <MenuItem value="RR">RR</MenuItem>
                  </Select>
              
                </FormControl> 
                <TextField
                  InputLabelProps={{ shrink: true }} 
                  variant="standard"
                  fullWidth
                  id="cidade"
                  label="Cidade"
                  name="cidade"
                  value={endereco.cidade || ""}
                  onChange={(e) => submitEndereco(e)}
                /> 
              </Stack>
            </Stack>
            
            {erro.length >= 1 && <p>{erro}</p> }
            <Stack my={5} direction="row" spacing={15}>
              <Button className="button-cancel">Cancelar</Button>
              {loading ? (
                  <Button className="button-disabled" disabled>
                    Atualizando...
                  </Button>
                ) : (
                  <Button type="submit" className="button-main">
                    Atualizar
                  </Button>
                )}
               
            </Stack>
            {error && <Message msg={error} type="error"/>}
                {message && <Message msg={message} type="success" />}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
  
};

export default Profile;