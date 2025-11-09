import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServicePage } from './pages/ServicePage';
import { CartPage } from './pages/CartPage';
import { ROUTES } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/iu5_5semester_frontend">
        <Navigation />
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.SERVICE} element={<ServicePage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;