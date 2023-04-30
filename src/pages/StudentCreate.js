import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const StudentCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: student.name,
      email: student.email,
      mobile: student.phone,
      course: student.course,
    };
    console.log(data);
    axios
      .post('http://127.0.0.1:8000/v1/create.php', data)
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
        console.log('alok' + err);
        alert(err);
      });
  };

  if (loading) return <Loading />;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Add Student
                <Link to="/students" className="btn btn-primary float-end">
                  Back
                </Link>
              </h4>
              <div className="card-body">
                <form onSubmit={saveStudent}>
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
                      name="phone"
                      value={student.phone}
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
                      Save
                    </button>
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

export default StudentCreate;
