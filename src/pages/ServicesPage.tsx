import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTE_LABELS } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../hooks/useCart';
import { useServices } from '../hooks/useServices';
import { useBidIcon } from '../hooks/useBidIcon';
import { CartIcon } from '../components/CartIcon';

// Импортируем локальное фото по умолчанию
import defaultServiceImage from '../assets/defaultService.png';

export const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const { addToCart, itemCount } = useCart();
  const { services, loading, error } = useServices();
  const { loading: bidIconLoading } = useBidIcon();

  const filteredServices = useMemo(() => {
    if (!activeSearch) return services;
    return services.filter(service =>
      service.title.toLowerCase().includes(activeSearch.toLowerCase())
    );
  }, [activeSearch, services]);

  const handleSearch = () => {
    setActiveSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveSearch('');
  };

  // Функция для обработки ошибок загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultServiceImage;
  };

  if (loading) {
    return (
      <Container>
        <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
        <div className="text-center py-5">
          <p>Загрузка услуг...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
        <div className="text-center py-5">
          <p className="text-danger">Ошибка загрузки: {error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
      
      <Row className="my-4 align-items-center">
        <Col>
          <h2>Услуги</h2>
        </Col>
        <Col xs="auto">
          <div className="d-flex align-items-center gap-3">
            <CartIcon itemCount={bidIconLoading ? 0 : itemCount} />
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Введите название услуги для поиска..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button 
              variant="outline-secondary" 
              onClick={handleSearch}
            >
              Найти
            </Button>
            {activeSearch && (
              <Button 
                variant="outline-danger" 
                onClick={handleClearSearch}
              >
                Сбросить
              </Button>
            )}
          </InputGroup>
          {activeSearch && (
            <div className="mt-2">
              <small className="text-muted">
                Результаты поиска по: "{activeSearch}"
              </small>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        {filteredServices.map(service => (
          <Col key={service.id} lg={4} md={6} className="mb-4">
            <Card className="h-100 service-card">
              <div className="service-card-image-container">
                <Card.Img 
                  variant="top" 
                  src={`http://localhost:9000/software-images/${service.image}`}
                  className="service-card-img"
                  onError={handleImageError}
                />
              </div>
              <Card.Body className="service-card-body">
                <Card.Title className="service-card-title">
                  {service.title}
                </Card.Title>
                <Card.Text className="service-card-description">
                  {service.description.slice(0, 100)}...
                </Card.Text>
                <div className="service-card-actions">
                  <Link to={`/services/${service.id}`} className="flex-fill">
                    <Button variant="outline-primary" size="sm" className="w-100" style={{
                      color: "#76B900",
                      border: "solid 1px #76B900",
                    }}>
                      Подробнее
                    </Button>
                  </Link>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="flex-fill"
                    onClick={() => addToCart(service)}
                    style={{
                      backgroundColor: "#76B900",
                      border: "none",
                    }}
                  >
                    Добавить
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredServices.length === 0 && activeSearch && (
        <Row>
          <Col className="text-center py-5">
            <h4 className="text-muted">По запросу "{activeSearch}" ничего не найдено</h4>
            <p className="text-muted">Попробуйте изменить поисковый запрос</p>
            <Button variant="outline-primary" onClick={handleClearSearch}>
              Показать все услуги
            </Button>
          </Col>
        </Row>
      )}

      <style>{`
        .service-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          display: flex;
          flex-direction: column;
        }
        
        .service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .service-card-image-container {
          height: 60%;
          padding: 5%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .service-card-img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          border-radius: 4px;
        }
        
        .service-card-body {
          height: 40%;
          padding: 8% 5% 5% 5%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .w-100:hover {
          background-color: #76B900 !important;
          color: #FFF !important;
        }
        
        .service-card-title {
          height: 48px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.2;
        }
        
        .service-card-description {
          flex-grow: 1;
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.3;
          color: #666;
        }
        
        .service-card-price {
          margin: 0;
          font-weight: bold;
          font-size: 1.1rem;
          color: #76B900;
        }
        
        .service-card-actions {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-top: auto;
        }
      `}</style>
    </Container>
  );
};