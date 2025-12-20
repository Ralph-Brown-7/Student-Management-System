import React, { useEffect, useState } from "react";
import api from "../api";

const Grades = ({ userId, userRole }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await api.get("/grades");
        let data = res.data;

        if (userRole === "student") {
          data = data.filter(
            (g) => g.studentId && g.studentId._id === userId
          );
        }

        setGrades(data);
      } catch (err) {
        console.error("Failed to load grades", err);
      }
    };

    fetchGrades();
  }, [userId, userRole]);

  return (
    <div>
      <h2 className="mb-3">Grades</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Assignment</th>
            <th>Score</th>
            <th>Weight</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {grades.map((g) => (
            <tr key={g._id}>
              <td>{g.courseId?.name}</td>
              <td>{g.studentId?.name}</td>
              <td>{g.assignmentName}</td>
              <td>{g.score}</td>
              <td>{g.weight}</td>
              <td>
                {new Date(g.dateGraded).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades; // ✅ REQUIRED
