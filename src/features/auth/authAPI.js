import axiosInstance from '../../services/axiosInstance';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/login', credentials);
  return response.data;
};

export const register = async (data) => {
  const response = await axiosInstance.post('/register', data);
  return response.data;
};