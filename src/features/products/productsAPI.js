import axiosInstance from '../../services/axiosInstance';


export const getProducts = async ({ limit = 8, offset = 0, categoryId, priceRange , title }) => {
  try {

    const params = {
      limit: Number(limit),
      offset: Number(offset)
    };

    if (categoryId) params.categoryId = categoryId;
    if (priceRange) params.price_min = priceRange[0];
    if (priceRange) params.price_max = priceRange[1];
    if (title) params.title = title;

    const response = await axiosInstance.get(`/products`, { params });

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


export const getProductsByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/?categoryId=${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch product.';
    throw new Error(message);
  }
};


export const getProductCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch product.';
    throw new Error(message);
  }
};