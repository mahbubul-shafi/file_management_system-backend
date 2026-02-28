import { Router } from "express";
import { FolderController } from "./folder.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, FolderController.create);

export default router;