"use strict";

import { HydratedDocument, Model } from "mongoose";

export class BaseService<T> {
  constructor(protected model: Model<T>) {}

  public async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    try {
      const create = await this.model.create(data);
      console.log(
        `[DbService->BaseService] Successfully created and stored data in database`,
      );
      return create;
    } catch (error) {
      console.log(
        `[DbService->BaseService] Unable to create the data in database due to ERROR:${error}`,
      );
      throw error;
    }
  }

  public async update(
    id: string,
    data: Partial<T>,
  ): Promise<HydratedDocument<T> | null> {
    try {
      const update = await this.model.findByIdAndUpdate(id, data);
      console.log(
        `[DbService->BaseService] Successfully created and stored data in database`,
      );
      return update;
    } catch (error) {
      console.log(
        `[DbService->BaseService] Unable to update the data in database due to ERROR:${error}`,
      );
      throw error;
    }
  }

  public async findById(id: string) {
    try {
      const data = await this.model.findById(id);
      console.log(
        `[DbService->BaseService] Successfully found data for ID: ${id} in database`,
      );
      return data;
    } catch (error) {
      console.log(
        `[DbService->BaseService] Unable to find the data for ID: ${id} in database due to ERROR:${error}`,
      );
      throw error;
    }
  }

  public async findAll(): Promise<HydratedDocument<T>[] | []> {
    try {
      const data = await this.model.find();
      console.log(
        `[DbService->BaseService] Successfully found data in database`,
      );
      return data ?? [];
    } catch (error) {
      console.log(
        `[DbService->BaseService] Unable to find the data in database due to ERROR:${error}`,
      );
      throw error;
    }
  }

  public async deleteById(id: string): Promise<{ message: string }> {
    try {
      const data = await this.model.findByIdAndDelete(id);
      console.log(
        `[DbService->BaseService] Successfully deleted data for ID: ${id} from database`,
      );
      return { message: "Data Deleted Successfully" };
    } catch (error) {
      console.log(
        `[DbService->BaseService] Unable to delete the data for ID: ${id} from database due to ERROR:${error}`,
      );
      throw error;
    }
  }
}
