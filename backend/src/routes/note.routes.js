import { Router } from "express";
import {
  getNotes,
  createNote,
  updateNote,
  updateArchivedNote,
  deleteNote,
  getCategoriesNote,
  getNote,
} from "../controllers/note.controller.js";
import userExtractor from "../middleware/UserExtractor.js";

const router = Router();

router.get("/notes",userExtractor, getNotes);
router.post("/notes", userExtractor, createNote);
router.put("/notes/:id", updateNote);
router.patch("/notes/:id", updateArchivedNote);
router.delete("/notes/:id", deleteNote);
router.get("/notes/:id", getNote);
router.get("/notes/:id/categories", getCategoriesNote);

export default router;
