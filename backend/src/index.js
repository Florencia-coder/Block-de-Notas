import app from "./app.js";
import { sequelize } from "./db.js";
import "./models/Note.js";
import "./models/Category.js";

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("Synchronize tables with database successfully");
    app.listen(`${PORT}`, () => {
      console.log(`Escuchando en el puerto ${PORT}`); // eslint-disable-line no-console
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
