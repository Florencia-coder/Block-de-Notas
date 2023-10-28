import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();
const environment = process.env.NODE_ENV;

const dbConfig = {
  development: {
    DB_NAME: process.env.DB_NAME_DEV,
    DB_USER: process.env.DB_USER_DEV,
    DB_PASSWORD: process.env.DB_PASSWORD_DEV,
    DB_HOST: process.env.DB_HOST_DEV,
    DB_PORT: process.env.DB_PORT_DEV,
  },
  production: {
    DB_NAME: process.env.DB_NAME_PROD,
    DB_USER: process.env.DB_USER_PROD,
    DB_PASSWORD: process.env.DB_PASSWORD_PROD,
    DB_HOST: process.env.DB_HOST_PROD,
    DB_PORT: process.env.DB_PORT_PROD,
  },
};

const dbVars = dbConfig[environment];

const sequelize = new Sequelize(
  dbVars.DB_NAME,
  dbVars.DB_USER,
  dbVars.DB_PASSWORD,
  {
    host: dbVars.DB_HOST,
    port: dbVars.DB_PORT,
    dialect: "postgres",
  }
);

export { sequelize };
