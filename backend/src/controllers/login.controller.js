import { Login, User } from "../models/index.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: "No existe una cuenta creada con ese usuario" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Contraseña o usuario invalido." });
    }

    // Verificar si el login ya existe
    const existingLogin = await Login.findOne({
      where: { username, password }
    });

    if (!existingLogin) {
      // Crear el login solo si no existe
      await Login.create({ username, password });
    }

    const token = jwt.sign(
      { id: user.id, username: user.email },
      process.env.SECRET,
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      username,
      name: user.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al iniciar sesión", details: error.message });
  }
};

export const getLogin = async (req, res) => {
  try {
    const accounts = await Login.findAll();
    res.json(accounts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
