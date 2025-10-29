import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ROUTES, ROUTE_LABELS } from '../routes';

export const Navigation: React.FC = () => {
  return (
    <Navbar 
      bg="custom" 
      variant="dark" 
      expand="lg"
      style={{ 
        backgroundColor: '#76B900', 
        height: '64px',
      }}
    >
      <Container>
        <LinkContainer to={ROUTES.HOME}>
          <Navbar.Brand>
            Разработка ПО
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={ROUTES.HOME}>
              <Nav.Link>
                {ROUTE_LABELS.HOME}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={ROUTES.SERVICES}>
              <Nav.Link>
                {ROUTE_LABELS.SERVICES}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .navbar-custom {
          background-color: #76B900 !important;
          height: 64px;
        }
        .navbar-brand {
          font-size: 1.5rem !important;
        }
        .nav-link {
          font-size: 1rem !important;
        }
        .navbar-nav .nav-link {
          padding: 0.5rem 1rem;
        }
      `}</style>
    </Navbar>
  );
};