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
router.put("/notes/:id",userExtractor, updateNote);
router.patch("/notes/:id",userExtractor, updateArchivedNote);
router.delete("/notes/:id", userExtractor ,deleteNote);
router.get("/notes/:id",userExtractor, getNote);
router.get("/notes/:id/categories", getCategoriesNote);

export default router;
