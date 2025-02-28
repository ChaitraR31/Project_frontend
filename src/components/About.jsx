import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { FaRegClipboard, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import Footer from './Footer';

const About = () => {
  return (
    <div style={{ marginTop: '50px' }}>
      <Container fluid className="about-container" style={{ padding: '50px ',marginLeft:'10px' }}>
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
        </Container>
        {/* New Developers Section */}
        <Container fluid className="about-container" style={{ padding: '50px ',marginLeft:'10px' }}>

        <Row className="mt-5">
          <Col md={12} className="text-center mb-4">
            <h1 style={{ fontSize: '3rem', color: '#343a40' }}>Meet Our Developers</h1>
            <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              Our team of skilled developers is passionate about creating innovative and efficient solutions. Here are the brilliant minds behind our web app:
            </p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={2} className="mb-4" >
            <Card className="shadow-sm" style={{ height: '580px' }}>
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Shivashankar M N</h5>
                <p><strong>Full Stack Developer in Java</strong></p>
                <Card.Text>
                  Shivashankar is a skilled developer specializing in full-stack development. With expertise in React and databases, he has played a pivotal role in building and optimizing our web application.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} className="mb-4">
            <Card className="shadow-sm" style={{ height: '580px' }}>
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Chaitra R</h5>
                <p><strong>Full Stack Developer in Java</strong></p>
                <Card.Text>
                  Chaitra has an eye for clean, user-friendly design. She has been instrumental in crafting the intuitive user interfaces that make our app easy to navigate for both patients and providers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} className="mb-4">
            <Card className="shadow-sm" style={{ height: '580px' }}>
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Tilottama Biswas ​</h5>
                <p><strong>Full Stack Developer in Java</strong></p>
                <Card.Text>
                  Tilottama has been working on the backend architecture of the web app, ensuring robust, scalable, and secure API integrations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} className="mb-4">
            <Card className="shadow-sm" style={{ height: '580px' }}>
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Pavan Kumar Badri ​</h5>
                <p><strong>Full Stack Developer in Java</strong></p>
                <Card.Text>
                  Pavan specializes in frontend technologies and is responsible for implementing beautiful, responsive UI components that enhance the user experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} className="mb-4">
            <Card className="shadow-sm" style={{ height: '580px' }}>
              <Card.Body className="text-center">
                <Image
                  src="https://via.placeholder.com/150"
                  roundedCircle
                  fluid
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="mt-3">Mathavan A​​</h5>
                            <p><strong>Full Stack Developer in Java</strong></p>
                <Card.Text>
                  Pavan ensures the quality of the app by implementing rigorous testing strategies and automation, ensuring a bug-free user experience.
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
