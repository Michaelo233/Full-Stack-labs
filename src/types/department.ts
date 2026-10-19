import type { Employee } from "./employee";

export interface Department {
    id: string;
    name: string;
    employees: Employee[]
}

export interface AddEmployeeForm {
    department: string;
    employeeFirstName: string;
    employeeLastName: string;
}