import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import error from "../../assets/img/error404.png";

const Error = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            py: 5,
            alignItems: "center",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              height: "100vh",
            }}
            maxWidth="lg"
          >
            <img src={error} alt="Error" width={500} />
            <div>
              <Typography
                variant="h1"
                component="div"
                align="center"
                fontWeight={700}
                gutterBottom
                color="black"
              >
                OPS!
              </Typography>
              <Typography
                variant="h4"
                component="div"
                align="center"
                fontWeight={700}
                gutterBottom
                color="black"
              >
                Página não encontrada
              </Typography>
              <Typography
                variant="body1"
                component="div"
                align="center"
                fontWeight={700}
                gutterBottom
                color="black"
              >
                Clique na logo da Tarkuss para retornar a navegação das páginas.
              </Typography>
            </div>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Error;

const theme = createTheme();
