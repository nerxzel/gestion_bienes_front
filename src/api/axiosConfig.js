import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

/*api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});*/ 

/*Considerar implementación de este método si retomamos el uso de JWT*/

export default api;