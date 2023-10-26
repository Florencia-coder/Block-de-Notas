import { Category, Note } from "../models/index.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
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

export const getNotesCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category does not exist." });
    }
    const notes = await category.getNotes(); // Cargar las notas asociadas
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
