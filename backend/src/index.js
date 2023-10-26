import app from "./app.js";
import { sequelize } from "./db.js";
import "./models/Note.js";
import "./models/Category.js";

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    console.log("Synchronize tables with database successfully");
    app.listen(2000, () => {
      console.log("Escuchando en el puerto 2000"); // eslint-disable-line no-console
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
