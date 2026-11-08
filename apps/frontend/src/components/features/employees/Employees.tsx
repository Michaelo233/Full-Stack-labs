import styles from "../Features.module.css";
import { useFormInput } from "../../../hooks/useFormInput";
import { useEmployees } from "../../../hooks/useEmployees";

export function Employees() {
    const firstName = useFormInput();
    const lastName = useFormInput();
    const department = useFormInput();
    const {
        departments,
        loading,
        error,
        addEmployee,
    } = useEmployees();

    const departmentListElement = departments.map((d) => {
        return <section key={d.id}>
            <h2>{d.name}</h2>
            <ul className={styles.employees}>
                {d.employees.map((e) => <li key={e.id}>
                    {e.firstName} {e.lastName}
                </li>)}
            </ul>
        </section>
    });

    const departmentDropdownInput = (
            <select
                value={department.value}
                disabled={loading}
                onChange={e => {
                    department.setValue(e.target.value);
                    department.setMessages([]);
                }}
            >
                <option value="">-- Select Department --</option>
                {
                    departments.map(d => {
                        return(
                            <option 
                                key={"opt" + d.id} 
                                value={d.name}>
                                    {d.name}
                                </option>
                        );
                    })
                }
            </select>
    );

    const handleEmployeeSubmit = async () => {
        const firstNameMessages = firstName.validate(value =>
            value.trim().length < 3
                ? ["First name must be at least 3 characters long."]
                : []
        );
        const lastNameMessages = lastName.validate(value =>
            value.trim().length < 3
                ? ["Last name must be at least 3 characters long."]
                : []
        );
        const departmentMessages = department.validate(value =>
            value.trim() ? [] : ["Select a department."]
        );

        if (
            firstNameMessages.length > 0 ||
            lastNameMessages.length > 0 ||
            departmentMessages.length > 0
        ) {
            return;
        }

        const added = await addEmployee({
            department: department.value,
            employeeFirstName: firstName.value,
            employeeLastName: lastName.value
        });

        if (added) {
            firstName.reset();
            lastName.reset();
            department.reset();
        }
    }

    return(<>
        <section>
            <h1>Employees by Department</h1>
            {loading && <p>Loading departments...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {departmentListElement}
        </section>
        <section className={styles.input}>
            <h2>Add New Employee</h2>
            <form onSubmit={async e => {
                e.preventDefault();
                await handleEmployeeSubmit();
            }}>
                <div>
                    <label>
                        First Name: <input 
                            name="firstName" 
                            type="text" 
                            value={firstName.value}
                            onChange={e => {
                                firstName.setValue(e.target.value);
                                firstName.setMessages([]);
                            }}
                        /> 
                    </label>
                </div>
                {firstName.messages.map(message => <p className={styles.error} key={message}>{message}</p>)}
                <div>
                    <label>
                        Last Name: <input 
                            name="lastName" 
                            type="text" 
                            value={lastName.value}
                            onChange={e => {
                                lastName.setValue(e.target.value);
                                lastName.setMessages([]);
                            }}
                            />
                    </label>
                </div>
                {lastName.messages.map(message => <p className={styles.error} key={message}>{message}</p>)}
                <div>
                    <label>
                        Department: 
                            {departmentDropdownInput}
                    </label>
                </div>
                {department.messages.map(message => <p className={styles.error} key={message}>{message}</p>)}
                <div>
                    <input type="submit" disabled={loading} />
                </div>
            </form>
        </section>
    </>);
}