import React, { useEffect } from "react";
import io from 'socket.io-client';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

type RegisterType = {
  userName: string;
  password: string;
};

export const App: React.FC<{}> = () => {
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    userName: "",
    password: "",
  });

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const {
        userName,
        password
      } = registerData;

      const response = await axios.post("https://api-1-c2.onrender.com/user", {
        userName,
        password
      });

      if (response) {
        console.log("Registro exitoso");

        setRegisterData({
          userName: "",
          password: ""
        });
      } else {
        console.error("Error al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const socket = io("https://socketserver-c2.onrender.com");

    socket.on("newUser", (message) => { 
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: true,
        timer: 1500
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh"}}
        >
          <Grid item>
            <Paper sx={{ padding: "1.2em", borderRadius: "15px" }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography
                  variant="h5"
                  justifyContent="center"
                  sx={{ mt: 1, mb: 1 }}
                >
                  Registrar Cliente
                </Typography>
              </Stack>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="userName"
                  margin="normal"
                  fullWidth
                  label="Nombre"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.userName}
                />
            
                <TextField
                  name="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.password}
                />
                <Stack spacing={2} direction="row" justifyContent="end">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 2, mb: 3 }}
                  >
                    Registrar
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};
