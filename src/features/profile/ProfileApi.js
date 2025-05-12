import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";

export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


export const addUser = async (data) => {
  const response = await axiosInstance.post('/users', data);
  return response.data;
};


export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch product.';
    throw new Error(message);
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post(`/categories` , categoryData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch product.';
    throw new Error(message);
  }
};

export const updateCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryData.id}` , categoryData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch product.';
    throw new Error(message);
  }
};


export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  }  catch (err) {
    if (err.response?.status === 404) {
      toast.error('Product not found. It may have been removed.');
      throw err;
    }
    toast.error('Failed to update product.');
    throw err;
  }
};

export const addProduct = async (ProductData) => {
  try {
    const response = await axiosInstance.post(`/products` , ProductData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch product.';
    throw new Error(message);
  }
};


export const updateProduct = async (ProductData) => {
  try {
    const response = await axiosInstance.put(`/products/${ProductData.id}` , ProductData);
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      toast.error('Product not found. It may have been removed.');
      throw err;
    }
    toast.error('Failed to update product.');
    throw err;
  }
};