import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Button
} from '@mui/material';
import { 
  ArrowBack
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import {templateApi} from '../../../api/templateApi';

// Импорт компонентов
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Elements from './steps/step2/Step2Elements';
import Step3Preview from './steps/Step3Preview';
import StepperNavigation from './steps/StepperNavigation';

// Импорт констант
import { 
  steps, 
  defaultElementConfig,
  elementTypes  // Добавляем импорт
} from './steps/constants';

const CreateTemplate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [templateData, setTemplateData] = useState({
    name: '',
    type: '',
    description: '',
    pageSize: 'A4',
    orientation: 'portrait'
  });
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedElementId, setSelectedElementId] = useState(null); // Добавляем состояние для выбранного элемента

  const handleNext = () => {
    const errors = {};
    
    if (activeStep === 0) {
      if (!templateData.name.trim()) {
        errors.name = "Введіть назву шаблону";
      }
      if (!templateData.type || templateData.type === 'Unset') {
        errors.type = "Оберіть тип шаблону";
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }
    
    setValidationErrors({});
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setValidationErrors({});
    setError('');
    setSelectedElementId(null); // Сбрасываем выбранный элемент при возврате
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field, value) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Очищаем ошибку для этого поля при изменении
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleAddElement = (type, position = { x: 50, y: 50 }) => {
    const newElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      position: position,
      size: elementTypes.find(t => t.type === type)?.defaultSize || { width: 100, height: 100 },
      ...defaultElementConfig(type)
    };
    setElements([...elements, newElement]);
    setSelectedElementId(newElement.id); // Автоматически выбираем новый элемент
  };

  const handleRemoveElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null); // Сбрасываем выбор если удалили выбранный элемент
    }
  };

  const handleUpdateElement = (id, updates) => {
    setElements(elements.map(element => 
      element.id === id ? { ...element, ...updates } : element
    ));
  };

  const handleClearAllElements = () => {
    setElements([]);
    setSelectedElementId(null); // Сбрасываем выбор при очистке всех элементов
  };

  const handleSaveTemplate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Валидация данных
      if (!templateData.name || templateData.name.trim() === '') {
        throw new Error('Введіть назву шаблону');
      }
      
      if (!templateData.type || templateData.type === 'Unset') {
        throw new Error('Виберіть тип шаблону');
      }
      
      if (elements.length === 0) {
        throw new Error('Додайте хоча б один елемент на полотно');
      }
  
      // Получаем информацию о пользователе
      let userId = null;
      let userName = 'Unknown';
      
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          userId = parsedUser.id || parsedUser.userId;
          userName = parsedUser.login || parsedUser.email || 'Unknown';
          
          // Проверяем, что userId есть
          if (!userId) {
            throw new Error('Не вдалося отримати ID користувача. Будь ласка, увійдіть знову.');
          }
        } else {
          throw new Error('Користувач не авторизований');
        }
      } catch (e) {
        throw new Error('Помилка отримання даних користувача: ' + e.message);
      }
  
      // Создаем структуру template.json
      const templateJson = {
        templateName: templateData.name,
        templateType: templateData.type,
        pageSize: templateData.pageSize,
        orientation: templateData.orientation,
        createdDate: new Date().toISOString(),
        authorId: userId,
        authorName: userName,
        version: '1.0',
        description: templateData.description || '',
        elements: elements.map(element => {
          // Очищаем элементы от временных полей
          const { isDragging, isResizing, isSelected, ...cleanElement } = element;
          return cleanElement;
        })
      };
  
      console.log('Сохранение шаблона:', templateJson);
      
      // Создаем FormData для отправки
      const formData = new FormData();
      
      // 1. Добавляем файл с расширением .rep
      const jsonContent = JSON.stringify(templateJson, null, 2);
      const jsonBlob = new Blob([jsonContent], {
        type: 'application/json'
      });
      
      // Используем расширение .rep как требуется сервером
      const fileName = `${templateData.name.replace(/\s+/g, '_')}.rep`;
      formData.append('File', jsonBlob, fileName);
      
      // 2. Добавляем обязательные поля согласно TemplateCreateDTO
      formData.append('Name', templateData.name);
      
      // Преобразуем тип шаблона в формат, который понимает сервер
      // Сопоставление типов с enum TemplateType
      const templateTypeMapping = {
        'Invoice': 'Invoice',
        'Contract': 'Contract',
        'Report': 'Report',
        'Letter': 'Letter',
        'Form': 'Form',
        'Certificate': 'Certificate',
        'Unset': 'Report' // По умолчанию ставим Report
      };
      
      const serverTemplateType = templateTypeMapping[templateData.type] || 'Report';
      formData.append('Type', serverTemplateType);
      
      // 3. Добавляем IsPrivate (по умолчанию false - шаблон публичный)
      formData.append('IsPrivate', 'false');
      
      // 4. Добавляем AuthorId
      formData.append('AuthorId', userId);
      
      // Для отладки: выводим содержимое FormData
      console.log('Отправляемые данные:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }
      
      // Отправляем на сервер через API
      const response = await templateApi.create(formData, (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Прогресс загрузки: ${percentCompleted}%`);
        }
      });
      
      console.log('Ответ сервера:', response.data);
      
      if (response.data) {
        setSuccess(`Шаблон "${templateData.name}" успішно створено!`);
        
        // Сброс формы через 3 секунды
        setTimeout(() => {
          setTemplateData({
            name: '',
            type: '',
            description: '',
            pageSize: 'A4',
            orientation: 'portrait'
          });
          setElements([]);
          setActiveStep(0);
          setSelectedElementId(null);
        }, 3000);
      }
      
      setLoading(false);
      
    } catch (err) {
      console.error('Ошибка сохранения шаблона:', err);
      
      let errorMessage = 'Помилка при збереженні шаблона';
      
      if (err.response) {
        const { status, data } = err.response;
        
        console.log('Данные ошибки:', data);
        
        switch (status) {
          case 400:
            // Пробуем извлечь детали ошибки
            if (data && typeof data === 'object') {
              if (data.errors) {
                // ASP.NET Core Validation Errors
                const validationMessages = Object.values(data.errors).flat();
                errorMessage = `Помилки валідації: ${validationMessages.join(', ')}`;
              } else if (data.message) {
                errorMessage = data.message;
              } else {
                errorMessage = 'Невірний формат даних. Перевірте всі поля.';
              }
            } else if (typeof data === 'string') {
              errorMessage = data;
            }
            break;
          case 401:
            errorMessage = 'Необхідно авторизуватися';
            break;
          case 403:
            errorMessage = 'Недостатньо прав для створення шаблону';
            break;
          case 409:
            errorMessage = 'Шаблон з такою назвою вже існує';
            break;
          case 413:
            errorMessage = 'Файл занадто великий';
            break;
          case 500:
            errorMessage = 'Внутрішня помилка сервера';
            break;
          default:
            errorMessage = `Помилка сервера: ${status}`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
      
      // Автоматическое скрытие ошибки через 5 секунд
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Step1BasicInfo
            templateData={templateData}
            onInputChange={handleInputChange}
            errors={validationErrors}
          />
        );
      
      case 1:
        return (
          <Step2Elements
            elements={elements}
            onAddElement={handleAddElement}
            onRemoveElement={handleRemoveElement}
            onUpdateElement={handleUpdateElement}
            onClearAll={handleClearAllElements}
            templateData={templateData}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
          />
        );
      
      case 2:
        return (
          <Step3Preview
            templateData={templateData}
            elements={elements}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Container
      maxWidth={
        activeStep === 1
          ? "xl"
          : "md"
      }
      sx={{ mt: 4, mb: 6 }}
    >
      {/* Заголовок и кнопка назад */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          component={RouterLink}
          to="/templates"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Назад до вибору
        </Button>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Створення нового шаблону
          </Typography>
          <Typography color="text.secondary">
            Покрокове створення власного шаблону звіту
          </Typography>
        </Box>
      </Box>

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel 
                StepIconProps={{
                  sx: {
                    '&.Mui-completed': { color: 'success.main' },
                    '&.Mui-active': { color: 'primary.main' }
                  }
                }}
              >
                <Typography variant="subtitle2" fontWeight="medium">
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        {renderStepContent()}
      </Paper>

      {/* Messages */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          action={
            <Button 
              component={RouterLink} 
              to="/templates" 
              color="inherit" 
              size="small"
              sx={{ fontWeight: 'bold' }}
            >
              Перейти до шаблонів
            </Button>
          }
        >
          <Typography fontWeight="medium">
            {success} Шаблон готовий до використання.
          </Typography>
        </Alert>
      )}

      {/* Navigation */}
      <StepperNavigation
        activeStep={activeStep}
        onBack={handleBack}
        onNext={handleNext}
        onSave={handleSaveTemplate}
        loading={loading}
        templateData={templateData}
        elements={elements}
        steps={steps}
      />
    </Container>
  );
};

export default CreateTemplate;