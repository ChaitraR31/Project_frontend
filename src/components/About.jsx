import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { FaRegClipboard, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <Container fluid className="about-container" style={{ padding: '50px 0' }}>
      <Row>
        <Col md={12} className="text-center mb-4">
          <h1 style={{ fontSize: '3rem', color: '#343a40' }}>About Our Web App</h1>
          <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
            Our web app is designed to streamline the insurance process, increase efficiency, and provide a seamless experience for both patients and insurance providers.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="text-center" style={{ backgroundColor: '#f8f9fa' }}>
              <FaUsers size={40} color="#007bff" />
              <h5>Insurance Providers</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Our platform allows easy management of various insurance providers. By integrating insurance data seamlessly, we ensure quick access to relevant information, saving valuable time and effort for all stakeholders.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="text-center" style={{ backgroundColor: '#f8f9fa' }}>
              <FaMoneyBillWave size={40} color="#28a745" />
              <h5>Cost Efficiency</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                With our app, insurance claim processing is more cost-effective. By automating manual tasks and reducing the need for paperwork, we help insurance providers save on administrative costs while improving turnaround times for claims.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="text-center" style={{ backgroundColor: '#f8f9fa' }}>
              <FaRegClipboard size={40} color="#ffc107" />
              <h5>Streamlined Process</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Our system simplifies the insurance claim and patient management process. With easy access to medical data, billing details, and claim statuses, we empower both patients and providers to stay informed at all stages.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="shadow-sm mb-4" style={{ backgroundColor: '#007bff', color: 'white' }}>
            <Card.Body>
              <h2>Why Choose Us?</h2>
              <p style={{ fontSize: '1.1rem' }}>
                Our web app is designed with efficiency, transparency, and security in mind. We help you reduce the complexities of insurance claims and provide a clear overview of patient billing and insurance details. Whether you're a provider or a patient, our platform aims to bring clarity and speed to the insurance workflow.
              </p>
              <Button variant="light" size="lg" href="/contact" style={{ marginTop: '20px' }}>
                Contact Us for More Information
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mt-5">
          <h4>Key Benefits</h4>
          <ListGroup className="text-left" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ListGroup.Item><strong>Faster Claim Processing</strong> - Claims are processed in minutes, not days.</ListGroup.Item>
            <ListGroup.Item><strong>Cost Savings</strong> - Reduces administrative overhead for insurance providers.</ListGroup.Item>
            <ListGroup.Item><strong>Better Patient Experience</strong> - Patients have real-time access to their insurance and billing information.</ListGroup.Item>
            <ListGroup.Item><strong>Efficient Data Management</strong> - All patient and insurance data are stored securely and easily accessible.</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
