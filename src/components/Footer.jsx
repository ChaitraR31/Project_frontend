import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <footer className="text-white mt-9 py-1" style={{ backgroundColor: 'black' }}>
      <Container>
        <div className="text-center">
          <p className="mb-0">© {new Date().getFullYear()} InsuraPulse. All rights reserved.</p>
          <p>Made with 💙 by Our Team</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
