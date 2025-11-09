export const environment = {
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
};

export const getApiBaseUrl = () => {
  if (environment.isProduction) {
    return null;
  }
  return '/api';
};

export const getImageBaseUrl = () => {
  if (environment.isProduction) {
    return '/iu5_5semester_frontend/assets';
  }
  return 'http://localhost:9000/software-images';
};