"use strict";

import { BaseService } from "./Base.service";
import { IUserModel, IUserDocument } from "../models/user";

import mongoose, { HydratedDocument } from "mongoose";

export class UserService extends BaseService<IUserDocument> {
  constructor() {
    super(IUserModel);
  }
  public async findbyusername (identifier: string):Promise<HydratedDocument<IUserDocument>>{
    try{
      if(!identifier) throw new Error("username is required") 
        const query: any[] = [{ username: identifier }]
      console.log(mongoose.Types.ObjectId.isValid(identifier))
        if(mongoose.Types.ObjectId.isValid(identifier)){
          query.push({_id: new mongoose.Types.ObjectId(identifier)})
        }

        const data = await this.model.findOne({ $or:query })
        if(!data) throw new Error("user not found")
        return data;
    }catch(error){
          console.log(
            `[DbService->userService] the username: ${identifier} is not found in the database `
          );
          throw error;
    }
  }


  
}

