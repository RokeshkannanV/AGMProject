/* eslint-disable */
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; 
import { FaChevronLeft } from 'react-icons/fa'; 
import Modal from '../modelc/Model';
import "../pagess/StudentTable.css"; 

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
const auth = getAuth(app);

const StudentTable = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [college, setCollege] = useState("");
  const [parentNumber, setParentNumber] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const user = auth.currentUser;

  const fetchStudents = async () => {
    const studentCollection = collection(db, "aluminis");
    const studentQuery = query(studentCollection, orderBy("batch", "asc"));
    const studentSnapshots = await getDocs(studentQuery);
    const studentList = studentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setNumber(editingStudent.number);
      setBatch(editingStudent.batch);
      setDepartment(editingStudent.department);
      setCollege(editingStudent.college);
      setParentNumber(editingStudent.parentNumber);
    } else {
      resetForm();
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingStudent) {
      if (editingStudent.email.trim().toLowerCase() === user.email.trim().toLowerCase()) {
        await updateDoc(doc(db, "aluminis", editingStudent.id), {
          name,
          age,
          email: user.email,
          number,
          batch,
          department,
          college,
          parentNumber,
        });
        setEditingStudent(null);
        setModalMessage("Student data updated successfully!");
        setModalOpen(true);
      } else {
        setModalMessage("You can only edit your own data.");
        setModalOpen(true);
      }
    } else {
      await addDoc(collection(db, "aluminis"), {
        name,
        age,
        email: user.email,
        number,
        batch,
        department,
        college,
        parentNumber,
      });
      setModalMessage("Student added successfully!");
      setModalOpen(true);
    }

    resetForm();
    fetchStudents();
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setNumber("");
    setBatch("");
    setDepartment("");
    setCollege("");
    setParentNumber("");
  };

  const handleEditClick = (student) => {
    if (student.email.trim().toLowerCase() === user.email.trim().toLowerCase()) {
      setEditingStudent(student);
    } else {
      setModalMessage("You can only edit your own data.");
      setModalOpen(true);
    }
  };

  return (
    <div className="student-table">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/studentadd")}>
          <FaChevronLeft /> Back
        </button>
      </div>
      <h1 className="text-center">Student List</h1>
      <form onSubmit={handleSubmit}>
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
            id="email"
            value={user.email}
            disabled
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
        <button
  type="submit"
  className="docx"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",    // Center the button horizontally
    padding: "10px 20px", // Adjust padding for size
    marginTop: "20px",    // Optional: add some margin on top
  }}
>
  {editingStudent ? "Update Student" : "Add Student"}
</button>

        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />

      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
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
                <td data-label="Name">{student.name}</td>
                <td data-label="Email">{student.email}</td>
                <td data-label="Mobile Number">{student.number}</td>
                <td data-label="Batch">{student.batch}</td>
                <td data-label="Department">{student.department}</td>
                <td data-label="College">{student.college}</td>
                <td data-label="Parent Number">{student.parentNumber}</td>
                <td>
                  <button onClick={() => handleEditClick(student)}>
                    Edit
                  </button>
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



  


