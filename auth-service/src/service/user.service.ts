"use strict";

import "dotenv/config";
import axios from "axios";
import bcrypt from "bcrypt";

export class UserAuthService {
  // add return type.
  public async register(data: { username: string; password: string }) {
    try {
      if (!data.username || !data.password)
        throw new Error(`[User-Service] Required fields are missing`);

      // add a method to find a user by username.

      const newUser = {
        username: data.username,
        password: bcrypt.hash(
          data.password.trim(),
          process.env.SALT_ROUNDS ?? 10,
        ),
        createdAt: new Date(),
      };

      const registered = await axios.post(`${process.env.DB_SERVICE}/user`);
      return registered.data;
    } catch (error) {
      console.log(
        `[User-Service] Unable to register the user due to ERROR: ${error}`,
      );
      throw error;
    }
  }
}
