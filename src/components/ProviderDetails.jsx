import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Importing bookmark icons
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

function ProviderDetails() {
  const { providerName } = useParams();  // Accessing provider name from URL
  const [providerDetails, setProviderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // Search input state
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting to ascending
  const navigate = useNavigate(); // To navigate the user to login page

  // Function to add provider to bookmarks
  const addToBookmark = async (provider) => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!username) {
      // If the user is not logged in, redirect to the login page and store provider data for later
      sessionStorage.setItem("redirectAfterLogin", "true");
      sessionStorage.setItem("providerToBookmark", JSON.stringify(provider));
      toast.info("Please log in to bookmark this provider.");
      navigate("/login");
      return;
    }

    try {
      // Fetch existing bookmarks for the user
      const existingBookmarksResponse = await axios.get(
        `http://localhost:8085/bookmark/get/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const existingBookmarks = existingBookmarksResponse.data;

      // Check if the provider is already bookmarked
      const isBookmarked = existingBookmarks.some(
        (bookmark) => bookmark.id === provider.id
      );

      if (isBookmarked) {
        toast.info("This provider is already bookmarked!");
        return;
      }

      // Add the provider to bookmarks
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

      // Update the state of provider details to reflect the bookmark
      setProviderDetails((prevDetails) =>
        prevDetails.map((item) =>
          item.id === provider.id ? { ...item, isBookmarked: true } : item
        )
      );

      toast.success("Provider bookmarked successfully!");
      navigate("/bookmarked-patients");

    } catch (err) {
      toast.error(`Error: ${err.response?.data?.message || "Failed to add bookmark"}`);
    }
  };

  // Function to handle successful login and bookmark the provider
  const handleLoginSuccess = () => {
    const provider = JSON.parse(sessionStorage.getItem("providerToBookmark"));
    if (provider) {
      // Add the provider to bookmarks after login
      addToBookmark(provider);
      // Remove from sessionStorage after it's added
      sessionStorage.removeItem("providerToBookmark");
    }
  };

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3232/treatments?insurance_provider=${providerName}`);
        setProviderDetails(response.data);
      } catch (err) {
        setError('Failed to fetch provider details');
        console.error('Error fetching provider details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderDetails();
  }, [providerName]);

  useEffect(() => {
    // Check if there's a redirect flag and handle login success
    if (sessionStorage.getItem("redirectAfterLogin") === "true") {
      handleLoginSuccess();
      sessionStorage.removeItem("redirectAfterLogin");
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Toggle sort order (ascending/descending)
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Filter and sort provider details based on search and sortOrder
  const filteredAndSortedProviders = providerDetails
    .filter((item) => {
      const searchTerm = search.toLowerCase();
      return (
        item.medical_Condition.toLowerCase().includes(searchTerm) 
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.billing_amount - b.billing_amount;
      } else {
        return b.billing_amount - a.billing_amount;
      }
    });

  return (
<div style={{ backgroundImage:'url(https://wallpapers.com/images/hd/white-gradient-background-1920-x-1080-xyhud3481qjd0s8s.jpg)'}}>
<div className="container mt-4" >
      <h3 className="text-center mb-4" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '70px' }}>
        Details for {providerName}
      </h3>
      <Form className="mb-4">
        <Form.Group controlId="search" style={{ paddingLeft: '20px', paddingTop: '10px' }}>
          <Form.Label>Search by Medical Condition </Form.Label>
          <Form.Control
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search"
            style={{ maxWidth: '300px' }}
          />
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={toggleSortOrder} className="mb-4" style={{ marginLeft: '20px' }}>
        Sort by Billing Amount ({sortOrder === "asc" ? "Low to High" : "High to Low"})
      </Button>
      
      <Row>
        {filteredAndSortedProviders.length > 0 ? (
          filteredAndSortedProviders.map((item, index) => (
            <Col key={index} md={4} lg={3} className="mb-4">
              <Card className="shadow-lg hover-shadow" style={{ borderRadius: '15px' ,height: '190px', width: '100%'}}>
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold' }}>{item.medical_Condition}</Card.Title>
                  <Card.Text style={{ color: 'black' }}>Hospital: {item.hospital}</Card.Text>
                  <Card.Text style={{ color: 'black' }}>Billing-Amount: {item.billing_amount.toFixed(2)}</Card.Text>

                  {/* Bookmark icon */}
                  <Button
                    variant="link"
                    className="p-0 mb-2"
                    onClick={() => addToBookmark(item)}
                    style={{
                      color: item.isBookmarked ? "#28a745" : "#007bff", // Green if bookmarked
                    }}
                  >
                    {item.isBookmarked ? (
                      <FaBookmark size={24} />
                    ) : (
                      <FaRegBookmark size={24} />
                    )}
                    {item.isBookmarked ? ' Bookmarked' : ' Bookmark'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Alert variant="warning" className="w-100 text-center">
            No provider details found.
          </Alert>
        )}
      </Row>
    </div>
    </div>
  );
}

export default ProviderDetails;
