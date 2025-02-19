import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './RegistrationForm.css'; // Import the CSS file for styles
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",  // Updated to include gender
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    axios
      .post("http://localhost:8083/user/register", formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
      toast.success("Registration Successful!");
    navigate("/login");
  };

  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="registration-form-container">
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
                    className="input-field"
                  />
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
                    className="input-field"
                  />
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
                    className="input-field"
                  />
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
                    className="input-field"
                  />
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
                    className="input-field"
                  />
                </Form.Group>

                {/* Gender Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
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
  );
};

export default RegistrationForm;
