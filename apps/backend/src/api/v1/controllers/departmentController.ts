import type { Request, Response } from "express";
import type { AddEmployeeForm } from "../types/department";
import { departmentService } from "../services/departmentService";

export const departmentController = {
  async getAllDepartments(_req: Request, res: Response) {
    try {
      const departments = await departmentService.getAll();
      res.status(200).json(departments);
    } catch {
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  },

  async addEmployee(req: Request, res: Response) {
    try {
        const employeeData = await departmentService.addEmployee(req.body as AddEmployeeForm);
        res.status(201).json(employeeData);
    } catch {
        res.status(500).json({ error: "Failed to add employee to department" });
    }
  }

};
