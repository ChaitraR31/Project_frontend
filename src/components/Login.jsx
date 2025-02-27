import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { FaEyeSlash } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";

function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // If a token exists, skip the login process and navigate accordingly
      navigate("/bookmarked-patients", { replace: true });

      const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");

      if (redirectAfterLogin) {
        const provider = JSON.parse(sessionStorage.getItem("patientToBookmark"));
        if (provider) {
          // addToBookMark(provider);
          // sessionStorage.removeItem("patientToBookmark");
          console.log("Patient to bookmark after login: ", provider);
        }
        sessionStorage.removeItem("redirectAfterLogin");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addToBookMark = async (patient) => {
    const token = sessionStorage.getItem("token");
    try {
      // Get existing bookmarks for the user
      const existingBookmarksResponse = await axios.get(
        `http://localhost:8085/bookmark/get/${formData.username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const existingBookmarks = existingBookmarksResponse.data;

      // Check if the bookmark already exists
      const isBookmarked = existingBookmarks.some(
        (bookmark) => bookmark.id === patient.id
      );

      if (isBookmarked) {
        // If the bookmark already exists, show a message
        toast.info("This patient is already bookmarked!");
        return;
      }

      // Proceed to add the bookmark if it doesn't already exist
      await axios.post(
        `http://localhost:8085/bookmark/add_bookmark`,
        {
          age: patient.age,
          gender: patient.gender,
          bloodType: patient.blood_type,
          medicalCondition: patient.medical_Condition,
          dateAdmission: patient.date_admission,
          doctor: patient.doctor,
          hospital: patient.hospital,
          insuranceProvider: patient.insurance_provider,
          billingAmount: patient.billing_amount,
          roomNumber: patient.room_number,
          admissionType: patient.admission_type,
          dischargeDate: patient.discharge_date,
          medication: patient.medication,
          testResult: patient.test_results,
          id: patient.id,
          userName: formData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Patient bookmarked successfully!");
    } catch (err) {
      toast.error(`Error: ${err.response?.data?.message || "Failed to add bookmark"}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8089/authuser/login", formData)
      .then((response) => {
        const token = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(formData));  // Store under "user" key
        sessionStorage.setItem("username", formData.username);  // Store under "user" key
        login(token, formData);  // Pass user data along with token
        toast.success("Login Successful!");

        axios
          .get(`http://localhost:8085/bookmark/get/${formData.username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((bookmarkResponse) => {
            const bookmarks = bookmarkResponse.data;

            if (bookmarks && bookmarks.length > 0) {
              navigate("/bookmarked-patients", { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          })
          .catch((error) => {
            toast.error("Error fetching bookmarks.");
            console.error(error);
            navigate("/", { replace: true });
          });

        // const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
        // if (redirectAfterLogin) {
        //   const patientData = JSON.parse(sessionStorage.getItem("patientToBookmark"));
        //   if (patientData) {
        //     addToBookMark(patientData);
        //     toast.success("Patient bookmarked successfully after login!");
        //   }
        //   sessionStorage.removeItem("patientToBookmark");
        // }
      })
      .catch((error) => {
        toast.error("Login Failed! Please check your credentials.");
        console.error(error);
      });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div>
    <div className="login-container" 
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color:"black"
    }}
    >


      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="login-box"
              style={{
                //background: "#f8f9fa",  // Soft white-grey background
                background: '#fbfbfb',
                opacity: 0.9,
            
                borderRadius: "15px",
                padding: "30px",
                
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  // Light shadow for depth
                border: "1px solid #e0e0e0",  // Soft border

                

              }}>
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        borderColor: showPassword ? "#28a745" : "#007bff", // Border color based on visibility
                        padding: "5px", // Adjust padding for compactness
                        borderRadius: "0 20px 20px 0", // Rounded corners on the right side
                        backgroundColor: "#f1f1f1", // Light background
                        width: "40px", // Fixed width to fit the button size with input
                        display: "flex", // Flexbox to center the icon
                        alignItems: "center", // Vertically center
                        justifyContent: "center", // Horizontally center
                        height: "38px", // Ensure button height matches input height
                      }}
                    >
                      {showPassword ? (
                        <i className="fa fa-eye-slash" style={{ color: "#007bff", fontSize: "18px" }} /> // Closed eye
                      ) : (
                        <i className="fa fa-eye" style={{ color: "black", fontSize: "18px" }} /> // Open eye
                      )}
                    </Button>

                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <Button variant="link" onClick={handleForgotPassword}>
                  Forgot Password?
                </Button>
                <br />
                <Button variant="link" onClick={handleCreateAccount}>
                  Create New Account
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />

    </div >
    <Footer/>
    </div>

  );
}

export default Login;
