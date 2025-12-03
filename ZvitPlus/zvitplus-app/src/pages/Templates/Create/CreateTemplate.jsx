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

// Импорт компонентов
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Elements from './steps/Step2Elements';
import Step3Preview from './steps/Step3Preview';
import StepperNavigation from './steps/StepperNavigation';

// Импорт констант
import { 
  steps, 
  defaultElementConfig 
} from './constants';

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

  const handleAddElement = (type) => {
    const newElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      position: { x: 50, y: 50 },
      ...defaultElementConfig(type)
    };
    setElements([...elements, newElement]);
  };

  const handleRemoveElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
  };

  const handleClearAllElements = () => {
    setElements([]);
  };

  const handleSaveTemplate = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Создаем структуру template.json
      const templateJson = {
        templateName: templateData.name,
        templateType: templateData.type,
        pageSize: templateData.pageSize,
        orientation: templateData.orientation,
        createdDate: new Date().toISOString(),
        author: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).login : 'Unknown',
        version: '1.0',
        elements: elements
      };

      console.log('Сохранение шаблона:', templateJson);
      
      // Симуляция задержки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Шаблон успішно створено!');
      setLoading(false);
      
    } catch (err) {
      setError('Помилка при збереженні шаблона: ' + err.message);
      setLoading(false);
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
            onClearAll={handleClearAllElements}
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {/* Заголовок и кнопка назад */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          component={RouterLink}
          to="/templates/create"
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