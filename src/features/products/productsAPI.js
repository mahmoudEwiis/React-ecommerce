import axiosInstance from '../../services/axiosInstance';


export const getProducts = async ({ limit = 8, offset = 0, categoryId, minPrice, maxPrice, title }) => {
  try {

    const params = {
      limit: Number(limit),
      offset: Number(offset)
    };

    if (categoryId) params.categoryId = categoryId;
    if (minPrice) params.price_min = minPrice;
    if (maxPrice) params.price_max = maxPrice;
    if (title) params.title = title;

    console.log(params)
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