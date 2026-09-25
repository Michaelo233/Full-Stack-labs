import { useState } from "react";
import type { Department } from "./department";
// import DepartmentData from "../data/departments.json";
import departmentData from "../data/departments";
export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>(departmentData);

  const handleAddEmployee = (firstName: string, lastName: string, departmentName: string) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) => {
        if (dept.name === departmentName) {
          return {
            ...dept,
            employees: [...dept.employees, { firstName, lastName }],
          };
        }
        return dept;
      })
    );
  };

  return {
    departments,
    handleAddEmployee,
  };
}