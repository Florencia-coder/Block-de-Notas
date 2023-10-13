import { Router } from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getCategoriesNote,
  getNote,
} from "../controllers/note.controller.js";

const router = Router();

router.get("/notes", getNotes);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.get("/notes/:id", getNote);
router.get("/notes/:id/categories", getCategoriesNote);

export default router;
