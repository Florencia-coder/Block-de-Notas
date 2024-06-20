import { Router } from "express";
import {
  getCategories,
  getCategoryNotesByUserId,
  getCategoryById,
} from "../controllers/category.controller.js";
import userExtractor from "../middleware/UserExtractor.js";

const router = Router();

router.get("/categories",userExtractor, getCategories);
router.get("/categories/:id", getCategoryById);
router.get("/categories/:id/notes", userExtractor, getCategoryNotesByUserId);

export default router;
