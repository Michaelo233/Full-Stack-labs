import {
  assignEmployeeToRole,
  createRole,
  getAllRoles,
} from "../repositories/roleRepository";
import type { AddRoleForm, Role } from "../types/role";

function validateRoleInput(input: AddRoleForm): string[] {
  const errors: string[] = [];
  if (input.firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters long.");
  }
  if (!input.lastName.trim()) {
    errors.push("Last name is required.");
  }
  if (!input.role.trim()) {
    errors.push("Role is required.");
  }

  return errors;
}

export const roleService = {
  async getAllRoles(): Promise<Role[]> {
    return getAllRoles();
  },

  async addRole(input: AddRoleForm): Promise<Role> {
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const title = input.role.trim();
    const errors = validateRoleInput(input);
    if (errors.length > 0) {
      throw new Error(errors.join(" "));
    }

    const existingRole = (await getAllRoles()).find(
      (role) => role.title.trim().toLowerCase() === title.toLowerCase(),
    );
    if (existingRole?.employee) {
      throw new Error(`Role "${existingRole.title}" is already occupied.`);
    }
    if (existingRole) {
      return assignEmployeeToRole(existingRole.id, firstName, lastName);
    }

    return createRole(title, firstName, lastName);
  },
};
