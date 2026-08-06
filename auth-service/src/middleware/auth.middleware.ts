"use strict ";
import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

 export const authheader = (req: Request, res: Response, next: NextFunction): void => {
    const authheader = req.headers.authorization;

    if (!authheader) {
        res.status(401).json({
            error: "token is missing ",
        });
    }
    return;
};
