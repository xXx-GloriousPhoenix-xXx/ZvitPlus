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
  { 
    type: 'text', 
    label: 'Текст', 
    color: 'primary',
    icon: 'TextFields',
    defaultSize: { width: 150, height: 40 }
  },
  { 
    type: 'image', 
    label: 'Зображення', 
    color: 'secondary',
    icon: 'Image',
    defaultSize: { width: 100, height: 100 }
  },
  { 
    type: 'table', 
    label: 'Таблиця', 
    color: 'info',
    icon: 'TableChart',
    defaultSize: { width: 300, height: 200 }
  },
  { 
    type: 'chart', 
    label: 'Діаграма', 
    color: 'success',
    icon: 'BarChart',
    defaultSize: { width: 300, height: 200 }
  }
];

export const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48];
export const fontFamilies = ['Arial', 'Times New Roman', 'Verdana', 'Georgia', 'Courier New', 'Tahoma'];
export const alignments = ['left', 'center', 'right', 'justify'];
export const chartTypes = ['bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea'];

export const steps = [
  'Основна інформація',
  'Додавання елементів',
  'Попередній перегляд'
];

export const defaultElementConfig = (type) => {
  const configs = {
    text: {
      text: 'Текст',
      fontSize: 12,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      color: '#000000',
      backgroundColor: 'transparent',
      alignment: 'left',
      padding: 5,
      borderWidth: 0,
      borderColor: '#000000',
      borderRadius: 0
    },
    image: {
      src: '',
      alt: 'Зображення',
      borderWidth: 0,
      borderColor: '#000000',
      borderRadius: 0,
      opacity: 1
    },
    table: {
      columns: ['Колонка 1', 'Колонка 2', 'Колонка 3'],
      rows: [
        ['Рядок 1, Колонка 1', 'Рядок 1, Колонка 2', 'Рядок 1, Колонка 3'],
        ['Рядок 2, Колонка 1', 'Рядок 2, Колонка 2', 'Рядок 2, Колонка 3']
      ],
      header: true,
      headerBackground: '#f5f5f5',
      headerTextColor: '#000000',
      cellBackground: '#ffffff',
      cellTextColor: '#000000',
      borderWidth: 1,
      borderColor: '#dddddd',
      cellPadding: 8
    },
    chart: {
      chartType: 'bar',
      dataSource: '',
      title: 'Діаграма',
      showLegend: true,
      showLabels: true,
      backgroundColor: '#ffffff',
      borderColor: '#dddddd',
      borderWidth: 1,
      colors: ['#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2', '#ff9800']
    }
  };
  
  return configs[type] || {};
};