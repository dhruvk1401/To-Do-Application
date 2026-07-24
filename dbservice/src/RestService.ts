"use strict";

import "dotenv/config";
import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routes/index";

export class RestService {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(process.env.BASE_SERVICE_URL as string, router);
  }

  public startService(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`DATABASE SERVICE STARTED ON PORT:${process.env.PORT}`);
    });
  }

  public async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(process.env.DB_SERVICE || "");
      console.log(`DATABASE CONNECTED SUCCESSFULLY TO THE SERVICE`);
    } catch (error) {
      console.log(
        `NOT ABLE TO CONNECT TO DB:${process.env.DBSERVICE} ERROR:${error}`,
      );
      throw error;
    }
  }
}
