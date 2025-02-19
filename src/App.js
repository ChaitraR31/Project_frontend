import "./App.css";
import Header from "./components/Header";
import PatientList from "./components/PatientList";
import "bootstrap/dist/css/bootstrap.css";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import GetUser from "./components/GetUser";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Counter from "./components/Counter";
import { ErrorBoundary } from "react-error-boundary";
import BuggyComponent from "./components/BuggyComponent";
import ErrorFallback from "./components/ErrorFallback";
import { useState } from "react";
import './components/Header.css'; // Import the new CSS file for styles

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BookmarkedPatients from "./components/BookmarkedPatients";
import DeleteBookmark from "./components/DeleteBookmark";
import UpdateBookmark from "./components/UpdateBookmark";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [errorKey, setErrorKey] = useState(0);
  return (
    <div>
      {/* <Header />
      <PatientList />
      <RegistrationForm />
      <Login></Login>
      <GetUser></GetUser>
      <UpdateUser></UpdateUser>
      <DeleteUser></DeleteUser>
      <Counter></Counter>
      <div>
            <h1>React Error Boundary Example</h1>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => setErrorKey(prevKey => prevKey + 1)}
            >
                <BuggyComponent key={errorKey} />
            </ErrorBoundary>
        </div> */}


      <BrowserRouter>
        <Header />
        {/* <Sidebar /> */}

        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="getUser" element={<ProtectedRoute><GetUser /></ProtectedRoute>} />
          <Route path="UpdateUser" element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/bookmarked-patients" element={<BookmarkedPatients />} />

          <Route path="/delete-bookmark/:userName/:bookmarkId" component={DeleteBookmark} />
          <Route path="/update-bookmark/:userName/:bookmarkId" element={<UpdateBookmark />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/change-password/:username" element={<ChangePasswordPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
