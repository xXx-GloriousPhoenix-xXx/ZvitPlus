import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import { templateApi } from '../../../api/templateApi';

export const useTemplateUpload = () => {
  const navigate = useNavigate();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [templateInfo, setTemplateInfo] = useState(null);
  const [templateStructure, setTemplateStructure] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateType, setTemplateType] = useState('Unset');
  const [isPrivate, setIsPrivate] = useState(false);

  // Типы шаблонов
  const templateTypes = [
    { value: 'Unset', label: 'Не вказано' },
    { value: 'Invoice', label: 'Рахунок' },
    { value: 'Contract', label: 'Договір' },
    { value: 'Report', label: 'Звіт' },
    { value: 'Letter', label: 'Лист' },
    { value: 'Form', label: 'Форма' },
    { value: 'Certificate', label: 'Сертифікат' }
  ];

  // Получаем текущего пользователя
  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const currentUser = getUser();
  const authorId = currentUser?.id;

  // Маппинг типов из .rep файла в enum
  const mapRepTypeToEnum = (repType) => {
    console.log('Маппинг типа из файла:', repType);
    
    const typeMap = {
      'Invoice': 'Invoice',
      'Contract': 'Contract',
      'Report': 'Report',
      'Letter': 'Letter',
      'Form': 'Form',
      'Certificate': 'Certificate',
      'Presentation': 'Report',
      'Financial Statement': 'Report',
      'Marketing Plan': 'Report',
      'Custom': 'Unset'
    };
    
    // Приводим к строке и обрезаем пробелы
    const normalizedType = String(repType || '').trim();
    const result = typeMap[normalizedType] || 'Unset';
    
    console.log('Результат маппинга:', { input: repType, normalized: normalizedType, result });
    return result;
  };

  // Анализ .rep файла
  // Анализ .rep файла
