import rolesData from "../../../data/roles";
import styles from "./EmployeeRole.module.css";

export function Organization() {
    const roleListElement = rolesData.map((r, index) => {
        return (
            <li key={index}>
                <span>{r.firstName} {r.lastName}</span>
                <span>{r.role}</span>
            </li>
        );
    });

    return (
        <main>
            <section>
                <h1>Leadership & Management</h1>
                <ul className={styles.roles}>
                    {roleListElement}
                </ul>
            </section>
        </main>
    );
}