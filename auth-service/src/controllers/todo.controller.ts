"use Strict "

import { Request,Response } from "express";
import jwt from "jsonwebtoken";
import {TodoService} from "../service/todo.service";

export class TodoController{

    private readonly todoservice=new TodoService()

    
}


