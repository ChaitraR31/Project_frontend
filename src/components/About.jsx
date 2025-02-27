import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { FaRegClipboard, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import Footer from './Footer';

const About = () => {
  return (
    <div style={{ marginTop: '50px' }}>
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
        
        {/* New Developers Section */}
        <Row className="mt-5">
          <Col md={12} className="text-center mb-4">
            <h1 style={{ fontSize: '3rem', color: '#343a40' }}>Meet Our Developers</h1>
            <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              Our team of skilled developers is passionate about creating innovative and efficient solutions. Here are the brilliant minds behind our web app:
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150" // Placeholder image, replace with real images
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Shivashankar M N</h5>
                <p className="text-muted">Lead Developer</p>
                <Card.Text>
                  Shivashankar is a skilled developer specializing in full-stack development. With expertise in React, Node.js, and databases, he has played a pivotal role in building and optimizing our web application.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Shashti D B</h5>
                <p className="text-muted">UI/UX Designer</p>
                <Card.Text>
                  Shashti has an eye for clean, user-friendly design. She has been instrumental in crafting the intuitive user interfaces that make our app easy to navigate for both patients and providers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Developer 3</h5>
                <p className="text-muted">Backend Developer</p>
                <Card.Text>
                  Developer 3 has been working on the backend architecture of the web app, ensuring robust, scalable, and secure API integrations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Developer 4</h5>
                <p className="text-muted">Frontend Developer</p>
                <Card.Text>
                  Developer 4 specializes in frontend technologies and is responsible for implementing beautiful, responsive UI components that enhance the user experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Developer 5</h5>
                <p className="text-muted">QA Engineer</p>
                <Card.Text>
                  Developer 5 ensures the quality of the app by implementing rigorous testing strategies and automation, ensuring a bug-free user experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
