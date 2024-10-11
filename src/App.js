/* eslint-disable */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider, useAuth } from "./contexts/authContext";
import StudentAdd from "./pagess/StudentAdd";
import AttendancePage from "./pagess/AttendancePage";
import DocumentPage from "./pagess/DocumentPage";

const AppContent = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        {/* Redirect to Home if logged in, otherwise show Register */}
        <Route path="/register" element={!userLoggedIn ? <Register /> : <Navigate to="/home" />} />
        {/* Redirect to Home if logged in, otherwise show Login */}
        <Route path="/login" element={!userLoggedIn ? <Login /> : <Navigate to="/home" />} />
        {/* Show Home if logged in, otherwise redirect to Login */}
        <Route path="/home" element={userLoggedIn ? <Home /> : <Navigate to="/login" />} />
        {/* Show StudentAdd if logged in, otherwise redirect to Login */}
        <Route path="/studentadd" element={userLoggedIn ? <StudentAdd /> : <Navigate to="/login" />} />
        {/* Show AttendancePage if logged in, otherwise redirect to Login */}
        <Route path="/attendance" element={userLoggedIn ? <AttendancePage /> : <Navigate to="/login" />} />
        {/* Show DocumentPage if logged in, otherwise redirect to Login */}
        <Route path="/documents" element={userLoggedIn ? <DocumentPage /> : <Navigate to="/login" />} />
        {/* Redirect to /home or /login based on user authentication */}
        <Route path="*" element={<Navigate to={userLoggedIn ? "/home" : "/login"} />} />
      </Routes>
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
