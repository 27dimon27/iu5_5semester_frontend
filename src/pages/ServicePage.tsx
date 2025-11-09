import React from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../hooks/useCart';
import { useService } from '../hooks/useService';
import { useBidIcon } from '../hooks/useBidIcon';
import { CartIcon } from '../components/CartIcon';
import { IMAGE_BASE_URL } from '../config/api';
import { useImageError } from '../hooks/useImageError';

export const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { service, loading, error } = useService(id);
  const { itemCount } = useBidIcon();
  const { handleImageError } = useImageError();

  const handleAddToCart = () => {
    if (service) {
      addToCart(service);
    }
  };

  if (loading) {
    return (
      <Container>
        <Breadcrumbs crumbs={[
          { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
          { label: 'Загрузка...' }
        ]} />
        <div className="text-center py-5">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
          <p>Загрузка услуги...</p>
        </div>
      </Container>
    );
  }

  if (error || !service) {
    return (
      <Container>
        <Breadcrumbs crumbs={[
          { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
          { label: 'Ошибка' }
        ]} />
        <Row className="my-4">
          <Col className="text-center py-5">
            <h2>Услуга не найдена</h2>
            <p className="text-muted mb-4">
              {error || 'Запрошенная услуга не существует'}
            </p>
            <Link to={ROUTES.SERVICES}>
              <Button variant="primary">Вернуться к услугам</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs crumbs={[
        { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
        { label: service.title }
      ]} />

      <Row className="my-4 align-items-center">
        <Col>
          <h2>{service.title}</h2>
        </Col>
        <Col xs="auto">
          <div className="d-flex align-items-center gap-3">
            <CartIcon itemCount={itemCount} />
          </div>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={6}>
          <Card className="service-image-card">
            <div className="service-image-container">
              <Card.Img 
                src={`${IMAGE_BASE_URL}/software-images/${service.image}`}
                alt={service.title}
                className="service-detail-img"
                onError={handleImageError}
              />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="service-info-body">
              <Card.Title className="h3 mb-4">{service.title}</Card.Title>
              <Card.Text className="lead mb-4">
                {service.description}
              </Card.Text>
              <div className="d-flex gap-2 mt-3">
                <Button 
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  style={{
                    backgroundColor: "#76B900",
                    border: "none",
                  }}
                >
                  Добавить в корзину
                </Button>
                <Link to={ROUTES.SERVICES}>
                  <Button variant="outline-secondary" size="lg">
                    Назад к услугам
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .service-image-card {
          height: 100%;
        }
        
        .service-image-container {
          height: 100%;
          padding: 8%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          border-radius: 0.375rem 0.375rem 0 0;
        }
        
        .service-detail-img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          border-radius: 4px;
        }
        
        .service-info-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .service-detail-container {
            flex-direction: column;
          }
          .service-image-container {
            height: 250px;
          }
        }
      `}</style>
    </Container>
  );
};