import { prisma } from "../../../lib/prisma";
import type {
  AddEmployeeForm,
  Department,
  Employee,
} from "../types/department";

export async function getAllDepartments(): Promise<Department[]> {
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
    include: {
      employees: {
        orderBy: { lastName: "asc" },
      },
    },
  });

  return departments.map((department) => ({
    id: department.id,
    name: department.name,
    employees: department.employees.map((employee) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
    })),
  }));
}

export async function addEmployeeToDepartment(
  input: AddEmployeeForm,
): Promise<Department> {
  const department = await prisma.department.findFirst({
    where: { name: input.department.trim() },
    include: { employees: true },
  });

  if (!department) {
    throw new Error(`Department with name "${input.department}" not found.`);
  }

  const employee = await prisma.employee.create({
    data: {
      firstName: input.employeeFirstName.trim(),
      lastName: input.employeeLastName.trim(),
      departmentId: department.id,
    },
  });

  const mappedEmployees: Employee[] = [
    ...department.employees.map((currentEmployee) => ({
      id: currentEmployee.id,
      firstName: currentEmployee.firstName,
      lastName: currentEmployee.lastName,
    })),
    {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
    },
  ];

  return {
    id: department.id,
    name: department.name,
    employees: mappedEmployees,
  };
}
