"use strict";

import { BaseController } from "./base.controller";
import { UserService } from "../service/user.service";
import { IUserDocument } from "../models/user";
import { Request, Response } from "express";

const userService = new UserService();

export class UserController extends BaseController<IUserDocument> {
    protected readonly service: UserService;
    constructor() {
        super(userService);
        this.service = userService;
    }
    public findByUsername = async (
        req: Request<{ username: string }>,
        res: Response
    ): Promise<void> => {
        try {
            const username = req.params.username;
            const userfound = await this.service.findbyusername(username);
            console.log(userfound);
            res.status(200).json(userfound);
        } catch (error: any) {
            console.log(error);
        }
    };
}