const analyzeRepFile = useCallback(async (file) => {
  try {
    const zip = new JSZip();
    
    // Читаем файл как ArrayBuffer
    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
    
    const content = await zip.loadAsync(arrayBuffer);
    
    // Проверяем структуру архива
    const allFiles = Object.keys(content.files);
    console.log('Все файлы в архиве:', allFiles);
    
    // Ищем template.json в папке
    let templateJsonFileName = null;
    for (const filename of allFiles) {
      if (filename.includes('template.json') && !content.files[filename].dir) {
        templateJsonFileName = filename;
        break;
      }
    }
    
    if (!templateJsonFileName) {
      throw new Error('Файл template.json не знайдено у архіві');
    }
    
    console.log('Найден template.json:', templateJsonFileName);
    
    // Получаем файл из архива
    const templateFile = content.files[templateJsonFileName];
    
    // Читаем содержимое как binary string и преобразуем
    const binaryString = await templateFile.async('binarystring');
    console.log('Двоичная строка (первые 200 символов):', binaryString.substring(0, 200));
    
    // Попробуем несколько способов чтения
    let templateJsonString;
    
    // Способ 1: Читаем как text с правильной кодировкой
    try {
      templateJsonString = await templateFile.async('text');
      console.log('Прочитано как text (первые 200 символов):', templateJsonString.substring(0, 200));
    } catch (textError) {
      console.log('Не удалось прочитать как text:', textError);
      
      // Способ 2: Используем ArrayBuffer и TextDecoder
      try {
        const arrayBufferData = await templateFile.async('arraybuffer');
        templateJsonString = new TextDecoder('utf-8').decode(arrayBufferData);
        console.log('Прочитано через ArrayBuffer (первые 200 символов):', templateJsonString.substring(0, 200));
      } catch (bufferError) {
        console.log('Не удалось прочитать через ArrayBuffer:', bufferError);
        
        // Способ 3: Используем base64
        try {
          const base64Data = await templateFile.async('base64');
          templateJsonString = atob(base64Data);
          console.log('Прочитано через base64 (первые 200 символов):', templateJsonString.substring(0, 200));
        } catch (base64Error) {
          console.log('Не удалось прочитать через base64:', base64Error);
          throw new Error('Не вдалося прочитати вміст файлу template.json');
        }
      }
    }
    
    // Очищаем строку от возможных лишних символов
    let cleanedJsonString = templateJsonString.trim();
    
    // Убираем возможный BOM символ
    if (cleanedJsonString.charCodeAt(0) === 0xFEFF) {
      cleanedJsonString = cleanedJsonString.substring(1);
    }
    
    console.log('Очищенная строка (первые 200 символов):', cleanedJsonString.substring(0, 200));
    console.log('Длина строки:', cleanedJsonString.length);
    console.log('Первые 10 символов:', cleanedJsonString.substring(0, 10));
    console.log('Последние 10 символов:', cleanedJsonString.substring(cleanedJsonString.length - 10));
    
    // Проверяем, что строка не пустая
    if (!cleanedJsonString) {
      throw new Error('Файл template.json порожній');
    }
    
    // Пытаемся распарсить JSON
    let templateData;
    try {
      templateData = JSON.parse(cleanedJsonString);
      console.log('✅ JSON успешно распарсен!');
    } catch (jsonError) {
      console.error('❌ Ошибка парсинга JSON:', jsonError.message);
      console.error('Позиция ошибки:', jsonError.stack);
      
      // Попробуем найти и исправить проблему
      // Если начинается с лишних кавычек
      if (cleanedJsonString.startsWith('"')) {
        console.log('Пытаемся исправить: убираем лишние кавычки в начале');
        cleanedJsonString = cleanedJsonString.replace(/^"+/, '');
      }
      
      // Если заканчивается лишними кавычками
      if (cleanedJsonString.endsWith('"')) {
        console.log('Пытаемся исправить: убираем лишние кавычки в конце');
        cleanedJsonString = cleanedJsonString.replace(/"+$/, '');
      }
      
      // Пробуем снова
      try {
        templateData = JSON.parse(cleanedJsonString.trim());
        console.log('✅ JSON успешно распарсен после исправления!');
      } catch (secondError) {
        console.error('❌ Вторая попытка также не удалась:', secondError.message);
        
        // Выводим проблемные участки для отладки
        const lines = cleanedJsonString.split('\n');
        console.log('Строки файла:');
        lines.slice(0, 10).forEach((line, index) => {
          console.log(`${index + 1}: ${line}`);
        });
        
        throw new Error(`Невірний формат JSON. ${secondError.message}`);
      }
    }
    
    // Проверяем, что получили данные
    if (!templateData) {
      throw new Error('Не вдалося розпізнати структуру JSON');
    }
    
    console.log('Данные template.json:', templateData);
    
    // Сбор информации о шаблоне
    const info = {
      name: templateData.templateName || templateData.name || file.name.replace(/\.(rep|zip)$/i, ""),
      type: templateData.templateType || templateData.type || 'Custom',
      pageSize: templateData.pageSize || 'A4',
      orientation: templateData.orientation || 'portrait',
      elementsCount: Array.isArray(templateData.elements) ? templateData.elements.length : 0,
      created: templateData.createdDate || templateData.created || new Date().toISOString(),
      author: templateData.author || 'Unknown',
      version: templateData.version || '1.0'
    };
    
    console.log('📋 Извлеченная информация:', info);
    
    // Анализ структуры
    const structure = {
      textElements: Array.isArray(templateData.elements) ? 
        templateData.elements.filter(el => el && el.type === 'text').length : 0,
      imageElements: Array.isArray(templateData.elements) ? 
        templateData.elements.filter(el => el && el.type === 'image').length : 0,
      tableElements: Array.isArray(templateData.elements) ? 
        templateData.elements.filter(el => el && el.type === 'table').length : 0,
      chartElements: Array.isArray(templateData.elements) ? 
        templateData.elements.filter(el => el && el.type === 'chart').length : 0,
      mediaFiles: allFiles.filter(key => 
        key.toLowerCase().includes('media/') && !content.files[key].dir).length,
      dataFiles: allFiles.filter(key => 
        key.toLowerCase().includes('data/') && !content.files[key].dir).length
    };
    
    console.log('📊 Структура шаблона:', structure);
    
    // Чтение metadata.json если есть
    let metadata = {};
    for (const filename of allFiles) {
      if (filename.toLowerCase().includes('metadata.json') && !content.files[filename].dir) {
        try {
          const metadataJson = await content.file(filename).async('string');
          if (metadataJson && metadataJson.trim() !== '') {
            metadata = JSON.parse(metadataJson);
            console.log('✅ Найден и прочитан metadata.json');
          }
        } catch (e) {
          console.warn('⚠️ Не вдалося прочитати metadata.json:', e);
        }
        break;
      }
    }
    
    // ОБНОВЛЯЕМ СОСТОЯНИЕ
    const newTemplateInfo = { ...info, ...metadata };
    setTemplateInfo(newTemplateInfo);
    setTemplateStructure(structure);
    setTemplateName(newTemplateInfo.name);
    
    // Устанавливаем тип из файла
    if (newTemplateInfo.type) {
      const mappedType = mapRepTypeToEnum(newTemplateInfo.type);
      console.log(`🔄 Маппинг типа: ${newTemplateInfo.type} -> ${mappedType}`);
      console.log('🎯 Устанавливаем тип шаблона:', mappedType);
      
      // Используем setTimeout для гарантии установки состояния
      setTimeout(() => {
        setTemplateType(mappedType || 'Unset');
      }, 0);
    } else {
      console.log('⚠️ Тип не найден в template.json, устанавливаем Unset');
      setTimeout(() => {
        setTemplateType('Unset');
      }, 0);
    }
    
    console.log('✅ Файл успешно проанализирован!');
    
  } catch (error) {
    console.error('❌ Помилка в analyzeRepFile:', error);
    console.error('Stack trace:', error.stack);
    throw new Error(`Помилка аналізу файлу: ${error.message}`);
  }
}, []);

  // Обработчик выбора файла
  const handleFileSelect = useCallback(async (file) => {
    // Проверка формата
    if (!file.name.toLowerCase().endsWith('.rep') && !file.name.toLowerCase().endsWith('.zip')) {
      setUploadError('Неправильний формат файлу. Очікується .rep або .zip');
      return;
    }
    
    // Проверка размера
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setUploadError('Файл занадто великий. Максимальний розмір: 50MB');
      return;
    }
    
    if (file.size === 0) {
      setUploadError('Файл порожній');
      return;
    }
    
    // Сбрасываем предыдущие данные
    setSelectedFile(file);
  setUploadError('');
  setIsAnalyzing(true);
  setTemplateInfo(null);
  setTemplateStructure(null);
  setTemplateName('');
  // УБИРАЕМ ЭТУ СТРОКУ:
  // setTemplateType('Unset'); // ← НЕ сбрасываем тип здесь!
  setUploadSuccess('');

    try {
      console.log('Анализируем файл:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleString()
      });
      
      await analyzeRepFile(file);
      
    } catch (error) {
      console.error('Error analyzing file:', error);
    setUploadError(`Не вдалося проаналізувати файл: ${error.message}`);
    setSelectedFile(null);
    // Только при ошибке сбрасываем тип
    setTemplateType('Unset');
    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzeRepFile]);

  // Удаление файла
  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setTemplateInfo(null);
    setTemplateStructure(null);
    setTemplateName('');
    setTemplateType('Unset');
    setIsPrivate(false);
  }, []);

  // Обработчик загрузки файла
  const handleUpload = useCallback(async () => {
    if (!templateName.trim()) {
      setUploadError('Введіть назву шаблону');
      return;
    }

    if (!selectedFile) {
      setUploadError('Виберіть файл шаблону');
      return;
    }

    if (!authorId) {
      setUploadError('Користувач не авторизований');
      return;
    }

    if (templateType === 'Unset') {
      setUploadError('Виберіть тип шаблону');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');
    setUploadSuccess('');

    try {
      // Создаем FormData как ожидает бэкенд
      const formData = new FormData();
      formData.append('File', selectedFile);
      formData.append('Name', templateName);
      formData.append('Type', templateType);
      formData.append('IsPrivate', isPrivate.toString());
      formData.append('AuthorId', authorId);

      console.log('Отправка шаблона:', {
        Name: templateName,
        Type: templateType,
        IsPrivate: isPrivate,
        AuthorId: authorId,
        FileName: selectedFile.name,
        CurrentTemplateType: templateType
      });

      // Симуляция прогресса
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      try {
        const response = await templateApi.create(formData);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        console.log('Template uploaded successfully:', response.data);
        
        setUploadSuccess('Шаблон успішно завантажено!');
        setIsUploading(false);

        // Через 2 секунды переходим к списку шаблонов
        setTimeout(() => {
          navigate('/templates');
        }, 2000);

      } catch (error) {
        clearInterval(progressInterval);
        
        let errorMessage = 'Помилка завантаження шаблону';
        
        if (error.response?.data) {
          const errorData = error.response.data;
          
          if (errorData.title) {
            errorMessage = errorData.title;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (errorData.errors) {
            const validationErrors = Object.entries(errorData.errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
              .join('; ');
            errorMessage = `Помилки валідації: ${validationErrors}`;
          }
        }
        
        setUploadError(errorMessage);
        setIsUploading(false);
      }

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Помилка завантаження шаблону');
      setIsUploading(false);
    }
  }, [selectedFile, templateName, templateType, isPrivate, authorId, navigate]);

  // Форматирование размера файла
  const formatFileSize = useCallback((bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    // Состояние
    selectedFile,
    templateInfo,
    templateStructure,
    uploadProgress,
    isUploading,
    isAnalyzing,
    uploadError,
    uploadSuccess,
    templateName,
    templateDescription,
    templateType,
    isPrivate,
    currentUser,
    authorId,
    templateTypes,
    
    // Сеттеры
    setTemplateName,
    setTemplateDescription,
    setTemplateType,
    setIsPrivate,
    setUploadError,
    setUploadSuccess,
    
    // Функции
    handleFileSelect,
    handleRemoveFile,
    handleUpload,
    formatFileSize
  };
};