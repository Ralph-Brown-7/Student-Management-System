import React, { useEffect, useState } from "react";
import { getEnrollments } from "../services/enrollments";

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    getEnrollments()
      .then(setEnrollments)
      .catch(console.error);
  }, []);

  return (
    <div className="container p-4">
      <h2>Enrollments</h2>
      {enrollments.map((e) => (
        <p key={e._id}>{e.student}</p>
      ))}
    </div>
  );
}
