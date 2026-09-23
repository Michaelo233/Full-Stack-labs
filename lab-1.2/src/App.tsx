import Layout from './components/layout/Layout'
import { Employees } from './components/features/employees/Employees'
import { Organization } from './components/features/employeeRoles/employeeRole'
import { Route , Routes } from 'react-router-dom'

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/employee" element={<Employees />} />
          <Route path="/organization" element={<Organization />} />
        </Routes>
      </Layout>
  )
}

export default App;