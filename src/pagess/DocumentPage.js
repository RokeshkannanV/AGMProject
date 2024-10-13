/* eslint-disable */
import React, { useState, useEffect } from "react";
import { storage, db } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "../pagess/DocumentPage.css";
import stImage from "../pagess/Agaram_logo-removebg-preview.png";
import { doc, setDoc, getDocs, collection, query } from "firebase/firestore";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaChevronLeft } from 'react-icons/fa'; // Import chevron left icon

function DocumentPage() {
  const navigate = useNavigate(); // Hook for navigation
  const [fileUpload, setFileUpload] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [coordinator, setCoordinator] = useState("");
  const [subCoordinator, setSubCoordinator] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [dateLocked, setDateLocked] = useState(false);

  const filesListRef = ref(storage, "files/");

  const uploadFile = () => {
    if (!fileUpload || uploading || !coordinator || !subCoordinator) return;
    setUploading(true);
    const fileId = uuidv4();
    const fileRef = ref(storage, `files/${uuidv4()}_${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const fileData = {
            url,
            type: getFileType(fileUpload.type),
            name: fileUpload.name,
            coordinator,
            subCoordinator,
            date: selectedDate.toDateString(),
          };
          saveFileData(fileId, fileData);
          setFilePreviews((prevPreviews) => [
            ...prevPreviews,
            fileData,
          ]);
          setUploading(false);
          setDateLocked(true);
        });
      })
      .catch((error) => {
        console.error("Error file uploading", error);
        setUploading(false);
      });
  };

  const saveFileData = async (fileId, fileData) => {
    const docRef = doc(db, "files", fileId);
    try {
      await setDoc(docRef, fileData);
    } catch (error) {
      console.error("Error saving file data:", error);
    }
  };

  const getFileType = (fileType) => {
    if (!fileType) {
      return "other";
    } else if (fileType.startsWith("image/")) {
      return "image";
    } else if (fileType === "application/pdf") {
      return "pdf";
    } else {
      return "other";
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const q = query(collection(db, "files"));
      const querySnapshot = await getDocs(q);
      const fileData = querySnapshot.docs.map(doc => doc.data());
      setFilePreviews(fileData);
    };
    fetchFiles().catch(error => {
      console.error("Error fetching files:", error);
    });
  }, []);

  // Function to add class to the current date
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      return (date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()) ? 'current-date' : null;
    }
    return null;
  };

  return (
    <>
      <button className="back-button" onClick={() => navigate("/home")}>
        <FaChevronLeft /> Back
      </button>
      <div className="flex justify-center">
        <img src={stImage} alt="Agaram Foundation" className="w-24 h-24" />
      </div>
      <h1 className="heading">Welcome to Document Page</h1>
      
      {/* Calendar Component */}
      <div className="calendar-container">
        <Calendar
          onChange={dateLocked ? null : setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          className="calendar"
        />
      </div>
      
      {/* Show upload form only if a date is selected */}
      {selectedDate && (
        <div className="container">
          <h2>Selected Date: {selectedDate.toDateString()}</h2>
          {dateLocked ? (
            <p>This date is locked. You cannot change it.</p>
          ) : (
            <button onClick={() => setShowUpload(!showUpload)}>
              {showUpload ? "Hide Upload Form" : "Upload File"}
            </button>
          )}

          {showUpload && (
            <div className="docx">
              <input
                type="file"
                onChange={(event) => {
                  setFileUpload(event.target.files[0]);
                }}
              />
              <input
                type="text"
                placeholder="Coordinator"
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
              />
              <input
                type="text"
                placeholder="Sub-Coordinator"
                value={subCoordinator}
                onChange={(e) => setSubCoordinator(e.target.value)}
              />
              <button
                onClick={uploadFile}
                disabled={!fileUpload || uploading || !coordinator || !subCoordinator}
              >
                {uploading ? "Uploading..." : "Upload File"}
              </button>
              <button onClick={() => {
                setShowUpload(false);
                setFileUpload(null);
                setCoordinator("");
                setSubCoordinator("");
              }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* File Previews with Selected Date */}
      <div className="file-previews">
        {filePreviews.map((preview, index) => (
          <div key={index} className="file-preview">
            {preview.type === "image" && (
              <img src={preview.url} alt={`Preview ${index + 1}`} />
            )}
            {preview.type === "pdf" && (
              <iframe src={preview.url} title={`PDF ${index + 1}`} />
            )}
            {preview.type === "other" && (
              <a
                href={preview.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {preview.name}
              </a>
            )}
            <div>
              <p>Coordinator: {preview.coordinator}</p>
              <p>Sub Coordinator: {preview.subCoordinator}</p>
              <p>Date: {preview.date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DocumentPage;
