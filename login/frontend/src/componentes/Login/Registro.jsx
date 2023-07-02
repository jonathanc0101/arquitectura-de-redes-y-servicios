import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  import { api } from "../../api";
  import { alertas } from "../alertas";
  import { Navigate } from "react-router-dom";
  import BotonVolver from "../botones/BotonVolver";
  import "dayjs/locale/es";
  
  function Registro() {
    const [registrado, setRegistrado] = useState(false);
    const [passwordAVerificar, setPasswordAVerificar] = useState("");
  
    const verificarPassword = (password) => password === user.password;
  
    const isEmail = (email) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  
    const [user, setUser] = useState({
      email: "",
      password: "",
    });
  
    const guardar = async function () {
      if (
        user.email.length === 0 ||
        user.password.length === 0 ||
        passwordAVerificar.length === 0
      ) {
        alertas.alertaCamposObligatorios();
        return;
      } else if (!isEmail(user.email)) {
        alertas.alertaEmailInvalido();
        return;
      } else if (user.password.length < 4) {
        alertas.passwordMinimaInvalida();
        return;
      } else if (!verificarPassword(passwordAVerificar)) {
        alertas.contraseñasDiferentes();
        return;
      } else {
        const userGuardado = await api.register(user);
        if (userGuardado) {
          alertas.alertaExito("Usuario");
          setRegistrado(true);
        } else {
          alertas.alertaProblemas();
          return;
        }
      }
    };
  
    const handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;
  
      setUser((estadoAnterior) => {
        return { ...estadoAnterior, [name]: value };
      });
    };
  
    const handleChangeVerificar = (event) => {
      let value = event.target.value;
  
      setPasswordAVerificar(value);
    };
  
  
    return (
      <>
        <Typography
          component="h6"
          variant="h6"
          style={{
            backgroundColor: "#4D4C4C",
            color: "white",
            textAlign: "left",
            fontWeight: "bold",
            lineHeight: "2",
          }}
        >
          &nbsp;&nbsp;&nbsp;Registrarse
        </Typography>
        <Card>
          <CardContent>              
            <Grid container direction="row" spacing={2}>
              {/* CORREO ELECTRÓNICO */}
              <Grid item xs={4} sm={12}>
                <TextField
                  label="Correo electrónico"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  size="small"
                ></TextField>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={2} sm={6}>
                <TextField
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  size="small"
                ></TextField>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={2} sm={6}>
                <TextField
                  label="Vuelva a escribir la contraseña"
                  type="password"
                  name="contraseñaVerificada"
                  value={passwordAVerificar}
                  onChange={handleChangeVerificar}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  size="small"
                ></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4} sm={4}>
                <BotonVolver></BotonVolver>
              </Grid>
              {/* BOTÓN REGISTRARSE */}
              <Grid item xs={4} sm={8}>
                <Box textAlign="right">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={guardar}
                    style={{ fontWeight: "bold" }}
                  >
                    REGISTRARSE
                  </Button>
                </Box>
                {registrado ? <Navigate to={"/"}></Navigate> : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  }
  
  export default Registro;
  