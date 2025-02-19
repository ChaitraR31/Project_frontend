import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function BookmarkedPatients() {
  const [bookmarkedPatients, setBookmarkedPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showUpdateDeleteButtons, setShowUpdateDeleteButtons] = useState(false); // New state to manage button visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const username = localStorage.getItem("username");
      if (username) {
        axios
          .get(`http://localhost:8085/bookmark/get/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Fetched Bookmarked Patients: ", response.data);
            setBookmarkedPatients(response.data);
          })
          .catch((error) => {
            console.error("Error fetching bookmarked patients:", error);
          });
      }
    }
  }, []);
  
  const handleViewMore = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
    setShowUpdateDeleteButtons(true); // Show Update and Delete buttons when "View More" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
    setShowUpdateDeleteButtons(false); // Hide buttons when modal is closed
  };

  const handleUpdate = (patient) => {
    if (patient && patient.userName && patient.bookmarkId) {
      navigate(`/update-bookmark/${patient.userName}/${patient.bookmarkId}`, { state: { patient } });
    } else {
      console.error("Invalid patient data for update.");
    }
  };

  const handleDelete = (patient) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      axios
        .delete(`http://localhost:8085/bookmark/delete_bookmark/${patient.userName}/${patient.bookmarkId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header with token
          },
        })
        .then(() => {
          // Update the state by removing the deleted bookmark from the list
          setBookmarkedPatients((prev) =>
            prev.filter((item) => item.bookmarkId !== patient.bookmarkId)
          );
          handleCloseModal(); // Close the modal after deleting
          toast.success("Bookmark deleted successfully!");
        })
        .catch((error) => {
          // Log any error that occurs during the delete request
          console.error("Error deleting bookmark:", error);
        });
    }
  };
  

  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        {bookmarkedPatients.map((patient) => (
          <Col md={4} key={patient.bookmarkId} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{patient.medicalCondition}</Card.Title>
                <Card.Text>
                  <strong>Age:</strong> {patient.age} <br />
                  <strong>Hospital:</strong> {patient.hospital}<br/>
                  <strong>Insurance Provider:</strong> {patient.insuranceProvider}<br/>
                  <strong>Doctor:</strong> {patient.doctor}
                </Card.Text>
                <Button className="btn btn-primary" onClick={() => handleViewMore(patient)}>
                  View More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for showing more patient details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <div>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
              <p><strong>Medical Condition:</strong> {selectedPatient.medicalCondition}</p>
              <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
              <p><strong>Hospital:</strong> {selectedPatient.hospital}</p>
              <p><strong>Insurance Provider:</strong> {selectedPatient.insuranceProvider}</p>
              <p><strong>Test Result:</strong> {selectedPatient.testResult}</p>
              <p><strong>Room Number:</strong> {selectedPatient.roomNumber}</p>
              <p><strong>Admission Type:</strong> {selectedPatient.admissionType}</p>
              <p><strong>Medication:</strong> {selectedPatient.medication}</p>
              <p><strong>Discharge Date:</strong> {selectedPatient.dischargeDate}</p>
              <p><strong>Blood Type:</strong> {selectedPatient.bloodType}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {showUpdateDeleteButtons && selectedPatient?.bookmarkId === selectedPatient?.bookmarkId && (
            <>
              <Button className="btn btn-warning" onClick={() => handleUpdate(selectedPatient)}>
                Update Bookmark
              </Button>
              <Button className="btn btn-danger" onClick={() => handleDelete(selectedPatient)}>
                Delete Bookmark
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookmarkedPatients;
