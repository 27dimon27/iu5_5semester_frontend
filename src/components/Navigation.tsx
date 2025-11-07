import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ROUTES, ROUTE_LABELS } from '../routes';
import { useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <Navbar 
      bg="custom" 
      variant="dark" 
      expand="lg"
      style={{ 
        backgroundColor: isHomePage ? 'transparent' : '#76B900', 
        height: '64px',
        position: isHomePage ? 'absolute' : 'static',
        top: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'background-color 0.3s ease'
      }}
    >
      <Container>
        <LinkContainer to={ROUTES.HOME}>
          <Navbar.Brand style={{ 
            color: '#fff',
            textShadow: isHomePage ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
          }}>
            Разработка ПО
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={ROUTES.HOME}>
              <Nav.Link style={{ 
                color: '#fff',
                textShadow: isHomePage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
              }}>
                {ROUTE_LABELS.HOME}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={ROUTES.SERVICES}>
              <Nav.Link style={{ 
                color: '#fff',
                textShadow: isHomePage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
              }}>
                {ROUTE_LABELS.SERVICES}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .navbar-custom {
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