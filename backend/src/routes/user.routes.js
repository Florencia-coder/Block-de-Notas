import { createUser, getUsers } from "../controllers/user.controller.js";

import { Router } from "express";

const router = Router();
router.post("/users", createUser);
router.get("/users", getUsers);

export default router;
