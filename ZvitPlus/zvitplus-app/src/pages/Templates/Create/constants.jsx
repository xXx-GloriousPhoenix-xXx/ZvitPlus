// src/pages/Templates/CreateTemplate/constants.js
export const templateTypes = [
    { value: 'Unset', label: 'Не вказано' },
    { value: 'Invoice', label: 'Рахунок' },
    { value: 'Contract', label: 'Договір' },
    { value: 'Report', label: 'Звіт' },
    { value: 'Letter', label: 'Лист' },
    { value: 'Form', label: 'Форма' },
    { value: 'Certificate', label: 'Сертифікат' }
  ];
  
  export const pageSizes = [
    { value: 'A4', label: 'A4 (210 × 297 мм)' },
    { value: 'A3', label: 'A3 (297 × 420 мм)' },
    { value: 'Letter', label: 'Letter (216 × 279 мм)' },
    { value: 'Legal', label: 'Legal (216 × 356 мм)' }
  ];
  
  export const orientations = [
    { value: 'portrait', label: 'Книжна' },
    { value: 'landscape', label: 'Альбомна' }
  ];
  
  export const elementTypes = [
    { type: 'text', label: 'Текст', color: 'primary' },
    { type: 'image', label: 'Зображення', color: 'secondary' },
    { type: 'table', label: 'Таблиця', color: 'info' },
    { type: 'chart', label: 'Діаграма', color: 'success' }
  ];
  
  export const steps = [
    'Основна інформація',
    'Додавання елементів',
    'Попередній перегляд'
  ];
  
  export const defaultElementConfig = (type) => {
    const configs = {
      text: {
        text: 'Новий текст',
        style: {
          fontSize: 12,
          fontFamily: 'Arial',
          bold: false,
          italic: false,
          underline: false,
          color: '#000000',
          alignment: 'left'
        }
      },
      image: {
        src: '',
        alt: 'Зображення',
        size: { width: 100, height: 100 }
      },
      table: {
        columns: ['Колонка 1'],
        rows: [],
        header: true,
        style: {
          borderWidth: 1,
          borderColor: '#000000',
          headerBackground: '#f5f5f5'
        }
      },
      chart: {
        chartType: 'bar',
        dataSource: '',
        title: 'Діаграма',
        size: { width: 300, height: 200 },
        colors: ['#1976d2', '#dc004e', '#388e3c', '#f57c00']
      }
    };
    
    return configs[type] || {};
  };