import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export const HomePage: React.FC = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Разработка ПО</h1>
          <p className="lead">
            Профессиональные услуги по разработке программного обеспечения
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Наши услуги</Card.Title>
              <Card.Text>
                Ознакомьтесь с полным перечнем наших услуг по разработке программного обеспечения
              </Card.Text>
              <Link to={ROUTES.SERVICES}>
                <Button variant="primary">Посмотреть услуги</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Корзина заявок</Card.Title>
              <Card.Text>
                Управляйте вашими выбранными услугами и создавайте заявки
              </Card.Text>
              <Link to={ROUTES.CART}>
                <Button variant="outline-primary">Перейти в корзину</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};