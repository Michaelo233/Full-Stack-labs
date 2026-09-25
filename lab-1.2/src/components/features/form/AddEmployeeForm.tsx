import React, { useState } from "react";
import type { Department } from "../../../types/department";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  departmentName?: string;
}

interface AddEmployeesProps {
  departments: Department[];
  onAddEmployee: (firstName: string, lastName: string, departmentName: string) => void;
}

export function AddEmployees({ departments, onAddEmployee }: AddEmployeesProps) {
  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Validation Errors State
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (firstName.trim().length < 3) {
      newErrors.firstName = "First name must be at least 3 characters long.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (lastName.trim().length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters long.";
    }
    if (!selectedDepartment) {
      newErrors.departmentName = "Please select a department.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAddEmployee(firstName.trim(), lastName.trim(), selectedDepartment);

    // Reset form inputs and clear errors
    setFirstName("");
    setLastName("");
    setSelectedDepartment("");
    setErrors({});
  };

  return (
    <section>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <p>
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <p>
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.name} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentName && (
            <p >
              {errors.departmentName}
            </p>
          )}
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}