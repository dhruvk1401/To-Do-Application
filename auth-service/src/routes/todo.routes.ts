"use strict "

import { TodoController    }    from "../controllers/todo.controller";
import Router from "express";
import { authheader } from "../middleware/auth.middleware";


const router = Router();

const controller =new TodoController()

export default controller ;