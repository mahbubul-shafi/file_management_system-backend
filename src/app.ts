import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { authMiddleware, requireRole } from "./middlewares/auth.middleware";
import subscriptionRoutes from "./modules/subscription/subscription.routes";
import folderRoutes from "./modules/folder/folder.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Storage SaaS API Running 🚀");
});

app.get(
  "/api/admin/test",
  authMiddleware,
  requireRole("ADMIN"),
  (req, res) => {
    res.json({ message: "Admin access granted 🔥" });
  }
);

app.use("/api/auth", authRoutes);
app.use("/api/admin/subscriptions", subscriptionRoutes);
app.use("/api/folders", folderRoutes);

export default app;