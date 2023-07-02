import app from "./app.js";

import { sequelize } from "./database/database.js";

export async function main() {
  try {
    await sequelize.sync({force: false}) //sincronización con la bd
    // await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(4000, () => {
      console.log("Server is listening on port", 4000);

    });
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}


