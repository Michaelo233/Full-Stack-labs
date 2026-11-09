import type { 
    AddEmployeeForm,
    Department
} from "../types/department";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseUrl}/api/departments`;

async function readJSON<T>(
    response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`API error: ${response.status})`);
    }
    return (await response.json()) as T;
}

export async function getAllDepartments(): Promise<Department[]> {
    const response = await fetch(endpoint);
    return readJSON<Department[]>(response);
}

export async function addEmployeeToDepartment(input: AddEmployeeForm): Promise<Department> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    });
    return readJSON<Department>(response);
}