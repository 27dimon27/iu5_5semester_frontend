import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { environment } from '../config/environment';

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
        
        let bidIconData;
        
        if (environment.isProduction) {
          // В продакшене используем заглушку
          bidIconData = {
            bidID: -1,
            count: 0
          };
        } else {
          try {
            bidIconData = await apiService.getBidIcon();
          } catch (apiError) {
            console.warn('API error for bid icon:', apiError);
            bidIconData = {
              bidID: -1,
              count: 0
            };
          }
        }
        
        setBidIcon(bidIconData);
      } catch (error) {
        console.error('Error loading bid icon:', error);
        setError('Failed to load cart data');
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
    if (environment.isProduction) {
      return { bidID: -1, count: 0 };
    }
    
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