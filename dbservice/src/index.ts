"use strict";

import { RestService } from "./RestService";

const service: RestService = new RestService();

service.connectToDatabase();
service.startService();
