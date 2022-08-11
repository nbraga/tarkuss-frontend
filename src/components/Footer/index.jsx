import * as React from "react";
import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import logo from "../../assets/img/logotipos/logoFooter.png";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Item = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  boxShadow: "none",
  background: "none",
});

function Copyright() {
  return (
    <Typography variant="body2" color="#fff">
      {"Tarkuss Inc All rights reserved"}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#182436",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            alignItems: { xs: "center" },
            justifyContent: { xs: "center" },
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16} md={3} lg={3}>
              <Item>
                <Stack spacing={1}>
                  <img src={logo} alt="Logo" width={150} />
                  <Stack direction="row">
                    <Link
                      target="_blank"
                      href="https://www.facebook.com/tarkussbrasil/"
                    >
                      <FaFacebook size={20} color="white" />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://www.facebook.com/tarkussbrasil/"
                    >
                      <FaTwitter size={20} color="white" />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://www.instagram.com/tarkussbrasil/"
                    >
                      <FaInstagram size={20} color="white" />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://www.linkedin.com/company/tarkussbrasil/"
                    >
                      <FaLinkedin size={20} color="white" />
                    </Link>
                  </Stack>
                  <Copyright />
                </Stack>
              </Item>
            </Grid>
            <Grid item xs={16} md={3} lg={3}>
              <Item>
                <Typography variant="body1" fontWeight={500} color="#fff">
                  EMPRESA
                </Typography>
                <Link
                  underline="none"
                  color="default"
                  target="_blank"
                  href="https://tarkuss.com.br/tarkuss"
                >
                  Quem somos?
                </Link>
              </Item>
            </Grid>
            <Grid item xs={16} md={4} lg={4}>
              <Item>
                <Typography variant="body1" fontWeight={500} color="#fff">
                  ENTRE EM CONTATO CONOSCO
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FaEnvelope color="white" />
                    <a
                      style={{ textTransform: "lowercase" }}
                      href="mailto:comercial@tarkuss.com.br"
                    >
                      comercial@tarkuss.com.br
                    </a>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FaPhoneAlt color="white" />
                    <Typography variant="body2" color="white">
                      (92) 3342-3738
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FaWhatsapp color="white" />
                    <Typography variant="body2" color="white">
                      (92) 99123-6045
                    </Typography>
                  </Stack>
                </Stack>
              </Item>
            </Grid>
            <Grid item xs={16} md={3} lg={3}>
              <Item>
                <Typography variant="body1" fontWeight={500} color="#fff">
                  MANAUS
                </Typography>
                <Typography variant="body2" color="#fff">
                  Av. A, 9 - Adrianópolis, Manaus - AM, 69057-004
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={16} md={3} lg={3}>
              <Item>
                <Typography variant="body2" fontWeight={500} color="#fff">
                  GOIANIA
                </Typography>
                <Typography variant="body2" color="#fff">
                  Em breve
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
