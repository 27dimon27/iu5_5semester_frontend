import { useState, useEffect } from 'react';
import { SoftwareService } from '../types';
import { apiService } from '../services/api';
import { servicesMock } from '../data/mockData';

export const useServices = () => {
  const [services, setServices] = useState<SoftwareService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let servicesData: SoftwareService[];
        
        try {
          // Пытаемся загрузить с бэкенда
          servicesData = await apiService.getSoftwares();
        } catch (apiError) {
          console.warn('API error, falling back to mock data:', apiError);
          // Если API не работает, используем моковые данные
          servicesData = servicesMock;
        }
        
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
        setError('Произошла ошибка при загрузке услуг');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return {
    services,
    loading,
    error
  };
};