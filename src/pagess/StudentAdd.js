/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./StudentAdd.css";
import "./StudentTable.css";
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import studentImage from "../pagess/Agaram_logo-removebg-preview.png";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Modal from '../modelc/Model';

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

const StudentAdd = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userEmail = user ? user.email : null;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("Hardware");
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const studentCollections = collection(db, "students");
      const studentsSnapshots = await getDocs(studentCollections);
      const studentList = studentsSnapshots.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => a.batch.localeCompare(b.batch)); // Sort by batch (older batches first)
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        // Only update if the email matches the logged-in user
        if (editingStudent.email === userEmail) {
          await updateDoc(doc(db, "students", editingStudent.id), {
            name,
            age: age || editingStudent.age,
            email: userEmail, // Update to logged-in user's email
            number,
            companyName: companyName || editingStudent.companyName,
            batch,
            type,
          });
          setEditingStudent(null);
        } else {
          setModalMessage("You can only edit your own data.");
          setIsModalOpen(true);
        }
      } else {
        await addDoc(collection(db, "students"), {
          name,
          number,
          batch,
          type,
          age, // Use the value from the form
          email: userEmail, // Set to logged-in user's email
          companyName, // Use the value from the form
        });
      }

      // After adding or editing, refetch the students to ensure sorting
      await fetchStudents();
      resetForm();
    } catch (error) {
      console.error("Error adding/updating student", error);
    }
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setEmail("");
    setNumber("");
    setCompanyName("");
    setBatch("");
    setType("Hardware");
  };

  const handleEdit = (student) => {
    // Allow editing only if the email matches the logged-in user
    if (student.email === userEmail) {
      setName(student.name);
      setAge(student.age);
      setEmail(student.email); // Set current email
      setNumber(student.number);
      setCompanyName(student.companyName);
      setBatch(student.batch);
      setType(student.type);
      setEditingStudent(student);
    } else {
      setModalMessage("You can only edit your own data.");
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <img src={studentImage} alt="Student" className="w-24 h-24" />
      </div>
      <button className="back-button" onClick={() => navigate("/home")}>
        <FaChevronLeft /> Back
      </button>
      <div className="studentname">
        <div className="cstyle table-container">
          <h1 className="yet-another-heading">MOM Helping Platform(Alumni's)</h1>
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
              <label htmlFor="number">Mobile Number :</label>
              <input
                type="text"
                placeholder="Mobile Number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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
              <label htmlFor="age">Age :</label>
              <input
                type="text"
                placeholder="Age"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                disabled // Email is set automatically and should not be edited
              />
            </div>
            <div className="form-control">
              <label htmlFor="companyName">Company Name :</label>
              <input
                type="text"
                placeholder="Company Name"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Type :</label>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap', // Ensures wrapping on small screens
                  gap: '5px', // Adds space between the radio buttons
                  justifyContent: 'flex-start', // Aligns items to the start
                }}
              >
                <label style={{ minWidth: '120px' }}>
                  <input
                    type="radio"
                    value="Hardware"
                    checked={type === "Hardware"}
                    onChange={() => setType("Hardware")}
                  />
                  Hardware
                </label>
                <label style={{ minWidth: '120px' }}>
                  <input
                    type="radio"
                    value="Software"
                    checked={type === "Software"}
                    onChange={() => setType("Software")}
                  />
                  Software
                </label>
                <label style={{ minWidth: '120px' }}>
                  <input
                    type="radio"
                    value="GovtSector"
                    checked={type === "GovtSector"}
                    onChange={() => setType("GovtSector")}
                  />
                  Govt Sector
                </label>
                <label style={{ minWidth: '120px' }}>
                  <input
                    type="radio"
                    value="Entrepreneur"
                    checked={type === "Entrepreneur"}
                    onChange={() => setType("Entrepreneur")}
                  />
                  Entrepreneur
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn1"
              style={{
                backgroundColor: "#007bff", // Blue background color
                color: "white", // White text color
                padding: "10px 20px", // Padding inside the button for spacing
                border: "none", // Remove borders
                borderRadius: "50px", // Rounded corners for the box
                fontSize: "16px", // Font size
                cursor: "pointer", // Pointer cursor on hover
                transition: "background-color 0.3s ease", // Smooth hover effect
              }}
            >
              {editingStudent ? "Update Alumni" : "Add Alumni"}
            </button>
          </form>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Batch</th>
                <th>Age</th>
                <th>Email</th>
                <th>Company Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.number}</td>
                  <td>{student.batch}</td>
                  <td>{student.age}</td>
                  <td>{student.email}</td>
                  <td>{student.companyName}</td>
                  <td>{student.type}</td>
                  <td>
                    <button className="btn1" onClick={() => handleEdit(student)}>Edit</button>
                    {/* <button className="btn1" onClick={() => handleDelete(student.id)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

<div className="button-group">
  <button className="btn" onClick={() => navigate("/attendance")}>
    Go to Student List
  </button>
</div>

        </div>
      </div>

      {/* Modal for messages */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </>
  );
};

export default StudentAdd;
