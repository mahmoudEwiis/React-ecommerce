import axiosInstance from '../../services/axiosInstance';

export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email , password});
    return response.data;
  } catch (error) {
    const message = error.response?.data || 'Something went wrong while logging in.';
    throw new Error(message);
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch user profile.';
    throw new Error(message);
  }
};

export const register = async (data) => {
  const response = await axiosInstance.post('/register', data);
  return response.data;
};