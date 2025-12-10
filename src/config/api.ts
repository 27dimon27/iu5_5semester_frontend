// export const isTauri = typeof window !== 'undefined' && window.__TAURI__ !== undefined;

// export const API_BASE_URL = isTauri 
//   ? 'http://192.168.0.14:80/api'
//   : '/api';

// export const IMAGE_BASE_URL = isTauri
//   ? 'http://192.168.0.14:9000'
//   : 'http://localhost:9000';

// export const isTauri = typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;

// const DEVELOPMENT_BASE_URL = 'http://localhost:80/api';
// const PRODUCTION_BASE_URL = 'http://192.168.0.14:80/api';

// const getProductionBaseUrl = () => {
//   return PRODUCTION_BASE_URL;
// };

// export const API_BASE_URL = isTauri 
//   ? getProductionBaseUrl()
//   : DEVELOPMENT_BASE_URL;

// export const IMAGE_BASE_URL = isTauri
//   ? getProductionBaseUrl().replace(':80', ':9000')
//   : 'http://localhost:9000';

// Определяем, запущено ли приложение в Tauri
// const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;
const API_URL = 'http://192.168.0.14:8080/api';
const MINIO_URL = 'http://192.168.0.14:9000';

// Базовые URL в зависимости от среды
// const DEVELOPMENT_BASE_URL = 'http://localhost:8080/api';
// const PRODUCTION_BASE_URL = 'http://192.168.0.14:8080/api';

// // MinIO URLs
// const DEVELOPMENT_MINIO_URL = 'http://localhost:9000';
// const PRODUCTION_MINIO_URL = 'http://192.168.0.14:9000';

// Получаем базовый URL
const getBaseUrl = () => {
  // return isTauri ? PRODUCTION_BASE_URL : DEVELOPMENT_BASE_URL;
  return API_URL;
};

// Получаем MinIO URL
const getMinioUrl = () => {
  // return isTauri ? PRODUCTION_MINIO_URL : DEVELOPMENT_MINIO_URL;
  return MINIO_URL;
};

export const API_BASE_URL = getBaseUrl();
export const IMAGE_BASE_URL = getMinioUrl();