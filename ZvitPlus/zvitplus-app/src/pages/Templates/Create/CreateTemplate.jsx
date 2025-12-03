import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  ArrowBack, 
  UploadFile, 
  Description, 
  CreateNewFolder,
  Save,
  CheckCircle,
  Image,
  TableChart,
  BarChart,
  TextFields
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

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

  const steps = [
    'Основна інформація',
    'Додавання елементів',
    'Попередній перегляд'
  ];

  const templateTypes = [
    { value: 'Invoice', label: 'Рахунок' },
    { value: 'Contract', label: 'Договір' },
    { value: 'Report', label: 'Звіт' },
    { value: 'Letter', label: 'Лист' },
    { value: 'Form', label: 'Форма' },
    { value: 'Certificate', label: 'Сертифікат' }
  ];

  const pageSizes = ['A4', 'A3', 'Letter', 'Legal'];
  const orientations = ['portrait', 'landscape'];

  const elementTypes = [
    { type: 'text', label: 'Текст', icon: <TextFields />, color: 'primary' },
    { type: 'image', label: 'Зображення', icon: <Image />, color: 'secondary' },
    { type: 'table', label: 'Таблиця', icon: <TableChart />, color: 'info' },
    { type: 'chart', label: 'Діаграма', icon: <BarChart />, color: 'success' }
  ];

  const handleNext = () => {
    if (activeStep === 0 && (!templateData.name || !templateData.type)) {
      setError('Заповніть обов\'язкові поля');
      return;
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setError('');
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field, value) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddElement = (type) => {
    const newElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      position: { x: 50, y: 50 },
      ...(type === 'text' && { text: 'Новий текст', style: { fontSize: 12 } }),
      ...(type === 'image' && { src: '', size: { width: 100, height: 100 } }),
      ...(type === 'table' && { columns: ['Колонка 1'], rows: [] }),
      ...(type === 'chart' && { chartType: 'bar', dataSource: '', size: { width: 300, height: 200 } })
    };
    setElements([...elements, newElement]);
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
        elements: elements
      };

      // В реальном приложении здесь будет сохранение на сервер
      console.log('Сохранение шаблона:', templateJson);
      
      // Симуляция задержки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Шаблон успішно створено!');
      setLoading(false);
      
    } catch (err) {
      setError('Помилка при збереженні шаблона');
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Основні параметри шаблону
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Назва шаблону *"
                  value={templateData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Тип шаблону *</InputLabel>
                  <Select
                    value={templateData.type}
                    label="Тип шаблону *"
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    {templateTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Опис шаблону"
                  value={templateData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  margin="normal"
                  multiline
                  rows={3}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Розмір сторінки</InputLabel>
                  <Select
                    value={templateData.pageSize}
                    label="Розмір сторінки"
                    onChange={(e) => handleInputChange('pageSize', e.target.value)}
                  >
                    {pageSizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Орієнтація</InputLabel>
                  <Select
                    value={templateData.orientation}
                    label="Орієнтація"
                    onChange={(e) => handleInputChange('orientation', e.target.value)}
                  >
                    {orientations.map((orientation) => (
                      <MenuItem key={orientation} value={orientation}>
                        {orientation === 'portrait' ? 'Книжна' : 'Альбомна'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Додавання елементів
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Доступні типи елементів:
              </Typography>
              <Grid container spacing={2}>
                {elementTypes.map((elementType) => (
                  <Grid item xs={6} md={3} key={elementType.type}>
                    <Card 
                      variant="outlined"
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { 
                          bgcolor: `${elementType.color}.light`,
                          borderColor: `${elementType.color}.main`
                        }
                      }}
                      onClick={() => handleAddElement(elementType.type)}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Box sx={{ color: `${elementType.color}.main`, mb: 1 }}>
                          {elementType.icon}
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {elementType.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            {elements.length > 0 ? (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Додані елементи ({elements.length}):
                </Typography>
                <Grid container spacing={2}>
                  {elements.map((element, index) => (
                    <Grid item xs={12} md={6} key={element.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {elementTypes.find(t => t.type === element.type)?.icon}
                            <Typography variant="body2" fontWeight="medium" sx={{ ml: 1 }}>
                              {element.type} #{index + 1}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            ID: {element.id}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                Ще не додано жодного елементу. Натисніть на тип елементу вище, щоб додати.
              </Alert>
            )}
          </Box>
        );
      
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Попередній перегляд шаблону
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Інформація про шаблон
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2">
                    <strong>Назва:</strong> {templateData.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Тип:</strong> {templateTypes.find(t => t.value === templateData.type)?.label || templateData.type}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Розмір сторінки:</strong> {templateData.pageSize} ({templateData.orientation === 'portrait' ? 'Книжна' : 'Альбомна'})
                  </Typography>
                  {templateData.description && (
                    <Typography variant="body2">
                      <strong>Опис:</strong> {templateData.description}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    <strong>Елементів:</strong> {elements.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            {elements.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Структура елементів
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                  <pre style={{ margin: 0, fontSize: '12px' }}>
                    {JSON.stringify({ elements }, null, 2)}
                  </pre>
                </Paper>
              </Box>
            )}
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Заголовок и кнопка назад */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          component={RouterLink}
          to="/templates"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Назад до шаблонів
        </Button>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Створення нового шаблону
          </Typography>
          <Typography color="text.secondary">
            Покрокове створення власного шаблону звіту
          </Typography>
        </Box>
      </Box>

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      <Paper sx={{ mb: 3 }}>
        {renderStepContent(activeStep)}
      </Paper>

      {/* Messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
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
            >
              Перейти до шаблонів
            </Button>
          }
        >
          {success}
        </Alert>
      )}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0 || loading}
          startIcon={<ArrowBack />}
        >
          Назад
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSaveTemplate}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
            >
              {loading ? 'Збереження...' : 'Зберегти шаблон'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowBack sx={{ transform: 'rotate(180deg)' }} />}
            >
              Далі
            </Button>
          )}
        </Box>
      </Box>

      {/* Quick actions */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Швидкі опції
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<UploadFile />}
              component={RouterLink}
              to="/templates/upload"
            >
              Завантажити шаблон
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Description />}
              component={RouterLink}
              to="/templates"
            >
              Обрати з існуючих
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<CreateNewFolder />}
              onClick={() => window.location.reload()}
            >
              Новий шаблон
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Save />}
              onClick={() => {
                // Экспорт как JSON
                const dataStr = JSON.stringify({
                  templateName: templateData.name,
                  templateType: templateData.type,
                  pageSize: templateData.pageSize,
                  orientation: templateData.orientation,
                  elements: elements
                }, null, 2);
                
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${templateData.name || 'template'}.json`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              disabled={!templateData.name}
            >
              Експорт JSON
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateTemplate;