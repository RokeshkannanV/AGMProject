import React, { useState, useEffect } from "react";
// import { useState } from "react";
// import {app} from "../../src/firebase/firebase";
// import "../../src/firebase/firebase";
import "../pagess/StudentAdd.css";
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
// import AttendancePage from "./AttendancePage";
import { Link } from "react-router-dom";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../firebase/firebase";
// import {
//   doc,
//   addDoc,
//   collection,
//   updateDoc,
//   deleteDoc,
//   getDocs,
// } from "firebase/firestore";
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

const StudentAdd = () => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [altNumber, setAltNumber] = useState();
  const [batch, setBatch] = useState();
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

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
          batch,
        });
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === editingStudent.id
              ? { ...student, name, age, email, number, altNumber, batch }
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
          altNumber,
          batch,
        });
        const newStudent = {
          id: newStudentRef.id,
          name,
          age,
          email,
          number,
          altNumber,
          batch,
        };
        setStudents((prevStudents) => [...prevStudents, newStudent]);
        setName("");
        setAge("");
        setEmail("");
        setNumber("");
        setAltNumber("");
        setBatch("");
      }
    } catch (error) {
      console.error("Error adding student", error);
    }
  };
  const handleEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setEmail(student.email);
    setNumber(student.number);
    setAltNumber(student.altNumber);
    setBatch(student.batch);
    setEditingStudent(student);
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
    <div className="studentname">
      <div className="cstyle table-container">
        <h1 className="yet-another-heading">MOM Student Attendance List</h1>
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
            <label htmlFor="altNumber">Parent/Guardian Number :</label>
            <input
              type="text"
              placeholder="Parent/Guardian Number"
              id="altNumber"
              value={altNumber}
              onChange={(e) => setAltNumber(e.target.value)}
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
                  <th>Parent/Guardian Number</th>
                  <th>Batch</th>
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
                    <td>{student.altNumber}</td>
                    <td>{student.batch}</td>
                    <td>
                      <button onClick={() => handleEdit(student)}>Edit/</button>
                      <button onClick={() => handleDelete(student.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link to="/attendance">Go to Attendance Page</Link>
      </div>
    </div>
  );
};

export default StudentAdd;
