import axiosInstance from "../../services/axiosInstance";

export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put(`/users/${profileData.id}`, profileData); 
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
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