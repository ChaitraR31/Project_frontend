import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function BookmarkedPatients() {
  const [bookmarkedPatients, setBookmarkedPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showUpdateDeleteButtons, setShowUpdateDeleteButtons] = useState(false); // New state to manage button visibility
  const [search, setSearch] = useState(""); // Search input state
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting to ascending
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = sessionStorage.getItem("token");
      if (token) {
        const username = sessionStorage.getItem("username");
        if (username) {
          try {
            const response = await axios.get(`http://localhost:8085/bookmark/get/${username}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Fetched Bookmarked Patients: ", response.data);
            setBookmarkedPatients(response.data);
            setFilteredPatients(response.data); // Initially set filtered list to all patients

            const provider = JSON.parse(sessionStorage.getItem("providerToBookmark"));
            sessionStorage.removeItem("providerToBookmark");
            console.log("Provider to bookmark after login: ", provider);
            if (provider) {
              console.log("Provider to bookmark after login: ", provider);
              // Add the provider to bookmarks after login
              await axios.post(
                `http://localhost:8085/bookmark/add_bookmark`,
                {
                  age: provider.age,
                  gender: provider.gender,
                  bloodType: provider.blood_type,
                  medicalCondition: provider.medical_Condition,
                  dateAdmission: provider.date_admission,
                  doctor: provider.doctor,
                  hospital: provider.hospital,
                  insuranceProvider: provider.insurance_provider,
                  billingAmount: provider.billing_amount,
                  roomNumber: provider.room_number,
                  admissionType: provider.admission_type,
                  dischargeDate: provider.discharge_date,
                  medication: provider.medication,
                  testResult: provider.test_results,
                  id: provider.id,
                  userName: username,
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              // Remove from sessionStorage after it's added
              sessionStorage.removeItem("providerToBookmark");
            }
          } catch (error) {
            console.error("Error fetching bookmarked patients:", error);
          }
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Filter patients based on search
    let filtered = bookmarkedPatients;
    if (search) {
      filtered = filtered.filter(
        (patient) =>
          patient.medicalCondition.toLowerCase().includes(search.toLowerCase()) ||
          patient.insuranceProvider.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort the filtered list based on sortOrder
    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.billingAmount - b.billingAmount;
      } else {
        return b.billingAmount - a.billingAmount;
      }
    });

    setFilteredPatients(filtered); // Set the filtered and sorted list
  }, [search, sortOrder, bookmarkedPatients]);

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

  const handleDelete = (patient) => {
    const token = sessionStorage.getItem("token"); // Get token from sessionStorage
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

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Toggle sort order (ascending/descending)
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div style={{ marginTop: "50px" ,backgroundColor:'skyblue',backgroundImage:'url(https://img.freepik.com/premium-vector/blue-white-gradient-color-background-with-copy-space-graphic-design_120819-1342.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      <Form className="mb-4">
        <Form.Group  controlId="search"style={{paddingLeft:'20px', paddingTop:'50px'}} >
          <Form.Label >Search by Medical Condition or Insurance Provider</Form.Label>
          <Form.Control
            type="text"
            
            value={search}
            onChange={handleSearchChange}
            placeholder="Search"
            style={{ maxWidth: '300px'}}
          />
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={toggleSortOrder} className="mb-4" style={{marginLeft:'20px'}}>
        Sort by Billing Amount ({sortOrder === "asc" ? "Low to High" : "High to Low"})
      </Button>

      <Row>
        {filteredPatients.map((patient) => (
          <Col md={4} key={patient.bookmarkId} className="mb-4">
            <Card style={{marginLeft:'20px', marginRight:'5px'}}>
              <Card.Body >
                <Card.Title>{patient.medicalCondition}</Card.Title>
                <Card.Text>
                  <strong>Billing Amount:</strong> {patient.billingAmount}
                  <br />
                  <strong>Hospital:</strong> {patient.hospital}
                  <br />
                  <strong>Insurance Provider:</strong> {patient.insuranceProvider}
                  <br />
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
              <p><strong>Billing Amount:</strong> {selectedPatient.billingAmount}</p>
              <p><strong>Blood Type:</strong> {selectedPatient.bloodType}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {showUpdateDeleteButtons && selectedPatient?.bookmarkId === selectedPatient?.bookmarkId && (
            <>
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
