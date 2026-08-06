"use strict";

import { Request, Response } from "express";
import { UserAuthService } from "../service/user.service";
export class AuthController {
    private readonly userservice: UserAuthService;
    constructor() {
        this.userservice = new UserAuthService();
    }
    register = async (req: Request, res: Response): Promise<void> => {
        console.log("register in auth called ");
        try {
            const result = await this.userservice.register(req.body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({
                message: error.message,
            });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const userlogin = await this.userservice.login(req.body);

            res.status(200).json(userlogin);
        } catch (error: any) {
            res.status(400).json({
                message: error.message,
            });
        }
    };
}
