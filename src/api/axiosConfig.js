import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
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