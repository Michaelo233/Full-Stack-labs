// import { useState } from 'react'
import { Employees } from './components/features/employees/Employees'
import { Footer } from './components/layout/footer/Footer'
import { Header } from './components/layout/header/Header'
import { useDepartments } from './types/useDepartment'
import { AddEmployees } from './components/features/form/AddEmployeeForm'

function App() {
  const { departments, handleAddEmployee } = useDepartments();

  return (
    <>
      <Header />
      <Employees departments={departments} />
      <AddEmployees departments={departments} onAddEmployee={handleAddEmployee} />
      <Footer />
    </>
  );
}

export default App;