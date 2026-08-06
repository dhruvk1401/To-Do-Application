"use strict";

import "dotenv/config";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserAuthService {
    // add return type.
    private generateToken(user: { id: string; username: string }): string {
        return jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            `process.env.JWT_SECRET`,
            {
                expiresIn: Number(process.env.JWT_EXPIRES),
            }
        );
    }

    public async register(data: { username: string; password: string }): Promise<{
        user: any;
        token: string;
    }> {
        try {
            console.log(`processing player register`);
            if (!data?.username.trim() || !data?.password.trim())
                throw new Error(`[User-Service] Required fields are missing`);

            // add a method to find a user by username.
            const exsistinguser = await axios
                .get(`${process.env.DB_SERVICE}/user/${data.username}`)
                .catch(() => null);

            if (exsistinguser) {
                throw new Error(
                    `[User-Service] User with username ${data.username} already exists`
                );
            }

            const saltrounds = Number(process.env.SALT_ROUNDS) || 10;
            const hashedpassword = await bcrypt.hash(data.password.trim(), saltrounds);

            console.log(`salt rounds ${saltrounds}`);
            console.log(`hashed password ${hashedpassword}`);

            const newUser = {
                username: data.username.trim(),
                password: hashedpassword,
                createdAt: new Date(),
            };
            console.log(`[User-Service] Registering new user: ${JSON.stringify(newUser)}`);

            const registered = await axios.post(`${process.env.DB_SERVICE}/user`, newUser);
            const createduser = registered.data;

            console.log("user created successfully in db :", createduser);

            const usertoken = this.generateToken({
                id: createduser._id,
                username: createduser.username,
            });

            return {
                user: createduser,
                token: usertoken,
            };
        } catch (error) {
            console.log(`[User-Service] Unable to register the user due to ERROR: ${error}`);
            throw error;
        }
    }

    public async login(data: { username: string; password: string }): Promise<{
        user: any;
        token: string;
    }> {
        try {
            if (!data.username?.trim() || !data.password?.trim()) {
                console.log(`[User-Service] both fields are required `);
            }

            const response = await axios
                .get(`${process.env.DB_SERVICE}/user/${data.username}`)
                .catch(() => null);

            const user = response?.data;

            if (!user) {
                throw new Error("user is not found ");
            }

            const ispasswordvalid = await bcrypt.compare(data.password.trim(), user.password);

            if (!ispasswordvalid) {
                throw new Error("the password doest matches");
            }

            const token = this.generateToken(user);

            const { password, ...safeuser } = user;

            return {
                user: safeuser,
                token: token,
            };
        } catch (error) {
            throw error;
        }
    }
}
