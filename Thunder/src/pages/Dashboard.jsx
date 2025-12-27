import React from "react";

const Dashboard = ({ userId, userRole }) => {
  return (
    <div className="container-fluid p-4">
      <h1 className="mb-3">Dashboard</h1>
      <p className="text-muted">
        User ID: {userId || "N/A"} — Role: {userRole || "N/A"}
      </p>

      <div className="row g-3">
        <div className="col-md-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h6>Total Students</h6>
              <h3>120</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h6>Active Courses</h6>
              <h3>8</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <h6>Annual Budget</h6>
              <h3>$1.5M</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white h-100">
            <div className="card-body">
              <h6>Pending Approvals</h6>
              <h3>3</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
