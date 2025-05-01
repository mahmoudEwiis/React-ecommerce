import axiosInstance from '../../services/axiosInstance';


export const getProducts = async ({ limit = 8, offset = 0 }) => {
  try {
    const response = await axiosInstance.get(`/products`, {
      params: {
        limit: Number(limit),      
        offset: Number(offset)    
      }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch products.';
    throw new Error(message);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch product.';
    throw new Error(message);
  }
};