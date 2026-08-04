"use strict";

import "dotenv/config";
import cors from "cors";
import express, { Express } from "express";
import router from "./routes/auth.router";
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
    this.app.use('/auth', router);
  } 

  public start(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`AUTH SERVICE STARTED ON PORT: ${process.env.PORT}`);
    });
  }
}
