import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './RegistrationForm.css'; // Import the CSS file for styles
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    // Password validation (min 6 characters)
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation (check for valid email format)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Stop submission if there are validation errors
    }

    console.log("Form Data:", formData);
    axios
      .post("http://localhost:8087/user/register", formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    toast.success("Registration Successful!");
    navigate("/login");
  };

  return (
    <div>

    <div style={{
      backgroundImage: "url('https://static.investindia.gov.in/s3fs-public/2019-05/Insurance1.jpg')",
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    }}>
      <Container className="mt-5"  >
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="registration-form-container" >
              <h3 className="text-center mb-4">Register</h3>
              <Form onSubmit={handleSubmit}>
                {/* Username Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`input-field ${errors.username ? 'is-invalid' : ''}`}
                  />
                  {errors.username && <div className="error">{errors.username}</div>}
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field ${errors.password ? 'is-invalid' : ''}`}
                  />
                  {errors.password && <div className="error">{errors.password}</div>}
                </Form.Group>

                {/* First Name Field */}
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`input-field ${errors.firstName ? 'is-invalid' : ''}`}
                  />
                  {errors.firstName && <div className="error">{errors.firstName}</div>}
                </Form.Group>

                {/* Last Name Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`input-field ${errors.lastName ? 'is-invalid' : ''}`}
                  />
                  {errors.lastName && <div className="error">{errors.lastName}</div>}
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </Form.Group>

                {/* Gender Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`input-field ${errors.gender ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                  {errors.gender && <div className="error">{errors.gender}</div>}
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100 submit-button">
                  Register
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />

    </div>
      <Footer />
    </div>
  );
};

export default RegistrationForm;
