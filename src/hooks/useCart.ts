import { useState, useEffect } from 'react';
import { CartItem, Bid } from '../types';
import { companiesMock, gradesMock } from '../data/mockData';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [currentBid, setCurrentBid] = useState<Bid>({
    id: 0,
    company: companiesMock[0],
    services: [],
    sum: 0
  });

  useEffect(() => {
    const totalSum = cartItems.reduce((sum, item) => sum + item.sum, 0);
    setCurrentBid(prev => ({
      ...prev,
      services: cartItems,
      sum: totalSum
    }));
  }, [cartItems]);

  const addToCart = (service: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.softwareService.id === service.id
      );

      if (existingItem) {
        return prev;
      }

      const newItem: CartItem = {
        softwareService: service,
        count: 1,
        grade: gradesMock[0],
        sum: service.price || 0
      };

      return [...prev, newItem];
    });
  };

  const updateCartItem = (serviceId: number, updates: Partial<CartItem>) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.softwareService.id === serviceId) {
          const updatedItem = { ...item, ...updates };
          if (updates.count !== undefined) {
            updatedItem.sum = Math.max(0, updates.count) * item.softwareService.price;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeFromCart = (serviceId: number) => {
    setCartItems(prev =>
      prev.filter(item => item.softwareService.id !== serviceId)
    );
  };

  const updateCompany = (company: string) => {
    setCurrentBid(prev => ({ ...prev, company }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const uniqueItemsCount = cartItems.length;

  return {
    cartItems,
    currentBid,
    addToCart,
    updateCartItem,
    removeFromCart,
    updateCompany,
    clearCart,
    itemCount: uniqueItemsCount
  };
};