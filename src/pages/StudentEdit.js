import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const StudentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({});

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      id: student.id,
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      course: student.course,
    };
    console.log(data);
    axios
      .post('http://127.0.0.1:8000/v1/update.php', data)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data.status) {
          alert(res.data.message);
          navigate('/students');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/v1/single-student-by-get-method.php?id=${id}`)
      .then((res) => {
        console.log(res.data.data);
        setStudent(res.data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (Object.keys(student).length === 0) {
    return (
      <div className="container">
        <h4>No Such student id found.</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Student
                <Link to="/students" className="btn btn-primary float-end">
                  Back
                </Link>
              </h4>
              <div className="card-body">
                <form onSubmit={updateStudent}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={student.name}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={student.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="mobile"
                      value={student.mobile}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Course</label>
                    <input
                      type="text"
                      name="course"
                      value={student.course}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update Student
                    </button>
                    <input type="hidden" name="id" value={student.id} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEdit;
