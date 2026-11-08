import { useFormInput } from "../../../hooks/useFormInput";
import type { AddRoleForm as AddRoleFormInput } from "../../../types/role";
import styles from "../Features.module.css";

interface AddRoleFormProps {
  loading: boolean;
  error: string | null;
  onSubmit: (input: AddRoleFormInput) => Promise<boolean>;
}

export function AddRoleForm({
  loading,
  error,
  onSubmit,
}: AddRoleFormProps) {
  const firstName = useFormInput();
  const lastName = useFormInput();
  const role = useFormInput();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const firstNameErrors = firstName.validate((value) =>
      value.trim().length < 3
        ? ["First name must be at least 3 characters long."]
        : [],
    );
    const lastNameErrors = lastName.validate((value) =>
      value.trim() ? [] : ["Last name is required."],
    );
    const roleErrors = role.validate((value) =>
      value.trim() ? [] : ["Role is required."],
    );

    if (
      firstNameErrors.length > 0 ||
      lastNameErrors.length > 0 ||
      roleErrors.length > 0
    ) {
      return;
    }

    const added = await onSubmit({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });
    if (added) {
      firstName.reset();
      lastName.reset();
      role.reset();
    }
  }

  return (
    <section className={styles.input}>
      <h2>Add Employee Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:{" "}
            <input
              type="text"
              value={firstName.value}
              onChange={(event) => {
                firstName.setValue(event.target.value);
                firstName.setMessages([]);
              }}
            />
          </label>
        </div>
        {firstName.messages.map((message) => (
          <p className={styles.error} key={message}>
            {message}
          </p>
        ))}
        <div>
          <label>
            Last Name:{" "}
            <input
              type="text"
              value={lastName.value}
              onChange={(event) => {
                lastName.setValue(event.target.value);
                lastName.setMessages([]);
              }}
            />
          </label>
        </div>
        {lastName.messages.map((message) => (
          <p className={styles.error} key={message}>
            {message}
          </p>
        ))}
        <div>
          <label>
            Role:{" "}
            <input
              type="text"
              value={role.value}
              onChange={(event) => {
                role.setValue(event.target.value);
                role.setMessages([]);
              }}
            />
          </label>
        </div>
        {role.messages.map((message) => (
          <p className={styles.error} key={message}>
            {message}
          </p>
        ))}
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <button type="submit" disabled={loading}>
            Add Role
          </button>
        </div>
      </form>
    </section>
  );
}
