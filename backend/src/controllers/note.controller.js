import { Note } from "../models/Note.js";
import { Category } from "../models/Category.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const { title, description, categories } = req.body;
  try {
    const newNote = await Note.create({
      title,
      description,
    });

    if (categories && categories.length > 0) {
      const categoryInstances = await Category.findAll({
        where: { name: categories },
      });
      await newNote.setCategories(categoryInstances);
    }

    res.json(newNote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const { title, description, archived } = req.body;

    const note = await Note.findByPk(id);
    if (!note)
      return res.status(500).json({ message: "Note does not exists." });
    note.title = title;
    note.description = description;
    note.archived = archived || false;
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
