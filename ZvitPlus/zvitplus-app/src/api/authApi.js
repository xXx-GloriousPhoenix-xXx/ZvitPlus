// src/api/authApi.js
import axiosInstance from './axiosConfig';

export const authApi = {
  login: async (formData) => {
    try {
      console.log('Sending FormData:', Object.fromEntries(formData.entries()));
      
      const response = await axiosInstance.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Login response:', response.data);
      return response;
    } catch (error) {
      console.error('Login API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },
  
  register: async (formData) => {
    try {
      console.log('Register FormData:', Object.fromEntries(formData.entries()));
      
      const response = await axiosInstance.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Register response:', response.data);
      return response;
    } catch (error) {
      console.error('Register API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },
};