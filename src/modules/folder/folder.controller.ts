import { Response } from "express";
import { FolderService } from "./folder.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

const create = async (req: AuthRequest, res: Response) => {
  try {
    const result = await FolderService.createFolder(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const FolderController = {
  create,
};