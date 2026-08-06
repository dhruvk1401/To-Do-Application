"use strict ";

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {authheader} from "../middleware/auth.middleware"

const controller = new AuthController();
const router = Router();

router.post("/user/register", controller.register);
router.post("/user/login", controller.login);

export default router;
