const puertoServidorBackend = 4000;

const rutas = {
  nuevoUser: "register",
  loginUser: "login",
};

for (let ruta in rutas) {
  rutas[ruta] = "http://localhost:" + puertoServidorBackend + "/" + rutas[ruta];
}

export default rutas;
