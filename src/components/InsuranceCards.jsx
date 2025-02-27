import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert, Carousel } from 'react-bootstrap';
import { FaHeart, FaStar, FaShieldAlt, FaHome, FaHandshake } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function InsuranceCards() {
  const [insuranceProviders, setInsuranceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [relatedData, setRelatedData] = useState({ diseases: [], hospitals: [] });
  const navigate = useNavigate();  // Use navigate instead of history

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await axios.get('http://localhost:3232/treatments');
        const providers = response.data.map(item => item.insurance_provider);
        const uniqueProviders = [...new Set(providers)];
        const sortedProviders = uniqueProviders.sort();
        setInsuranceProviders(sortedProviders);
      } catch (err) {
        setError('Failed to fetch insurance providers');
        console.error('Error fetching insurance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  const fetchRelatedData = async (provider) => {
    try {
      const response = await axios.get(`http://localhost:3232/treatments?insurance_provider=${provider}`);
      const medicalConditions = response.data.map(item => item.medical_Condition);
      const hospitals = response.data.map(item => item.hospital);

      const uniqueConditions = [...new Set(medicalConditions)];
      const uniqueHospitals = [...new Set(hospitals)];

      setRelatedData({
        diseases: uniqueConditions,
        hospitals: uniqueHospitals
      });
    } catch (err) {
      setError('Failed to fetch related data');
      console.error('Error fetching related data:', err);
    }
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    fetchRelatedData(provider);
    navigate(`/insurance-details/${provider}`);  // Navigate to the provider details page
  };

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
  const isLoggedIn = sessionStorage.getItem("token"); // Check if user is logged in by checking the token

  return (
    <div className="container" style={{ marginTop: '90px' }}>
        {/* Information Section */}
        {isLoggedIn && (

        <div className="info-section">
        <Row className="align-items-center mb-5">
          <Col md={6}>
          <img src="https://media.istockphoto.com/id/1226082621/photo/insurance-concept-stack-of-wooden-blocks-with-words-life-health-legal-expenses-business-house.jpg?s=612x612&w=0&k=20&c=5bKk7pRl9jewZM_nmIquyGOj4Q7BVNiYRcJC9H1smfE=" alt="Healthcare Professionals" className="img-fluid" />

          </Col>
          <Col md={6}>
            <h3>Medicare Information</h3>
            <p><a href="https://www.aetna.com/" target="_blank">Aetna</a> - Aetna provides comprehensive health insurance plans, with resources for seniors and people with disabilities to enroll in Medicare.</p>
            <p><a href="https://www.bcbs.com/" target="_blank">BlueCross</a> - Offers a wide variety of health insurance plans, focusing on nationwide coverage and preventive care options.</p>
            <p><a href="https://www.uhc.com/" target="_blank">UnitedHealthCare</a> - Provides a range of health insurance plans, with an emphasis on access to healthcare services and wellness programs.</p>
            <p><a href="https://www.medicare.gov/" target="_blank">MediCare</a> - A government portal providing information for seniors and people with disabilities to sign up for Medicare and explore benefits.

</p>
            <p><a href="https://www.cigna.com/" target="_blank">Cigna</a> - Offers health insurance plans with a focus on well-being, including medical, dental, and behavioral health coverage.</p>

          </Col>
        </Row>
      </div>
      )}
      <Carousel interval={2000} controls={false} indicators={false} fade>
      {insuranceProviders.length > 0 ? (
        // Split insuranceProviders into groups of 2
        Array.from({ length: Math.ceil(insuranceProviders.length / 2) }).map((_, index) => {
          const firstProvider = insuranceProviders[index * 2];
          const secondProvider = insuranceProviders[index * 2 + 1];

          return (
            <Carousel.Item key={index}>
              <Row className="justify-content-center">
                {/* First Card */}
                {firstProvider && (
                  <Col md={4} lg={3} className="mb-4">
                    <Card
                      className="text-center shadow-lg hover-shadow"
                      style={{ borderRadius: '15px', cursor: 'pointer' }}
                      onClick={() => handleProviderClick(firstProvider)}
                    >
                      <Card.Body>
                        <div
                          className="card-icon"
                          style={{
                            fontSize: '30px',
                            marginBottom: '10px',
                            color: '#007bff',
                          }}
                        >
                          {index % 5 === 0 ? (
                            <FaHeart />
                          ) : index % 5 === 1 ? (
                            <FaStar />
                          ) : index % 5 === 2 ? (
                            <FaShieldAlt />
                          ) : index % 5 === 3 ? (
                            <FaHome />
                          ) : (
                            <FaHandshake />
                          )}
                        </div>
                        <Card.Title style={{ fontWeight: 'bold' }}>
                          {firstProvider}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                )}

                {/* Second Card */}
                {secondProvider && (
                  <Col md={4} lg={3} className="mb-4">
                    <Card
                      className="text-center shadow-lg hover-shadow"
                      style={{ borderRadius: '15px', cursor: 'pointer' }}
                      onClick={() => handleProviderClick(secondProvider)}
                    >
                      <Card.Body>
                        <div
                          className="card-icon"
                          style={{
                            fontSize: '30px',
                            marginBottom: '10px',
                            color: '#007bff',
                          }}
                        >
                          {index % 5 === 0 ? (
                            <FaHeart />
                          ) : index % 5 === 1 ? (
                            <FaStar />
                          ) : index % 5 === 2 ? (
                            <FaShieldAlt />
                          ) : index % 5 === 3 ? (
                            <FaHome />
                          ) : (
                            <FaHandshake />
                          )}
                        </div>
                        <Card.Title style={{ fontWeight: 'bold' }}>
                          {secondProvider}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
            </Carousel.Item>
          );
        })
      ) : (
        <div>No insurance providers available</div>
      )}
    </Carousel>

      {selectedProvider && (
        <div className="mt-4">
          <h3 className="text-center mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>Related Information for {selectedProvider}</h3>

          <div className="row">
            <div className="col-md-6">
              <h5 className="mb-3">Diseases:</h5>
              <ul style={{ listStyleType: 'square' }}>
                {relatedData.diseases.length > 0 ? (
                  relatedData.diseases.map((disease, index) => <li key={index}>{disease}</li>)
                ) : (
                  <li>No related diseases found</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InsuranceCards;
