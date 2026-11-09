import { Router } from "express";
import { roleController } from "../controllers/roleController";
import { validateAddRole } from "../validations/emloyeeValidation";

const roleRouter = Router();

roleRouter.get("/", roleController.getAllRoles);
roleRouter.post("/", validateAddRole, roleController.addRole);

export default roleRouter;