import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  Divider,
  IconButton
} from '@mui/material';
import {
  TextFields,
  Image,
  TableChart,
  BarChart,
  Delete
} from '@mui/icons-material';
import { elementTypes } from '../constants';

const Step2Elements = ({ elements, onAddElement, onRemoveElement, onClearAll }) => {
  const getElementIcon = (type) => {
    switch (type) {
      case 'text': return <TextFields />;
      case 'image': return <Image />;
      case 'table': return <TableChart />;
      case 'chart': return <BarChart />;
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Додавання елементів
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Додайте необхідні елементи до вашого шаблону
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Доступні типи елементів:
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
          Натисніть на тип елементу, щоб додати його до шаблону
        </Typography>
        
        <Grid container spacing={2}>
          {elementTypes.map((elementType) => (
            <Grid item xs={6} md={3} key={elementType.type}>
              <Card 
                variant="outlined"
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    bgcolor: `${elementType.color}.light`,
                    borderColor: `${elementType.color}.main`,
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => onAddElement(elementType.type)}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Box sx={{ 
                    color: `${elementType.color}.main`, 
                    mb: 2,
                    fontSize: 40 
                  }}>
                    {getElementIcon(elementType.type)}
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {elementType.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {elementType.type === 'text' && 'Текстові поля'}
                    {elementType.type === 'image' && 'Зображення та логотипи'}
                    {elementType.type === 'table' && 'Таблиці з даними'}
                    {elementType.type === 'chart' && 'Діаграми та графіки'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {elements.length > 0 ? (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              Додані елементи ({elements.length}):
            </Typography>
            <Button 
              size="small" 
              color="error"
              onClick={onClearAll}
              startIcon={<Delete />}
            >
              Видалити всі
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            {elements.map((element, index) => (
              <Grid item xs={12} key={element.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          color: elementTypes.find(t => t.type === element.type)?.color + '.main',
                          mr: 1.5 
                        }}>
                          {getElementIcon(element.type)}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {elementTypes.find(t => t.type === element.type)?.label} #{index + 1}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {element.id.substring(0, 8)}...
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => onRemoveElement(element.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    {element.type === 'text' && (
                      <Typography variant="body2" color="text.secondary">
                        Текст: "{element.text}"
                      </Typography>
                    )}
                    {element.type === 'image' && (
                      <Typography variant="body2" color="text.secondary">
                        Зображення: {element.src || 'Не вказано'}
                      </Typography>
                    )}
                    {element.type === 'table' && (
                      <Typography variant="body2" color="text.secondary">
                        Таблиця з {element.columns?.length || 0} колонками
                      </Typography>
                    )}
                    {element.type === 'chart' && (
                      <Typography variant="body2" color="text.secondary">
                        Діаграма типу: {element.chartType}
                      </Typography>
                    )}
                    
                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                      Позиція: X={element.position?.x || 0}, Y={element.position?.y || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Alert 
          severity="info" 
          sx={{ mt: 3 }}
          icon={false}
        >
          <Typography variant="body1" fontWeight="medium" gutterBottom>
            Ще не додано жодного елементу
          </Typography>
          <Typography variant="body2">
            Натисніть на один з типів елементів вище, щоб додати його до вашого шаблону.
            Ви можете додавати текст, зображення, таблиці та діаграми.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default Step2Elements;