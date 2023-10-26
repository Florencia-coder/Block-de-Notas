import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  getNotesCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.get("/categories/:id/notes", getNotesCategory);

export default router;
