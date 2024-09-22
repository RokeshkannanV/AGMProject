/* eslint-disable */
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Assuming db is imported from firebase configuration
import StudentTable from "./StudentTable";
import "../pagess/AttendancePage.css";
import stuImage from "../pagess/Agaram_logo-removebg-preview.png";

// If you have handlePresent and handleAbsentWithSMS defined elsewhere, make sure to import them here

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentCollections = collection(db, "students");
      const studentsSnapshots = await getDocs(studentCollections);
      const studentList = studentsSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  const toggleAdminStatus = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <>
    <div className="flex justify-center">
    <img src={stuImage} alt="Student" className="w-24 h-24" />
  </div>
    <div className="attendance-page">
      {/* <button onClick={toggleAdminStatus} className="toggle">
        Toggle Admin Status
      </button> */}
      {/* Ensure StudentAdd component is properly imported */}
      {/* <StudentAdd /> */}
       <StudentTable
        students={students}
        isAdmin={isAdmin}
        // Pass handlePresent and handleAbsentWithSMS as props if defined
        // handlePresent={handlePresent}
        // handleAbsent={handleAbsentWithSMS}
      />
      
    </div>
    </>
  );
};

export default AttendancePage;
