"use strict";

import { Router } from "express";
import UserRoutes from "./user.routes";
import TodoRoutes from "./todo.routes";

const router = Router();

router.use(UserRoutes);
router.use(TodoRoutes);

export default router;
