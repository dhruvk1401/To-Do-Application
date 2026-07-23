"use strict";

import { Schema, Document, model } from "mongoose";
import { IUser } from "../types/user";

export interface IUserDocument extends IUser, Document {}

const IUserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
  },
  {
    timestamps: true,
  },
);

export const IUserModel = model<IUserDocument>("Users", IUserSchema);
