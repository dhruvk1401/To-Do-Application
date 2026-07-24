"use strict";

import "dotenv/config";
import axios from "axios";
import { Request, Response } from "express";

export class UserAuthService {
  public async register(data: {
    username: string;
    password: string;
  }): Promise<void> {
    try {
      if (!data.username || !data.password)
        throw new Error(`[User-Service] Required fields are missing`);

      // add a method to find a user by username.
    } catch (error) {
      console.log(
        `[User-Service] Unable to register the user due to ERROR: ${error}`,
      );
      throw error;
    }
  }
}
