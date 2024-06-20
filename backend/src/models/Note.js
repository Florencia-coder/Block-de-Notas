import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { Category, User } from "./index.js";

export const Note = sequelize.define(
  "Note",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }
);

Note.belongsTo(Category, { foreignKey: "categoryId", allowNull: true });
Category.hasMany(Note, { foreignKey: "categoryId" });
User.hasMany(Note, { foreignKey: "userId" });
User.hasMany(Category, { foreignKey: "userId" });
Category.belongsTo(User, { foreignKey: "userId" });
