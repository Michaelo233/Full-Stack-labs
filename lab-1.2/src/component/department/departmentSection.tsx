export function DepartmentSection({ departments }) {
  return (
    <main>
      {departments.map((dept) => (
        <section key={dept.name} className="department">
          <h2>{dept.name}</h2>
          <ul>
            {dept.employees.map((emp, index) => (
              <li key={index}>{emp}</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}