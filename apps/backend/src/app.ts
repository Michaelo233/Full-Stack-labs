import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
import type {
  Request,
  Response,
  NextFunction
} from "express";

import { departmentRoutes } from "./api/v1/routes/departmentRoutes"
import roleRouter from "./api/v1/routes/roleRoutes";

const app = express();

const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
  throw new Error("FRONTEND_URL is required");
}

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.use("/api/departments", departmentRoutes);
app.use("/api/roles", roleRouter);

// Central error handler
app.use((
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);
  res.status(500).json({
    error: "Unexpected server error"
  });
});

export default app;