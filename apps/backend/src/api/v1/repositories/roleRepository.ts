import { prisma } from "../../../lib/prisma";
import type { Role } from "../types/department";

export async function getAllRoles(): Promise<Role[]> {
  const roles = await prisma.role.findMany({
    orderBy: { title: "asc" },
    include: { employee: true },
  });

  return roles.map((role) => ({
    id: role.id,
    title: role.title,
    employee: role.employee
      ? {
          id: role.employee.id,
          firstName: role.employee.firstName,
          lastName: role.employee.lastName,
        }
      : undefined,
  }));
}

export async function createRole(
  title: string,
  firstName: string,
  lastName: string,
): Promise<Role> {
  const role = await prisma.role.create({
    data: {
      title,
      employee: {
        create: {
          firstName,
          lastName,
        },
      },
    },
    include: { employee: true },
  });

  return {
    id: role.id,
    title: role.title,
    employee: role.employee
      ? {
          id: role.employee.id,
          firstName: role.employee.firstName,
          lastName: role.employee.lastName,
        }
      : undefined,
  };
}

export async function assignEmployeeToRole(
  roleId: string,
  firstName: string,
  lastName: string,
): Promise<Role> {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
    include: { employee: true },
  });

  if (!role) {
    throw new Error(`Role with id "${roleId}" not found.`);
  }
  if (role.employee) {
    throw new Error(`Role "${role.title}" is already occupied.`);
  }

  const updatedRole = await prisma.role.update({
    where: { id: roleId },
    data: {
      employee: {
        create: {
          firstName,
          lastName,
        },
      },
    },
    include: { employee: true },
  });

  return {
    id: updatedRole.id,
    title: updatedRole.title,
    employee: updatedRole.employee
      ? {
          id: updatedRole.employee.id,
          firstName: updatedRole.employee.firstName,
          lastName: updatedRole.employee.lastName,
        }
      : undefined,
  };
}
