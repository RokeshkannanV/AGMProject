import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";
import { Routes, Route } from "react-router-dom";
import FirebaseCloud from "./pagess/FirebaseCloud";
import About from "./pagess/About";
import StudentAdd from "./pagess/StudentAdd";
import AttendancePage from "./pagess/AttendancePage";
import DocumentPage from "./pagess/DocumentPage";

function App({ students }) {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Register/>}/> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/firebasecloud" element={<FirebaseCloud />} />
          <Route path="/about" element={<About />} />
          <Route path="/studentadd" element={<StudentAdd />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/documents" element={<DocumentPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
