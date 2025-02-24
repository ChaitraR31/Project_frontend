import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
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

  return (
    <div className="container">
      <Row className="mb-4">
        {insuranceProviders.length > 0 ? (
          insuranceProviders.map((provider, index) => (
            <Col md={4} lg={3} key={index} className="mb-4">
              <Card className="text-center shadow-lg hover-shadow" style={{ borderRadius: '15px', cursor: 'pointer' }} onClick={() => handleProviderClick(provider)}>
                <Card.Body>
                  <div className="card-icon" style={{ fontSize: '30px', marginBottom: '10px', color: '#007bff' }}>
                    {index % 5 === 0 ? <FaHeart /> : index % 5 === 1 ? <FaStar /> : index % 5 === 2 ? <FaShieldAlt /> : index % 5 === 3 ? <FaHome /> : <FaHandshake />}
                  </div>
                  <Card.Title style={{ fontWeight: 'bold' }}>{provider}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No insurance providers available</div>
        )}
      </Row>

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
