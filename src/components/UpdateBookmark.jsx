import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, Form } from "react-bootstrap";

function UpdateBookmark() {
  const { userName, bookmarkId } = useParams(); // Get userName and bookmarkId from URL
  const { state } = useLocation(); // Get patient data passed via location.state
  const [updatedPatient, setUpdatedPatient] = useState({ userName: "", test_results: "", medication: "", doctor: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Log the data to check what's being received
  useEffect(() => {
    console.log("Received userName from params:", userName);
    console.log("State patient:", state?.patient);
  
    if (state?.patient) {
      setUpdatedPatient(state.patient); // Set updatedPatient if state.patient is available
    } else {
      setUpdatedPatient((prevState) => ({
        ...prevState,
        userName: userName, // If no state.patient, set userName from URL params
      }));
    }
  }, [userName, state]);
  

  // Handle the update
  const handleUpdate = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const updatedUserData = { ...updatedPatient };
      await axios.put(
        `http://localhost:8085/bookmark/update/${userName}/${bookmarkId}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Bookmark updated successfully!");
      navigate("/bookmarked-patients");
    } catch (error) {
      toast.error("Failed to update bookmark!");
    } finally {
      setLoading(false);
    }
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Update Bookmark Details</h3>
      <Form>
        <Form.Group controlId="formUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={updatedPatient.userName || ""}
            onChange={handleChange}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formTestResult">
          <Form.Label>Test Result</Form.Label>
          <Form.Control
            type="text"
            name="testResult"
            value={updatedPatient.testResult || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formMedication">
          <Form.Label>Medication</Form.Label>
          <Form.Control
            type="text"
            name="medication"
            value={updatedPatient.medication || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDoctor">
          <Form.Label>Doctor</Form.Label>
          <Form.Control
            type="text"
            name="doctor"
            value={updatedPatient.doctor || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </Form>

    </div>
    
  );
}      <ToastContainer />


export default UpdateBookmark;
