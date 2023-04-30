import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://127.0.0.1:8000/v1/list-all.php')
      .then((res) => {
        setStudents(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert(err);
      });
  }, []);

  const deleteStudent = (e, id) => {
    e.preventDefault();
    let thisClicked = e.target;
    thisClicked.innerText = 'Deleting...';
    axios
      .get(`http://127.0.0.1:8000/v1/delete.php?id=${id}`)
      .then((res) => {
        thisClicked.closest('tr').remove();
        alert(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert(err);
      });
  };

  if (loading) return <Loading />;

  var studentDetails = '';

  if (students && students.length > 0) {
    studentDetails = students.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td>{item.course}</td>
          <td>
            <Link to={`/students/${item.id}/edit`} className="btn btn-success">
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteStudent(e, item.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Students List{' '}
                <Link
                  to="/students/create"
                  className="btn btn-primary float-end"
                >
                  Add Student
                </Link>
              </h4>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>NAME</td>
                      {/* <td>Course</td> */}
                      <td>Email</td>
                      <td>Phone</td>
                      <td>Course</td>
                      <td>Edit</td>
                      <td>Delete</td>
                    </tr>
                  </thead>
                  <tbody>{studentDetails}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
