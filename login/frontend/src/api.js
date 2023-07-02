import rutas from "./rutas";
import axios from "axios";

export const api = {
  register,
  login,
};

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// REGISTRARSE
async function register(user) {
  try {
    const response = await axios.post(rutas.nuevoUser, user);
    const userResponse = response.data;
    return Object.keys(userResponse).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// LOGIN
async function login(email, password) {
  try {
    const response = await axios.post(rutas.loginUser, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
