import React, { useEffect, useState } from 'react';
import api from '../api.js';

const Grades = ({ userId, userRole }) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await api.get('/grades');
        let data = res.data;

        if (userRole === 'student') data = data.filter(g => g.studentId === userId);
        else if (userRole === 'instructor') {
          const coursesRes = await api.get('/courses');
          const instructorCourses = coursesRes.data.filter(c => c.instructorId === userId).map(c => c.id);
          data = data.filter(g => instructorCourses.includes(g.courseId));
        }

        setGrades(data);
      } catch (err) {
        console.error('Failed to fetch grades:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, [userId, userRole]);

  if (loading) return <p>Loading grades...</p>;
  if (grades.length === 0) return <p>No grades found.</p>;

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-3">Grades</h1>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Course ID</th>
            <th>Student ID</th>
            <th>Assignment</th>
            <th>Score</th>
            <th>Weight</th>
            <th>Date Graded</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(g => (
            <tr key={g.id}>
              <td>{g.courseId}</td>
              <td>{g.studentId}</td>
              <td>{g.assignmentName}</td>
              <td>{g.score}</td>
              <td>{g.weight}%</td>
              <td>{new Date(g.dateGraded).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
