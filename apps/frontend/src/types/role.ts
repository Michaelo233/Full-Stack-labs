import type { Employee } from "./employee";

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