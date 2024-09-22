/* eslint-disable */
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaChevronLeft } from 'react-icons/fa'; // Import chevron left icon
import "../pagess/StudentTable.css";
import stImage from "../pagess/Agaram_logo-removebg-preview.png"; // Make sure to import your image

const firebaseConfig = {
  apiKey: "AIzaSyDpKf7LcVyz8uPbhHzojfVq7WmbSE_Xkts",
  authDomain: "firstagm-b0094.firebaseapp.com",
  projectId: "firstagm-b0094",
  storageBucket: "firstagm-b0094.appspot.com",
  messagingSenderId: "37339568694",
  appId: "1:37339568694:web:746209597a08606ea8d697",
  measurementId: "G-NT1Z9B5XHZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const StudentTable = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [college, setCollege] = useState("");
  const [parentNumber, setParentNumber] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentCollection = collection(db, "aluminis");
      const studentSnapshots = await getDocs(studentCollection);
      const studentList = studentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStudent) {
      await updateDoc(doc(db, "aluminis", editingStudent.id), {
        name,
        age,
        email,
        number,
        batch,
        department,
        college,
        parentNumber,
      });
      setEditingStudent(null);
    } else {
      await addDoc(collection(db, "aluminis"), {
        name,
        age,
        email,
        number,
        batch,
        department,
        college,
        parentNumber,
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setEmail("");
    setNumber("");
    setBatch("");
    setDepartment("");
    setCollege("");
    setParentNumber("");
  };

  return (
    <div className="student-table">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/studentadd")}>
          <FaChevronLeft /> Back
        </button>
        {/* <img src={stImage} alt="Logo" className="logo" />  */}
      </div>
      <h1 className="text-center">Student List</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="form-control">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="batch">Batch :</label>
          <input
            type="text"
            placeholder="Batch"
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="number">Contact No :</label>
          <input
            type="text"
            placeholder="Contact No"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="department">Department :</label>
          <input
            type="text"
            placeholder="Department"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="college">College :</label>
          <input
            type="text"
            placeholder="College"
            id="college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="parentNumber">Parent No :</label>
          <input
            type="text"
            placeholder="Parent No"
            id="parentNumber"
            value={parentNumber}
            onChange={(e) => setParentNumber(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="docx">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>

      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Batch</th>
              <th>Department</th>
              <th>College</th>
              <th>Parent Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td>{student.number}</td>
                <td>{student.batch}</td>
                <td>{student.department}</td>
                <td>{student.college}</td>
                <td>{student.parentNumber}</td>
                <td>
                  <button onClick={() => setEditingStudent(student)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
      <div className="button-container">
        <Link to="/documents">
          <button className="docx">Document Page</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentTable;
