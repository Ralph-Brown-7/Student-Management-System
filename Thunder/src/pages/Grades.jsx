import React, { useEffect, useState } from "react";
import { getGrades } from "../services/grades";

export default function Grades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getGrades()
      .then(setGrades)
      .catch(console.error);
  }, []);

  return (
    <div className="container p-4">
      <h2>Grades</h2>
      {grades.map((g) => (
        <p key={g._id}>
          {g.student} — {g.score}
        </p>
      ))}
    </div>
  );
}
