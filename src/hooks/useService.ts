import { useState, useEffect } from 'react';
import { SoftwareService } from '../types';
import { apiService } from '../services/api';
import { servicesMock } from '../data/mockData';

export const useService = (id?: string) => {
  const [service, setService] = useState<SoftwareService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadService = async () => {
      if (!id) {
        setError('ID услуги не указан');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const serviceId = parseInt(id);
        if (isNaN(serviceId)) {
          throw new Error('Неверный ID услуги');
        }

        let serviceData: SoftwareService;
        
        try {
          // Пытаемся загрузить с бэкенда
          serviceData = await apiService.getSoftwareById(serviceId);
        } catch (apiError) {
          console.warn('API error, falling back to mock data:', apiError);
          // Если API не работает, используем моковые данные
          const mockService = servicesMock.find(s => s.id === serviceId);
          if (!mockService) {
            throw new Error('Услуга не найдена');
          }
          serviceData = mockService;
        }
        
        setService(serviceData);
      } catch (error) {
        console.error('Error loading service:', error);
        setError(error instanceof Error ? error.message : 'Произошла ошибка при загрузке услуги');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  return {
    service,
    loading,
    error
  };
};