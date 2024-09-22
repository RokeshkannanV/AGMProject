/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../pagess/StudentAdd.css";
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
import Modal from '../modelc/Model'; // Import the Modal component

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        await updateDoc(doc(db, "students", editingStudent.id), {
          name,
          age,
          email,
          number,
          companyName,
          batch,
          type,
        });
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === editingStudent.id
              ? { ...student, name, age, email, number, companyName, batch, type }
              : student
          )
        );
        setEditingStudent(null);
      } else {
        const newStudentRef = await addDoc(collection(db, "students"), {
          name,
          age,
          email,
          number,
          companyName,
          batch,
          type,
        });
        const newStudent = {
          id: newStudentRef.id,
          name,
          age,
          email,
          number,
          companyName,
          batch,
          type,
        };
        setStudents((prevStudents) => [...prevStudents, newStudent]);
        resetForm();
      }
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
              <label htmlFor="age">Age :</label>
              <input
                type="text"
                placeholder="Age"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <label htmlFor="companyName">Company Name :</label>
              <input
                type="text"
                placeholder="Company Name"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label>Type :</label>
              <div>
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
              </div>
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
            <button type="submit" className="btn">
              {editingStudent ? "Update Student" : "Add Student"}
            </button>
          </form>
          {students && students.length > 0 && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Company Name</th>
                    <th>Batch</th>
                    <th>Type</th>
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
                      <td>{student.companyName}</td>
                      <td>{student.batch}</td>
                      <td>{student.type}</td>
                      <td>
                        <button onClick={() => handleEdit(student)}>Edit</button>
                        {/* <button onClick={() => handleDelete(student.id)}>Delete</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button className="btn">
            <Link to="/attendance">Go to Student List</Link>
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
    </>
  );
};

export default StudentAdd;
