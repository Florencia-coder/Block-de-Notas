import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Category } from "./Category.js";

export const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Note.belongsToMany(Category, { through: "NoteCategory" });
Category.belongsToMany(Note, { through: "NoteCategory" });
