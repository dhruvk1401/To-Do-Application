"use strict";

import { BaseService } from "../service/Base.service";
import { Request, Response } from "express";

export class BaseController<T> {
  protected readonly service;
  constructor(service: BaseService<T>) {
    this.service = service;
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.service.create(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  public update = async (req: Request<{ id: string }>, res: Response ): Promise<void> => {
    try {
      const response = await this.service.update(req.params.id, req.body);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  public findById = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    try{
    const response = await this.service.findById(req.params.id)
    res.status(200).json(response);
    }catch(error:any){
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try{
    const response = await this.service.findAll();
    res.status(200).json(response)
    }catch(error:any){
      res.status(error.status || 500).json({message: error.message})
    }
  }

  public deleteById = async ( req: Request<{id: string}>, res: Response): Promise<void> => {
    try{
    const response = await this.service.deleteById(req.params.id)
    res.status(200).json(response)
    }catch(error:any){
      res.status(error.status).json({message: error.message})
    }
  }
}
