import { useState } from 'react';
import defaultServiceImage from '../assets/defaultService.png';

export const useImageError = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultServiceImage;
    setImageError(true);
  };

  const resetImageError = () => {
    setImageError(false);
  };

  return {
    imageError,
    handleImageError,
    resetImageError
  };
};