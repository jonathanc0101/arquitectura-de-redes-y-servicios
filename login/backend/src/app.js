import express from "express";
import userRoutes from "./routes/user.routes.js";
import comprobarToken from "./routes/comprobadorToken.js";
import cors from "cors";

const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(userRoutes);

app.use(comprobarToken); //solo se comprueba el token en las solicitudes que no sean de usuario ni de sincronizar: 
//no login, no register, etc. ya que el usuario no tendría el token en esas requests.

export default app;
