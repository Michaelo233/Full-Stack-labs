import type { Request, Response } from "express";
import type { AddRoleForm } from "../types/department";
import { roleService } from "../services/roleService";

export const roleController = {
  async getAllRoles(_req: Request, res: Response) {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch {
        res.status(500).json({ error: "Failed to fetch roles" });
    }
  },

  async addRole(req: Request, res: Response) {
    try {
        const role = await roleService.addRole(req.body as AddRoleForm);
        res.status(201).json(role);
    } catch {
        res.status(500).json({ error: "Failed to add role" });
    }
  }
};