/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaTable, FaFileAlt, FaChartBar } from "react-icons/fa";
import "./Dashboard.css"; // Link the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="text-center">Dashboard</h1>
      <div className="dashboard-icons">
        <Link to="/studentadd" className="dashboard-item add-student">
          <FaUserPlus size={50} />
          <p>Add Alumni</p>
        </Link>
        <Link to="/studenttable" className="dashboard-item view-students">
          <FaTable size={50} />
          <p>View Students</p>
        </Link>
        <Link to="/documents" className="dashboard-item documents">
          <FaFileAlt size={50} />
          <p>Documents</p>
        </Link>
        <Link to="/reports" className="dashboard-item reports">
          <FaChartBar size={50} />
          <p>SAssit</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
