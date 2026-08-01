"use strict";

import { ITodoModel, ITodoDocument } from "../models/todo";
import { TodoStatus } from "../types/todo";
import { HydratedDocument } from "mongoose";
import { BaseService } from "./Base.service";
import mongoose from "mongoose";
interface update {
    task?: string;
    todostatus?: TodoStatus;
}

export class TodoService extends BaseService<ITodoDocument> {
    constructor() {
        super(ITodoModel);
    }

    public async CreateTodo(task: string): Promise<HydratedDocument<ITodoDocument>> {
        try {
            if (!task) {
                throw new Error("Task is required");
            }

            const todoTask = await this.model.create({
                task: task,
                todostatus: TodoStatus.STATUS_PENDING,
            });

            return todoTask;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async deletetodo(taskid: string): Promise<HydratedDocument<ITodoDocument> | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(taskid)) {
                throw "id is not valid ";
            }
            const deletedtodo = await this.model.findByIdAndDelete(taskid);
            if (!deletedtodo) {
                throw new Error("task not found");
            }
            return deletedtodo;
        } catch (error) {
            throw error;
        }
    }

    public async updatetodo(
        taskid: string,
        update: update
    ): Promise<HydratedDocument<ITodoDocument> | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(taskid)) {
                throw new Error("id is not valid");
            }
            const updatedtodo = await this.model.findByIdAndUpdate(
                taskid,
                 update, {
                new: true,
                runvalidators: true,
            });
            if (!updatedtodo) {
                throw new Error("task not found");
            }

            return updatedtodo;
        } catch (error) {
            throw error;
        }
    }

    public async getAlltodos(): Promise<Array<HydratedDocument<ITodoDocument>>> {
        try {
            const todos = await this.model.find().sort({ createdAt: -1 });
            return todos;
        } catch (error) {
            throw error;
        }
    }
}

/* Route example to add in your routes file (e.g., routes/todo.routes.ts)
import express from 'express';
import { TodoService } from '../service/todo.service';

const router = express.Router();
const todoService = new TodoService();

router.get('/todos', async (req, res) => {
  try {
    const todos = await todoService.getAlltodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

export default router;
*/
