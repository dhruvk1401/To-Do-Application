"use strict";

import "dotenv/config";
import cors from "cors";
import express, { Express } from "express";

export class AuthService {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
      }),
    );
  }

  public start(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`AUTH SERVICE STARTED ON PORT: ${process.env.PORT}`);
    });
  }
}
