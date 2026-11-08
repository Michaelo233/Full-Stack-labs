import { departmentData } from '../data/departments';
import type { AddEmployeeForm, Department } from '../types/department';
import type { Employee } from '../types/employee';
import { Guid } from 'guid-typescript';

export async function getAllDepartments(): Promise<Department[]> {
    return departmentData.map(department => ({
        ...department,
        employees: [...department.employees]
    }));
}

export async function addEmployeeToDepartment(input: AddEmployeeForm): Promise<Department> {
    const department = departmentData.find(dept => dept.name === input.department);
    if (!department) {
        throw new Error(`Department with name "${input.department}" not found.`);
    }

    const employee: Employee = {
        id: Guid.create().toString(),
        firstName: input.employeeFirstName.trim(),
        lastName: input.employeeLastName.trim()
    };
    department.employees = [...department.employees, employee];

    return {
        ...department,
        employees: [...department.employees]
    };
}
