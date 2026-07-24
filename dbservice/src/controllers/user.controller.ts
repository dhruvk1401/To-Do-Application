"use strict";

import { BaseController } from "./base.controller";
import { UserService } from "../service/user.service";
import { IUserDocument } from "../models/user";

const userService = new UserService();

export class UserController extends BaseController<IUserDocument> {
  protected readonly service: UserService;
  constructor() {
    super(userService);
    this.service = userService;
  }
}
