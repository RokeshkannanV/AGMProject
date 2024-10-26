/* eslint-disable */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import Dashboard from "./pagess/Dashboard"; // Import the new Dashboard component
// import VoiceRecognition from "./components/speech/VoiceRecognition.tsx";
// import TextToSpeech from "./components/speech/TextToSpeech";
import { AuthProvider, useAuth } from "./contexts/authContext";
import StudentAdd from "./pagess/StudentAdd";
import StudentTable from "./pagess/StudentTable"; // Assuming this exists
import AttendancePage from "./pagess/AttendancePage";
import DocumentPage from "./pagess/DocumentPage";

const AppContent = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      <Header />
      <BrowserRouter basename="/AGMProject">
      <Routes>
        <Route path="/register" element={!userLoggedIn ? <Register /> : <Navigate to="/home" />} />
        <Route path="/login" element={!userLoggedIn ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={userLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={userLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/studentadd" element={userLoggedIn ? <StudentAdd /> : <Navigate to="/login" />} />
        <Route path="/studenttable" element={userLoggedIn ? <StudentTable /> : <Navigate to="/login" />} />
        <Route path="/attendance" element={userLoggedIn ? <AttendancePage /> : <Navigate to="/login" />} />
        <Route path="/documents" element={userLoggedIn ? <DocumentPage /> : <Navigate to="/login" />} />
        {/* <Route path="/reports" element={userLoggedIn ? <VoiceRecognition /> : <Navigate to="/login" />} />  */}
        <Route path="*" element={<Navigate to={userLoggedIn ? "/home" : "/login"} />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
