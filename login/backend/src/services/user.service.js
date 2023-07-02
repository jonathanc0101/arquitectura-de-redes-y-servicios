import { sesionActivaService } from "./sesionActiva.service.js";
import bcrypt from "bcrypt";
import { sequelize } from "../database/database.js";
import { User } from "../models/User.js";
import { QueryTypes } from "sequelize";

export const userService = {
  login,
  register,
};

async function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
}

async function validPassword(password, hash) {
  console.log(password)
  console.log(hash)
  return bcrypt.compare(password, hash);
}

async function login(email, password) {
  let token = "";

  try {
    const userEncontrado = await User.findOne({
      where: {
        email,
      },
    });

    if (!userEncontrado.email) {
      return {};
    }

    const passwordIsValid = await validPassword(
      password,
      userEncontrado.password
    );

    if (passwordIsValid) {
      token = await sesionActivaService.nueva(userEncontrado);
    }

    if (!token) {
      return {};
    } else {
      const userARetornar = quitarPassword(userEncontrado);

      return { token, user: userARetornar };
    }
  } catch (error) {
    console.log("No se pudo logear usuario, error: " + error);
    return {};
  }
}

function quitarPassword(user) {
  let userfiltrado = { ...user.dataValues };
  delete userfiltrado.password;

  return userfiltrado;
}

async function register(user) {
  try {
    const hash = await generateHash(user.password);
    const newUser = { ...user, password: hash };

    // esto deberia ser una TRANSACCION
    let responseUser = {};

    await sequelize.transaction(async (t) => {
      responseUser = await User.create(newUser, {
        transaction: t,
      });
    });

    //no le enviamos el hash al usuario para que no pueda bruteforcearlo
    responseUser = quitarPassword(responseUser);

    return responseUser;
  } catch (error) {
    console.log(error);
    return {};
  }
}
