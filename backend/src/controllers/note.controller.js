import { Note, Category, User } from "../models/index.js";

export const getNotes = async (req, res) => {
  const {userId} = req

  try {
    const notes = await Note.findAll({
      where: {userId}
    });
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const { title='', description='', category='' } = req.body;

  const { userId } = req;
  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  // Verifica y crea la categoría si es proporcionada
  let categoryInstance = null;
  if (category && category?.trim() !== "") {
    [categoryInstance] = await Category.findOrCreate({
      where: { name: category, userId: userId },
      defaults: { userId: userId }
    });
  }
  
  // Crea una nueva nota relacionada con el usuario
  const newNote = await Note.create({
    title,
    description,
    userId,
    categoryId: categoryInstance ? categoryInstance.id : null,
  });

  return res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId} = req;

    // Buscar la nota para asegurarse de que pertenece al usuario logueado
    const note = await Note.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return res.status(404).json({ message: "Note does not exist or you don't have permission to delete it." });
    }

    // Eliminar la nota
    await Note.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId} =req;
    const { title, description, archived, category } = req.body;

    // Buscar la nota para asegurarse de que pertenece al usuario logueado
    const note = await Note.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return res.status(404).json({ message: "Note does not exist or you don't have permission to update it." });
    }

    // Verifica y crea la categoría si es proporcionada
    let categoryInstance = null;
    if (category && category.trim() !== "") {
      categoryInstance = await Category.findOne({
        where: { name: category, userId },
      });

      if (!categoryInstance) {
        categoryInstance = await Category.create({ name: category, userId });
      }
    }

    // Actualiza los campos de la nota
    note.title = title;
    note.description = description;
    note.archived = archived || false;
    note.categoryId = categoryInstance ? categoryInstance.id : null;

    await note.save();

    res.json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateArchivedNote = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId} =req;
    const { archived } = req.body;

    // Buscar la nota para asegurarse de que pertenece al usuario logueado
    const note = await Note.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return res.status(404).json({ message: "Note does not exist or you don't have permission to update it." });
    }

    note.archived = archived;

    await note.save();

    res.json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId} =req;

    // Buscar la nota para asegurarse de que pertenece al usuario logueado
    const note = await Note.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return res.status(404).json({ message: "Note does not exist or you don't have permission to view it." });
    }

    res.json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoriesNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note does not exists." });
    }
    const categories = await note.getCategories();

    res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
