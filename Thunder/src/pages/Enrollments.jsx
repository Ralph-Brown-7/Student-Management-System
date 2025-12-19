import React, { useEffect, useState } from 'react';
import api from '../api.js';

const Enrollments = ({ userId, userRole }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get('/enrollments');
        let data = res.data;

        if (userRole === 'student') data = data.filter(e => e.studentId === userId);
        else if (userRole === 'instructor') {
          const coursesRes = await api.get('/courses');
          const instructorCourses = coursesRes.data.filter(c => c.instructorId === userId).map(c => c.id);
          data = data.filter(e => instructorCourses.includes(e.courseId));
        }

        setEnrollments(data);
      } catch (err) {
        console.error('Failed to fetch enrollments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [userId, userRole]);

  if (loading) return <p>Loading enrollments...</p>;
  if (enrollments.length === 0) return <p>No enrollments found.</p>;

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-3">Enrollments</h1>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Course ID</th>
            <th>Student ID</th>
            <th>Status</th>
            <th>Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(e => (
            <tr key={e.id}>
              <td>{e.courseId}</td>
              <td>{e.studentId}</td>
              <td>{e.status}</td>
              <td>{new Date(e.enrollmentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollments;
