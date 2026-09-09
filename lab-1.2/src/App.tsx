import Header from './component/header/header';
import Footer from './component/footer/footer';
import { DepartmentSection } from './component/department/departmentSection';
import departmentsData from './data/departments.json';

export default function App() {
  return (
    <>
      <Header />
      <DepartmentSection departments={departmentsData} />
      <Footer />
    </>
  );
}