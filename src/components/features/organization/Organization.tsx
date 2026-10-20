import styles from "../Features.module.css";
import { AddRoleForm } from "./AddRoleForm";
import { useOrganizationRoles } from "../../../hooks/useOrganizationRoles";

export function Organization() {
    const { roles, loading, error, addRole } = useOrganizationRoles();

    return(<>
        <section>
            <h1>Leadership and Management</h1>
            {loading && <p>Loading roles...</p>}
            <table className={styles.table}>
                <tbody>
                {roles.map(r => {
                    return(
                    <tr key={r.id}>
                        <td className={styles.roleName}>
                            {r.title}
                        </td>
                        <td>
                            {r.employee?.firstName} {r.employee?.lastName}
                        </td>
                    </tr>
                )}
            )}
            </tbody>
            </table>
        </section>
        <AddRoleForm loading={loading} error={error} onSubmit={addRole} />
    </>);

}