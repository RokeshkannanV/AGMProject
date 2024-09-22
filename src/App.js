/* eslint-disable */
import React, { useEffect } from "react";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider, useAuth } from "./contexts/authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentAdd from "./pagess/StudentAdd";
import AttendancePage from "./pagess/AttendancePage";
import DocumentPage from "./pagess/DocumentPage";

const AppContent = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={!userLoggedIn ? <Register /> : <Navigate to="/home" />} />
        <Route path="/login" element={!userLoggedIn ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={userLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/studentadd" element={userLoggedIn ? <StudentAdd /> : <Navigate to="/login" />} />
        <Route path="/attendance" element={userLoggedIn ? <AttendancePage /> : <Navigate to="/login" />} />
        <Route path="/documents" element={userLoggedIn ? <DocumentPage /> : <Navigate to="/login" />} />
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
