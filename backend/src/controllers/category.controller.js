import { Category } from "../models/Category.js";
import { Note } from "../models/Note.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNotesCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id, {
      include: {
        model: Note,
        through: {
          attributes: [], // Excluye todas las columnas de la tabla inmtermedia
        },
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category does not exists." });
    }
    const notes = category.Notes;
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
