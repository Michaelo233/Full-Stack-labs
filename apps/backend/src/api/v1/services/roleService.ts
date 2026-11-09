import { getAllRoles, createRole } from "../repositories/roleRepository";
import type { AddRoleForm, Role } from "../types/department";

export const roleService = {
  async getAllRoles(): Promise<Role[]> {
    return getAllRoles();
  },

  async addRole(input: AddRoleForm): Promise<Role> {
    return createRole(input.role, input.firstName, input.lastName);
  },
};