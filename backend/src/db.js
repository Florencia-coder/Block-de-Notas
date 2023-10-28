import { Sequelize } from "sequelize";
import * as pg from "pg";
import dotenv from "dotenv";

const sequelize = new Sequelize(
  "postgres://eekcprdn:rSppoemibOxXPKW9n55KEbyRZBCeB7vH@surus.db.elephantsql.com/eekcprdn",
  {
    dialectModule: pg,
    logging: false,
  }
);

export default sequelize;
