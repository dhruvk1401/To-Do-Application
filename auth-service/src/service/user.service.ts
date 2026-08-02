"use strict";

import "dotenv/config";
import axios from "axios";
import bcrypt from "bcrypt";

export class UserAuthService {
    // add return type.
    public async register(data: { username: string; password: string }) {
      console.log("register service hit");
        try {
            if (!data.username || !data.password)
                throw new Error(`[User-Service] Required fields are missing`);
              console.log("checking if user already exists");

            // add a method to find a user by username.
           
            
            const saltrounds=Number(process.env.SALT_ROUNDS) || 10;

            const newUser = {
                username: data.username,
                password: await bcrypt.hash(data.password.trim(), saltrounds),
                createdAt: new Date(),
            };

            console.log("registering user in db service");
            const registered = await axios.post(`${process.env.DB_SERVICE}/user`, newUser);
                        console.log("user registered successfully in db service");

            return registered.data;
        } catch (error) {
            console.log(`[User-Service] Unable to register the user due to ERROR: ${error}`);
            throw error;
        }
    }

    public async findbyusername(username: string): Promise<any | null> {
        try {
            const response = await axios.get(`${process.env.DB_SERVICE}/user/${encodeURIComponent(username)}`);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }
}
