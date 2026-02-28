import { Router } from "express";
import { SubscriptionController } from "./subscription.controller";
import {
  authMiddleware,
  requireRole,
} from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  SubscriptionController.create
);

router.get(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  SubscriptionController.getAll
);

router.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  SubscriptionController.update
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  SubscriptionController.remove
);

export default router;