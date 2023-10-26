import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres", // Usa 'postgres' como dialecto para PostgreSQL
  }
);

// const sequelize = new Sequelize(
//   "postgres://postgres:1234@localhost:5432/my_db"
// );

export { sequelize };
