import { Request, Response } from "express";
import { SubscriptionService } from "./subscription.service";

const create = async (req: Request, res: Response) => {
  try {
    const result = await SubscriptionService.createPackage(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAll = async (_req: Request, res: Response) => {
  const result = await SubscriptionService.getAllPackages();
  res.json({ success: true, data: result });
};

const update = async (req: Request, res: Response) => {
  try {
    const result = await SubscriptionService.updatePackage(
      req.params.id,
      req.body
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  await SubscriptionService.deletePackage(req.params.id);
  res.json({ success: true, message: "Deleted successfully" });
};

export const SubscriptionController = {
  create,
  getAll,
  update,
  remove,
};