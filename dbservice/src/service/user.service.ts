"use strict";

import { BaseService } from "./Base.service";
import { IUserModel, IUserDocument } from "../models/user";

export class UserService extends BaseService<IUserDocument> {
  constructor() {
    super(IUserModel);
  }
}
