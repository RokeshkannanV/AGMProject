/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./StudentAdd.css";
import "./StudentTable.css";
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
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
  const [userEmail, setUserEmail] = useState(null);
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    fetchStudents();
    return () => unsubscribe();
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
        .sort((a, b) => a.batch.localeCompare(b.batch));
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        if (editingStudent.email === userEmail) {
          await updateDoc(doc(db, "students", editingStudent.id), {
            name,
            age: age || editingStudent.age,
            email: userEmail,
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
          age,
          email: userEmail,
          companyName,
        });
      }
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
    if (student.email === userEmail) {
      setName(student.name);
      setAge(student.age);
      setEmail(student.email);
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
                disabled
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
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="Hardware"
                    checked={type === "Hardware"}
                    onChange={() => setType("Hardware")}
                  />
                  Hardware
                </label>
                <label>
                  <input
                    type="radio"
                    value="Software"
                    checked={type === "Software"}
                    onChange={() => setType("Software")}
                  />
                  Software
                </label>
                <label>
                  <input
                    type="radio"
                    value="Govt Sector"
                    checked={type === "Govt Sector"}
                    onChange={() => setType("Govt Sector")}
                  />
                  Govt Sector
                </label>
                <label>
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
  className="btn-submit"
  style={{
    backgroundColor: '#007bff', // Blue background color
    color: 'white', // White text color
    padding: '10px 20px', // Padding for better size
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    fontSize: '16px', // Font size
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} // Darker blue on hover
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')} // Original blue on mouse leave
>
  {editingStudent ? "Update Alumni" : "Add Alumni"}
</button>

          </form>

          <div className="table-container">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Batch</th>
        <th>Mobile Number</th>
        <th>Email</th>
        <th>Company</th>
        <th>Type</th> {/* Added 'Type' column */}
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.name}</td> {/* Mapped Name properly */}
          <td>{student.batch}</td> {/* Mapped Batch properly */}
          <td>{student.number}</td> {/* Mapped Mobile Number properly */}
          <td>{student.email}</td> {/* Mapped Email properly */}
          <td>{student.companyName}</td> {/* Mapped Company Name properly */}
          <td>{student.type}</td> {/* Mapped Type properly */}
          <td>
            <button className="btn edit-btn" onClick={() => handleEdit(student)}>
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
 <button style={{
    backgroundColor: '#007bff', // Blue background color
    color: 'white', // White text color
    padding: '10px 20px', // Padding for better size
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    fontSize: '16px', // Font size
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} // Darker blue on hover
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')} // Original blue on mouse leave
>
  <Link to="/attendance">
  Go to Student List
  </Link>
 </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
    </>
  );
};

export default StudentAdd;
