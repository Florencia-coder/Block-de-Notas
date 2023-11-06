import { User } from "../models/index.js";
import * as bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res
      .status(201)
      .json({ username: savedUser.username, name: savedUser.name });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "No se pudo crear el usuario", error });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.findAll({});
  res.json(users);
};
