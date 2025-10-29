import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

import cartIconImage from '../assets/bid.png';

interface CartIconProps {
  itemCount: number;
}

export const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  const navigate = useNavigate();
  const isEmpty = itemCount === 0;

  const handleClick = () => {
    if (!isEmpty) {
      navigate(ROUTES.CART);
    }
  };

  return (
    <div className="cart-icon-container">
      <Button 
        variant={isEmpty ? "outline-secondary" : "outline-primary"}
        className={`cart-icon-button ${isEmpty ? 'cart-icon-empty' : ''}`}
        onClick={handleClick}
        disabled={isEmpty}
      >
        <div className="cart-icon-image-wrapper">
          <img 
            src={cartIconImage}
            alt="Корзина"
            className={`cart-icon-image ${isEmpty ? 'cart-icon-image-empty' : ''}`}
          />
          
          {!isEmpty && (
            <Badge bg="danger" className="cart-icon-badge">
              {itemCount}
            </Badge>
          )}
        </div>
      </Button>

      <style>{`
        .cart-icon-container {
          display: inline-block;
          position: relative;
        }
        
        .cart-icon-button {
          padding: 8px 12px;
          border: none;
          background: transparent;
          position: relative;
        }
        
        .cart-icon-image-wrapper {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cart-icon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }
        
        .cart-icon-image-empty {
          filter: grayscale(100%) brightness(0.7);
          opacity: 0.6;
        }
        
        .cart-icon-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 0.7rem;
          min-width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cart-icon-button:disabled {
          pointer-events: none;
        }
        
        .cart-icon-button:hover:not(:disabled) .cart-icon-image {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};