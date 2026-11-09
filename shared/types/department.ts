export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
}

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

export interface Role {
    id: string;
    title: string;
    employee?: Employee;
}

export interface AddRoleForm {
    firstName: string;
    lastName: string;
    role: string;
}