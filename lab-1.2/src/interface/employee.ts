export interface Employee {
    firsName: string;
    lastname: string;
}
export interface Department {
    name: string;
    employees: string[] | Employee[];
}