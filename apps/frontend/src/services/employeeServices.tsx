import { getAllDepartments, addEmployeeToDepartment } from '../repositories/departmentRepository';
import type { AddEmployeeForm, Department } from '../types/department';

async function validateFormInput(input: AddEmployeeForm): Promise<string[]> {
    const errors: string[] = [];
    const departmentName = input.department.trim();
    const firstName = input.employeeFirstName.trim();
    const lastName = input.employeeLastName.trim();
    const departments = await getAllDepartments();

    if (!departments.some(department => department.name === departmentName)) {
        errors.push('Employee must be in an existing department.');
    }
    if (firstName.length < 3) {
        errors.push('First name must be at least 3 characters long.');
    }
    if (lastName.length < 3) {
        errors.push('Last name must be at least 3 characters long.');
    }

    return errors;
}

export const addEmployeeService = {
    async getAllDepartments(): Promise<Department[]> {
        return getAllDepartments();
    },

    async addEmployee(input: AddEmployeeForm): Promise<Department> {
        const errors = await validateFormInput(input);
        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }

        return addEmployeeToDepartment({
            department: input.department.trim(),
            employeeFirstName: input.employeeFirstName.trim(),
            employeeLastName: input.employeeLastName.trim()
        });
    }
};