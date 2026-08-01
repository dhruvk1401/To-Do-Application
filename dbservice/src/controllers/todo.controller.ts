"use strict";

import { BaseController } from "./base.controller";
import { TodoService } from "../service/todo.service";
import { ITodoDocument } from "../models/todo";
import { Request, Response } from "express";
import { TodoStatus } from "../types/todo";

const service = new TodoService();

export class TodoController extends BaseController<ITodoDocument> {
    protected readonly service: TodoService;
    constructor() {
        super(service);
        this.service = service;
    }

    public createtodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = req.body?.task;

            if (typeof task !== "string" || !task.trim()) {
                res.status(400).json({ message: "Task is required" });
                return;
            }

            const todo = await this.service.CreateTodo(task);
            res.status(201).json(todo);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Failed to create todo" });
        }
    };

    public deletetodo = async (req: Request, res: Response): Promise<void> => {
        const taskid = req.params.taskid;

        try {
            if (typeof taskid !== "string" || !taskid.trim()) {
                res.status(400).json({ message: "taskid is required" });
                return;
            }

            const todo = await this.service.deletetodo(taskid.trim());

            if (!todo) {
                res.status(404).json({ message: "Todo not found" });
                return;
            }

            res.status(200).json(todo);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Failed to delete todo" });
        }
    };

    public updatetodostatus = async (req: Request, res: Response): Promise<void> => {
        const taskid = req.params.taskid;
        const todostatus = req.body?.todostatus;

        try {
            if (typeof taskid !== "string" || !taskid.trim()) {
                res.status(400).json({ message: "taskid is required" });
                return;
            }

            if (typeof todostatus !== "string" || !todostatus.trim()) {
                res.status(400).json({ message: "Valid todostatus is required" });
                return;
            }

            const normalizedStatus = todostatus.trim();

            if (!(Object.values(TodoStatus) as string[]).includes(normalizedStatus)) {
                res.status(400).json({ message: "Valid todostatus is required" });
                return;
            }

            // TodoService.updatetodo accepts (id, update) so pass only those two arguments
            const todo = await this.service.updatetodo(
                taskid.trim(),
                { todostatus: normalizedStatus as TodoStatus }
            );

            if (!todo) {
                res.status(404).json({ message: "Todo not found" });
                return;
            }

            res.status(200).json(todo);
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Failed to update todo status" });
        }
    };

    public getalltodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const todos = await this.service.getAlltodos();
            console.log("Fetched todos:", todos);
            res.status(200).json(Array.isArray(todos) ? todos : []);
            return ;
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Failed to fetch todos" });
        }
    };
}
