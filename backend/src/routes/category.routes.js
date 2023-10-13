import { Router } from "express";
import {
  getCategories,
  createCategory,
  getNotesCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.get("/categories/:id/notes", getNotesCategory);

export default router;
