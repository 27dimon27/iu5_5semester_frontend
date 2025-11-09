import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTE_LABELS } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../hooks/useCart';
import { useServices } from '../hooks/useServices';
import { useBidIcon } from '../hooks/useBidIcon';
import { CartIcon } from '../components/CartIcon';
import { useImageError } from '../hooks/useImageError';
import { IMAGE_BASE_URL } from '../config/api';
import { useAppSelector, useAppDispatch } from '../store';
import { setSearchTerm, setActiveSearch } from '../store/filterSlice';

export const ServicesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { searchTerm, activeSearch } = useAppSelector((state) => state.filters);
  
  const { addToCart, itemCount } = useCart();
  const { services, loading, error } = useServices();
  const { loading: bidIconLoading } = useBidIcon();
  const { handleImageError } = useImageError();

  const [loadingImages, setLoadingImages] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    console.log('ServicesPage mounted with search:', { searchTerm, activeSearch });
  }, [searchTerm, activeSearch]);

  const handleImageLoad = (serviceId: number) => {
    setLoadingImages(prev => ({ ...prev, [serviceId]: false }));
  };

  const handleImageLoadStart = (serviceId: number) => {
    setLoadingImages(prev => ({ ...prev, [serviceId]: true }));
  };

  const filteredServices = useMemo(() => {
    if (!activeSearch) return services;
    return services.filter(service =>
      service.title.toLowerCase().includes(activeSearch.toLowerCase())
    );
  }, [activeSearch, services]);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleSearch = () => {
    dispatch(setActiveSearch(searchTerm));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
    dispatch(setActiveSearch(''));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <Container>
        <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
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
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
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
                {filteredServices.length > 0 && (
                  <span className="ms-2">
                    ({filteredServices.length} услуг найдено)
                  </span>
                )}
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
                {loadingImages[service.id] && (
                  <div className="image-loading-spinner">
                    <Spinner animation="border" size="sm" />
                  </div>
                )}
                <img 
                  src={`${IMAGE_BASE_URL}/software-images/${service.image}`}
                  alt={service.title}
                  className="service-card-img"
                  onLoad={() => handleImageLoad(service.id)}
                  onLoadStart={() => handleImageLoadStart(service.id)}
                  onError={handleImageError}
                  style={{ 
                    display: loadingImages[service.id] ? 'none' : 'block' 
                  }}
                />
              </div>
              <Card.Body className="service-card-body">
                <Card.Title className="service-card-title">
                  {service.title}
                </Card.Title>
                <Card.Text className="service-card-description">
                  {service.description.slice(0, 100)}...
                </Card.Text>
                <div className="service-card-price">
                  {service.price} руб
                </div>
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
          height: 200px;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          border-radius: 0.375rem 0.375rem 0 0;
          position: relative;
        }
        
        .service-card-img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          border-radius: 4px;
        }
        
        .image-loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .service-card-body {
          padding: 15px;
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