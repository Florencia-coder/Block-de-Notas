import { Sequelize } from "sequelize";

// const sequelize = new Sequelize("my_db", "express", "express", {
//   host: "localhost",
//   dialect: "postgres", // Usa 'postgres' como dialecto para PostgreSQL
// });
const sequelize = new Sequelize(
  `postgres://express:express@localhost:5432/my_db`
);
export { sequelize };
