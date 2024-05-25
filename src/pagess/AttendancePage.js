// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import StudentTable from "./StudentTable";
// import "../pagess/AttendancePage.css";
// import axios from "axios";

// const firebaseConfig = {
//   // Your Firebase config
//   apiKey: "AIzaSyDpKf7LcVyz8uPbhHzojfVq7WmbSE_Xkts",
//   authDomain: "firstagm-b0094.firebaseapp.com",
//   projectId: "firstagm-b0094",
//   storageBucket: "firstagm-b0094.appspot.com",
//   messagingSenderId: "37339568694",
//   appId: "1:37339568694:web:746209597a08606ea8d697",
//   measurementId: "G-NT1Z9B5XHZ"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// const AttendancePage = () => {
//   const [students, setStudents] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(true);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const studentCollections = collection(db, "students");
//       const studentsSnapshots = await getDocs(studentCollections);
//       const studentList = studentsSnapshots.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setStudents(studentList);
//     };
//     fetchStudents();
//   }, []);

//   const handlePresent = (studentId) => {
//     console.log(`Marking student with ID ${studentId} as present`);
//     // Implement logic to mark student as present
//   };

//   const handleAbsentWithSMS = async (studentId, parentNumber) => {
//     console.log(
//       `Marking student with ID ${studentId} as absent and sending SMS to ${parentNumber}`
//     );
//     try {
//       const response = await axios.post("http://localhost:3000/send-sms", {
//         phoneNumber: parentNumber,
//         message: "Your child is absent today.",
//       });
//       console.log("SMS sent successfully", response.data);
//       // Handle further actions if needed
//     } catch (error) {
//       console.error("Error sending SMS:", error);
//     }
//   };

//   const toggleAdminStatus = () => {
//     setIsAdmin(!isAdmin);
//   };

//   return (
//     <div className="attendance-page">
//       <button onClick={toggleAdminStatus} className="toggle">
//         Toggle Admin Status
//       </button>
//       <StudentTable
//         students={students}
//         isAdmin={isAdmin}
//         handlePresent={handlePresent}
//         handleAbsent={handleAbsentWithSMS}
//       />
//     </div>
//   );
// };

// export default AttendancePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Import db from your Firebase configuration
import StudentTable from "./StudentTable";
import "../pagess/AttendancePage.css";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    // Fetch students from Firestore or your database
    // Example:
    // fetchStudentsFromDatabase();
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

  const handlePresent = (studentId) => {
    console.log(`Marking student with ID ${studentId} as present`);
    // Implement logic to mark student as present
  };

  const handleAbsentWithSMS = async (studentId, parentNumber) => {
    console.log(
      `Marking student with ID ${studentId} as absent and sending SMS to ${parentNumber}`
    );

    // Send SMS using Twilio API
    try {
      const response = await axios.post("/send-sms", {
        phoneNumber: parentNumber,
        message: "Your child is absent today.",
      });
      console.log("SMS sent successfully", response.data);
      // Handle further actions if needed
    } catch (error) {
      console.error("Error sending SMS:", error);
      // Handle error
    }
  };

  const toggleAdminStatus = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="attendance-page">
      <button onClick={toggleAdminStatus} className="toggle">
        Toggle Admin Status
      </button>
      <StudentTable
        students={students}
        isAdmin={isAdmin}
        handlePresent={handlePresent}
        handleAbsent={handleAbsentWithSMS} // Assuming handleAbsent is for sending SMS
      />,
      <Link to = '/documents'>
      <button>
      Document Page
      </button>
      </Link>
    </div>
  );
};

export default AttendancePage;

