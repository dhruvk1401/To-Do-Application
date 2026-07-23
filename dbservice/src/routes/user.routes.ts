"use strict";

import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const controller = new UserController();

router.get("/users", controller.findAll);
router.get("/user/:id", controller.findById);
router.post("/user", controller.create);
router.patch("/user/:id", controller.update);
router.delete("/user/:id", controller.deleteById);

export default router;
