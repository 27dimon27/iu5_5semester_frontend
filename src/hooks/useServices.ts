import { useState, useEffect } from 'react';
import type { SoftwareService } from '../types';
import { apiService } from '../services/api';
import { servicesMock } from '../data/mockData';
import { environment } from '../config/environment';

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
        
        if (false && environment.isProduction) {
          // В продакшене всегда используем моки
          console.log('Production mode: using mock data');
          servicesData = servicesMock;
        } else {
          try {
            // В разработке пытаемся загрузить с бэкенда
            servicesData = await apiService.getSoftwares();
          } catch (apiError) {
            console.warn('API error, falling back to mock data:', apiError);
            // Если API не работает, используем моковые данные
            servicesData = servicesMock;
          }
        }
        
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
        setError('Произошла ошибка при загрузке услуг');
        // В случае ошибки все равно показываем моки
        setServices(servicesMock);
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