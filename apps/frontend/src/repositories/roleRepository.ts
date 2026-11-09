import type { Role } from "../types/department";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseUrl}/api/roles`;

async function readJSON<T>(
    response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`API error: ${response.status})`);
    }
    return (await response.json()) as T;
}

export async function getAllRoles(): Promise<Role[]> {
    const response = await fetch(endpoint);
    return readJSON<Role[]>(response);
}

export async function createRole(input: { role: string; firstName: string; lastName: string }): Promise<Role> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    });
    return readJSON<Role>(response);
}

export async function assignEmployeeToRole(roleId: string, firstName: string, lastName: string): Promise<Role> {
    const response = await fetch(`${endpoint}/${roleId}/assign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName, lastName })
    });
    return readJSON<Role>(response);
}
