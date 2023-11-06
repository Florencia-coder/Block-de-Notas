import { getLogin, postLogin } from "../controllers/login.controller.js";
import { Router } from "express";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

export default router;
