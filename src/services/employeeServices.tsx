import { getAllDepartments, addEmployeeToDepartment } from '../repositories/departmentRepository';
import type { Department, addEmployeeForm } from '../types/department';

async function validateFormInput(input: addEmployeeForm): Promise<string[]> {
    const errors: string[] = [];
    const departmentName = input.department.trim();
    const firstName = input.employeeFirstName.trim();
    const departments = await getAllDepartments();

    if (!departments.some(department => department.name === departmentName)) {
        errors.push('Employee must be in an existing department.');
    }
    if (firstName.length < 3) {
        errors.push('First name must be at least 3 characters long.');
    }

    return errors;
}

export const addEmployeeService = {
    async getAllDepartments(): Promise<Department[]> {
        return getAllDepartments();
    },

    async addEmployee(input: addEmployeeForm): Promise<Department> {
        const errors = await validateFormInput(input);
        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }

        const departmentName = input.department.trim();
        const firstName = input.employeeFirstName.trim();

        return addEmployeeToDepartment({
            ...input,
            department: departmentName,
            employeeFirstName: firstName,
            employeeLastName: input.employeeLastName.trim()
        });
    }
};