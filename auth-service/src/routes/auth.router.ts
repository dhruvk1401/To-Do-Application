"use strict ";

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const controller = new AuthController();
const router = Router();

router.post("/register", (req, res, next) => {
    console.log("Route hit");
    next();
}, controller.register.bind(controller));

export default router;
