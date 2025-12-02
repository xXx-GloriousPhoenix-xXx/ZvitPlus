import axiosInstance from './axiosConfig';

export const templateApi = {
  getAll: (page = 1, itemsPerPage = 10) =>
    axiosInstance.get(`/templates/${page}/${itemsPerPage}`),
  
  getById: (id) => axiosInstance.get(`/templates/${id}`),
  
  create: (templateData) =>
    axiosInstance.post('/templates', templateData, {
      headers: { 'Content-Type': 'multipart/form-data' }
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
};