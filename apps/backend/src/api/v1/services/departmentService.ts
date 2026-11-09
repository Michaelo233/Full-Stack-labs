import { getAllDepartments, addEmployeeToDepartment } from "../repositories/departmentRepository";
import type { AddEmployeeForm } from "../types/department";

export const departmentService = {
  getAll() {
    return getAllDepartments();
  },

  addEmployee(input: AddEmployeeForm) {
    return addEmployeeToDepartment(input);
  },
};