"use strict";

import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router();
const controller = new TodoController();

router.post("/todo", controller.createtodo);
router.delete("/todo/:taskid", controller.deletetodo);
router.patch("/todo/:taskid/status", controller.updatetodostatus);
router.get("/todos", controller.getalltodos);

export default router;
