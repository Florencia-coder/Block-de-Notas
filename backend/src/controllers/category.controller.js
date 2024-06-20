import { Category, Note } from "../models/index.js";

export const getCategories = async (req, res) => {
  try {
    const userId = req.userId;

    const categories = await Category.findAll({
      where: {
        userId,
      },
    });

    res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  const categoryId = req.params.id; // Obtener el ID de los parámetros de la solicitud

  try {
    const category = await Category.findByPk(categoryId); // Buscar la categoría por su ID

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(category); // Devolver la categoría encontrada
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoryNotesByUserId = async (req, res) => {
  const categoryId = req.params.id;
  const userId = req.userId;

  try {

    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    // Buscar las notas asociadas a la categoría y al usuario
    const notes = await Note.findAll({
      where: {
        categoryId,
        userId
      },
    });

    // Devolver la categoría con sus notas del usuario específico
    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la categoría y notas' });
  }
};
