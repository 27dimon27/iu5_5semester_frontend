import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { ROUTES } from '../routes';

// Импортируем GIF напрямую
import mainGif from '../assets/main.gif';

export const HomePage: React.FC = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Фоновое изображение */}
      <div
        style={{
          backgroundImage: `url(${mainGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      />
      
      {/* Затемнение и размытие фона */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          zIndex: 1
        }}
      />
      
      {/* Контент */}
      <Container fluid style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
        <Row className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <Col xs={12} md={8} lg={6} className="text-center text-white">
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Разработка ПО
            </h1>
            <p className="lead" style={{ 
              fontSize: '1.5rem', 
              marginBottom: '2.5rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              Профессиональные услуги по разработке программного обеспечения
            </p>
            {/* <Link to={ROUTES.SERVICES}>
              <Button 
                variant="primary" 
                size="lg"
                style={{
                  padding: '15px 40px',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  backgroundColor: '#76B900',
                  border: 'solid 1px white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                Посмотреть услуги
              </Button>
            </Link> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};