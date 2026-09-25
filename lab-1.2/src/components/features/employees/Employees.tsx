import type { Department } from "../../../types/department";
import styles from "./Employees.module.css";

interface EmployeesProps {
    departments: Department[];
}

export function Employees({ departments }: EmployeesProps) {
    const departmentListElement = departments.map((d) => {
        return (
            <section key={d.name}>
                <h2>{d.name}</h2>
                <ul className={styles.employees}>
                    {d.employees.map((e, index) => (
                        <li key={`${d.name}-${e.firstName}-${e.lastName ?? "unknown"}-${index}`}>
                            {e.firstName} {e.lastName}
                        </li>
                    ))}
                </ul>
            </section>
        );
    });

    return (
        <main>
            <section>
                <h1>Employees by Department</h1>
                {departmentListElement}
            </section>
        </main>
    );
}