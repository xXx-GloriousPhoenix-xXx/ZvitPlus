// src/api/templateApi.js - обновленная версия
import axiosInstance from './axiosConfig';

export const templateApi = {
  getAll: (page = 1, itemsPerPage = 10) =>
    axiosInstance.get(`/templates/${page}/${itemsPerPage}`),
  
  getById: (id) => axiosInstance.get(`/templates/${id}`),
  
  create: (templateData, onUploadProgress) =>
    axiosInstance.post('/templates', templateData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onUploadProgress // Опционально для отслеживания прогресса
    }),
  
  update: (id, templateData) =>
    axiosInstance.patch(`/templates/${id}`, templateData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  delete: (id) => axiosInstance.delete(`/templates/${id}`),
  
  download: (id) =>
    axiosInstance.get(`/templates/${id}/download`, {
      responseType: 'blob'
    }),
  
  // Можно добавить метод для валидации файла перед загрузкой
  validateTemplate: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post('/templates/validate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};