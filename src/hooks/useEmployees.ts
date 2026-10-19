import { useEffect, useState } from "react";
import { addEmployeeService } from "../services/employeeServices";
import type { AddEmployeeForm, Department } from "../types/department";

export function useEmployees() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadDepartments() {
      try {
        const loadedDepartments =
          await addEmployeeService.getAllDepartments();

        if (!ignore) {
          setDepartments(loadedDepartments);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to load departments.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDepartments();

    return () => {
      ignore = true;
    };
  }, []);

  async function addEmployee(input: AddEmployeeForm): Promise<boolean> {
    setError(null);

    try {
      const updatedDepartment =
        await addEmployeeService.addEmployee(input);

      setDepartments((current) =>
        current.map((department) =>
          department.id === updatedDepartment.id
            ? updatedDepartment
            : department,
        ),
      );

      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to add employee.",
      );

      return false;
    }
  }

  return {
    departments,
    loading,
    error,
    addEmployee,
  };
}
