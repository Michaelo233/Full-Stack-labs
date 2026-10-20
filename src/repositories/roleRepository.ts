import { Guid } from "guid-typescript";
import { roleData } from "../data/roles";
import type { Role } from "../types/role";

export async function getAllRoles(): Promise<Role[]> {
  return roleData.map((role) => ({
    ...role,
    employee: role.employee ? { ...role.employee } : undefined,
  }));
}

export async function createRole(
  title: string,
  firstName: string,
  lastName: string,
): Promise<Role> {
  const employee = {
    id: Guid.create().toString(),
    firstName,
    lastName,
  };
  const role: Role = {
    id: Guid.create().toString(),
    title,
    employee,
  };
  roleData.push(role);

  return { ...role, employee: { ...employee } };
}

export async function assignEmployeeToRole(
  roleId: string,
  firstName: string,
  lastName: string,
): Promise<Role> {
  const role = roleData.find((candidate) => candidate.id === roleId);
  if (!role) {
    throw new Error(`Role with id "${roleId}" not found.`);
  }
  if (role.employee) {
    throw new Error(`Role "${role.title}" is already occupied.`);
  }

  role.employee = {
    id: Guid.create().toString(),
    firstName,
    lastName,
  };

  return { ...role, employee: { ...role.employee } };
}
