"use strict ";

import { ITodo, TodoStatus } from "../types/todo";
import { Schema, Document, model } from "mongoose";

export interface ITodoDocument extends ITodo, Document {}
const ITodoSchema = new Schema<ITodoDocument>(
    {
        task: { type: String, required: true },
        todostatus: {
            type: String,
            enum: [
                TodoStatus.STATUS_PENDING,
                TodoStatus.STATUS_COMPLETED,
                TodoStatus.STATUS_INPROGRESS,
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const ITodoModel = model<ITodoDocument>("Todos", ITodoSchema);
