import React from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Table,
  Alert 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../hooks/useCart';
import { companiesMock, gradesMock } from '../data/mockData';

export const CartPage: React.FC = () => {
  const { 
    currentBid, 
    cartItems, 
    updateCartItem, 
    removeFromCart, 
    updateCompany,
    clearCart
  } = useCart();

  const handleCountChange = (serviceId: number, count: number) => {
    // Разрешаем 0 и положительные числа, отрицательные преобразуем в 0
    const validCount = Math.max(0, count);
    const item = cartItems.find(item => item.softwareService.id === serviceId);
    if (item) {
      updateCartItem(serviceId, { 
        count: validCount, 
        sum: validCount * item.softwareService.price 
      });
    }
  };

  const handleGradeChange = (serviceId: number, grade: string) => {
    updateCartItem(serviceId, { grade });
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.CART }]} />
        <Alert variant="info" className="my-4">
          <Alert.Heading>Корзина пуста</Alert.Heading>
          <p>Добавьте услуги из каталога, чтобы создать заявку.</p>
          <Link to={ROUTES.SERVICES}>
            <Button variant="primary">Перейти к услугам</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.CART }]} />
      
      <Row className="my-4 align-items-center">
        <Col>
          <h2>Текущая заявка</h2>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={handleClearCart}>
            Очистить корзину
          </Button>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Выберите компанию:</Form.Label>
            <Form.Select
              value={currentBid.company}
              onChange={(e) => updateCompany(e.target.value)}
            >
              {companiesMock.map(company => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Услуга</th>
                <th>Количество</th>
                <th>Грейд</th>
                <th>Стоимость</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.softwareService.id}>
                  <td>
                    <img 
                      src={`http://localhost:9000/software-images/${item.softwareService.image}`}
                      alt={item.softwareService.title}
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x50?text=No+Img';
                      }}
                    />
                  </td>
                  <td>
                    <div>
                      <strong>{item.softwareService.title}</strong>
                      <br />
                      <small className="text-muted">
                        {item.softwareService.description.slice(0, 50)}...
                      </small>
                    </div>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={item.count}
                      onChange={(e) => handleCountChange(item.softwareService.id, parseInt(e.target.value) || 0)}
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={item.grade}
                      onChange={(e) => handleGradeChange(item.softwareService.id, e.target.value)}
                      style={{ minWidth: '120px' }}
                    >
                      {gradesMock.map(grade => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <strong>{item.sum} руб</strong>
                    <br />
                    <small className="text-muted">
                      {item.softwareService.price} руб/шт
                    </small>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.softwareService.id)}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Итоговая стоимость:</Card.Title>
                  <h3 className="text-primary">{currentBid.sum} руб</h3>
                  <small className="text-muted">
                    Уникальных услуг: {cartItems.length}
                  </small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-end gap-2">
              <Button variant="warning" size="lg">
                Рассчитать
              </Button>
              <Button variant="success" size="lg">
                Оформить заявку
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};