import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useBidIcon = () => {
  const [bidIcon, setBidIcon] = useState({
    bidID: 0,
    count: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBidIcon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const bidIconData = await apiService.getBidIcon();
        setBidIcon(bidIconData);
      } catch (error) {
        setError('Failed to load cart data');
        // В случае ошибки устанавливаем значения по умолчанию
        setBidIcon({
          bidID: -1,
          count: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadBidIcon();
  }, []);

  const refreshBidIcon = async () => {
    try {
      const bidIconData = await apiService.getBidIcon();
      setBidIcon(bidIconData);
      return bidIconData;
    } catch (error) {
      console.error('Error refreshing bid icon:', error);
      throw error;
    }
  };

  return {
    bidID: bidIcon.bidID,
    itemCount: bidIcon.count,
    loading,
    error,
    refreshBidIcon
  };
};