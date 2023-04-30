import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Student from '../pages/Student';
import StudentCreate from '../pages/StudentCreate';
import StudentEdit from '../pages/StudentEdit';

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/students" element={<Student />} />
      <Route path="/students/create" element={<StudentCreate />} />
      <Route path="/students/:id/edit" element={<StudentEdit />} />
    </Routes>
  );
};

export default MyRouter;
