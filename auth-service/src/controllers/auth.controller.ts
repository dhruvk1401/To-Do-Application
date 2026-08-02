"use strict";

import {Request,Response } from "express";
import { UserAuthService } from "../service/user.service";
export class AuthController{
    private readonly userservice:UserAuthService;
    constructor(){
        this.userservice=new UserAuthService()
    }
    public async register(
        req:Request,
        res:Response
    ):Promise<void>{
        try{
            console.log("register controller hit");
            console.log("calling service to register user")
            const result =await this.userservice.register(req.body);
            res.status(201).json(result)
            console.log("user registered successfully");

        }catch (error){
            res.status(500).json({
                message:"registration failed "
            })
            

        }
    }

}