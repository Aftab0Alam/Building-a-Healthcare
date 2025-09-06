import api from './api';

export const registerUser = (data) => api.post('auth/register/', data);
export const loginUser = (data) => api.post('auth/login/', data);
export const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
export const isAuthenticated = () => !!localStorage.getItem('access_token');
