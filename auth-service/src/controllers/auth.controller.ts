"use strict";

import { Request, Response } from "express";
import { UserAuthService } from "../service/user.service";
export class AuthController {
    private readonly userservice: UserAuthService;
    constructor() {
        this.userservice = new UserAuthService();
    }
    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.userservice.register(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "registration failed ",
            });
        }
    };
}
