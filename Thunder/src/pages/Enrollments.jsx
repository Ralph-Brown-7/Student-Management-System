import React, { useEffect, useState } from "react";
import api from "../api";

const Enrollments = ({ userId, userRole }) => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/enrollments");
        let data = res.data;

        // Students only see their enrollments
        if (userRole === "student") {
          data = data.filter(
            (e) => e.studentId && e.studentId._id === userId
          );
        }

        setEnrollments(data);
      } catch (err) {
        console.error("Failed to load enrollments", err);
      }
    };

    fetchEnrollments();
  }, [userId, userRole]);

  return (
    <div>
      <h2 className="mb-3">Enrollments</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map((e) => (
            <tr key={e._id}>
              <td>{e.courseId?.name}</td>
              <td>{e.studentId?.name}</td>
              <td>{e.status}</td>
              <td>
                {new Date(e.enrollmentDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollments; // ✅ THIS LINE IS REQUIRED
