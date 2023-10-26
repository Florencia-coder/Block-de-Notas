import { Note, Category } from "../models/index.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const { title, description, category } = req.body;

  try {
    let categoryInstance = null;

    if (category && category.trim() !== "") {
      categoryInstance = await Category.findOne({
        where: { name: category },
      });

      if (!categoryInstance) {
        categoryInstance = await Category.create({ name: category });
      }
    }

    const newNote = await Note.create({
      title,
      description,
      categoryId: categoryInstance ? categoryInstance.id : null,
    });

    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo crear la nota", error });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.destroy({
      where: {
        id,
      },
    });
    if (!deletedNote)
      return res.status(500).json({ message: "Note does not exists." });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, archived, category } = req.body;

    let categoryInstance = null;
    if (category && category.trim() !== "") {
      categoryInstance = await Category.findOne({
        where: { name: category },
      });

      if (!categoryInstance) {
        categoryInstance = await Category.create({ name: category });
      }
    }

    const note = await Note.findByPk(id);
    if (!note)
      return res.status(500).json({ message: "Note does not exists." });
    note.title = title;
    note.description = description;
    note.archived = archived || false;
    (note.categoryId = categoryInstance ? categoryInstance.id : null),
      await note.save();

    res.json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateArchivedNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { archived } = req.body;

    const note = await Note.findByPk(id);
    if (!note) return res.status(500).json({ message: "Note does not exist." });

    if (archived !== undefined) {
      note.archived = archived;
    }

    await note.save();

    res.json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note)
      return res.status(500).json({ message: "Note does not exists." });
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
