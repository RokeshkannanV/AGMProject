import React from "react";
import "../pagess/StudentTable.css";

const StudentTable = ({ students, isAdmin }) => {
  const handlePresentClick = () => {
    if (isAdmin) {
      // handlePresent(studentId);
      alert("Student Marked Present")
    } else {
      alert("Only Admins can mark attendance");
    }
  };

  const handleAbsentClick = () => {
    if (isAdmin) {
      // handleAbsent(studentId, altNumber);
      alert("Student marked as absent")
    } else {
      alert("Only Admins can mark attendance");
    }
  };

  return (
    <div className="table-wrapper">
      <h1 className="another-heading">Attendance-Sheet</h1>
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
                {isAdmin ? (
                  <>
                    <button onClick={() => handlePresentClick(student.id)}>
                      Present
                    </button>
                    <button
                      onClick={() =>
                        handleAbsentClick(student.id, student.altNumber)
                      }
                    >
                      Absent
                    </button>
                  </>
                ) : (
                  <span>Only admin can mark attendance</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
