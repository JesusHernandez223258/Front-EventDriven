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
  id_venta: number;
  contenido: string;
  precio: number;
};

export const App: React.FC<{}> = () => {
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    id_venta: 0,
    contenido: "",
    precio: 0
  });

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const {
        id_venta,
        contenido,
        precio
      } = registerData;

      const response = await axios.post("https://api-eventdr.onrender.com/user",
        {
          id_venta,
          contenido,
          precio
        }
      );

      if (response) {
        console.log("Registro exitoso");

        setRegisterData({
          id_venta: 0,
          contenido: "",
          precio: 0
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
                  name="id_venta"
                  margin="normal"
                  fullWidth
                  label="Ingrese el ID de la transacción"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  type="number"
                  onChange={dataRegister}
                  value={registerData.id_venta}
                />
            
                <TextField
                  name="contenido"
                  margin="normal"
                  fullWidth
                  label="Ingrese el concepto de la transferencia"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.contenido}
                />
                <TextField
                  name="precio"
                  margin="normal"
                  fullWidth
                  label="Ingrese el monto de la transacción"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  type="number"
                  onChange={dataRegister}
                  value={registerData.precio}
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
