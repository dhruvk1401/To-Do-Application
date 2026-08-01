"use strict";

import { RestService } from "./RestService";

const service: RestService = new RestService();

const start = async (): Promise<void> => {
  await service.connectToDatabase();
  service.startService();
};

void start();
