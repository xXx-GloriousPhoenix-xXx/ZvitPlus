import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import { templateTypes, pageSizes, orientations, elementTypes } from '../constants';

const Step3Preview = ({ templateData, elements }) => {
  const getTypeLabel = (typeValue) => {
    const type = templateTypes.find(t => t.value === typeValue);
    return type ? type.label : 'Не вказано';
  };

  const getPageSizeLabel = (sizeValue) => {
    const size = pageSizes.find(p => p.value === sizeValue);
    return size ? size.label : 'A4';
  };

  const getOrientationLabel = (orientationValue) => {
    const orientation = orientations.find(o => o.value === orientationValue);
    return orientation ? orientation.label : 'Книжна';
  };

  const elementTypeCounts = elementTypes.map(elType => ({
    ...elType,
    count: elements.filter(el => el.type === elType.type).length
  })).filter(el => el.count > 0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Попередній перегляд шаблону
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Перевірте інформацію перед збереженням шаблону
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                Основна інформація
              </Typography>
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Назва шаблону
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {templateData.name || 'Не вказано'}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Тип шаблону
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {getTypeLabel(templateData.type)}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Розмір та орієнтація
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {getPageSizeLabel(templateData.pageSize)} 
                    {' • '}
                    {getOrientationLabel(templateData.orientation)}
                  </Typography>
                </Box>
                
                {templateData.description && (
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Опис
                    </Typography>
                    <Typography variant="body1">
                      {templateData.description}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                Статистика
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {elements.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Елементів
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary" fontWeight="bold">
                      {new Date().toLocaleDateString('uk-UA')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Дата створення
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              {elementTypeCounts.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Розподіл за типами:
                  </Typography>
                  <Stack spacing={0.5}>
                    {elementTypeCounts.map(elType => (
                      <Box key={elType.type} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%',
                          bgcolor: `${elType.color}.main`,
                          mr: 1
                        }} />
                        <Typography variant="caption">
                          {elType.label}: {elType.count}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                Попередній перегляд структури
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                JSON структура вашого шаблону:
              </Typography>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  maxHeight: 400, 
                  overflow: 'auto',
                  bgcolor: 'grey.50',
                  fontSize: '0.8rem'
                }}
              >
                <pre style={{ margin: 0, lineHeight: '1.4' }}>
                  {JSON.stringify({
                    templateName: templateData.name,
                    templateType: templateData.type,
                    pageSize: templateData.pageSize,
                    orientation: templateData.orientation,
                    elements: elements.slice(0, 3)
                  }, null, 2)}
                </pre>
                {elements.length > 3 && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    ... та ще {elements.length - 3} елементів
                  </Typography>
                )}
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step3Preview;