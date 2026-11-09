import { Router } from "express";
import { departmentController } from "../controllers/departmentController";
import { validateAddEmployee } from "../validations/emloyeeValidation";
const departmentRoutes = Router();

departmentRoutes.get(
    "/",
    departmentController.getAllDepartments);
    
    departmentRoutes.post(
        "/",
        validateAddEmployee,
        departmentController.addEmployee);

export { departmentRoutes };