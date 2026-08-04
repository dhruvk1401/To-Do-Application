"use strict ";

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const controller = new AuthController();
const router = Router();

router.post("/user/register", controller.register);

export default router;
