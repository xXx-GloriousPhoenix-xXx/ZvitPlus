import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Stack
} from '@mui/material';
import { templateTypes, pageSizes, orientations } from './constants';

const Step1BasicInfo = ({ templateData, onInputChange, errors }) => {
  const handleChange = (field) => (event) => {
    onInputChange(field, event.target.value);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Основні параметри шаблону
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Заповніть основну інформацію про ваш шаблон
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="medium">
            Назва шаблону *
          </Typography>
          <TextField
            fullWidth
            placeholder="Наприклад: Звіт про продажі"
            value={templateData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name || "Введіть назву шаблону"}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="medium">
            Тип шаблону *
          </Typography>
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel>Оберіть тип</InputLabel>
            <Select
              value={templateData.type}
              label="Оберіть тип"
              onChange={handleChange('type')}
            >
              {templateTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
            {errors.type && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.type}
              </Typography>
            )}
          </FormControl>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="medium">
            Опис шаблону (необов'язково)
          </Typography>
          <TextField
            fullWidth
            placeholder="Додайте опис для кращого розуміння призначення шаблону..."
            value={templateData.description}
            onChange={handleChange('description')}
            multiline
            rows={4}
            helperText="Цей текст допоможе іншим користувачам зрозуміти призначення шаблону"
          />
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight="medium">
                Розмір сторінки
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Оберіть розмір</InputLabel>
                <Select
                  value={templateData.pageSize}
                  label="Оберіть розмір"
                  onChange={handleChange('pageSize')}
                >
                  {pageSizes.map((size) => (
                    <MenuItem key={size.value} value={size.value}>
                      {size.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight="medium">
                Орієнтація сторінки
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Оберіть орієнтацію</InputLabel>
                <Select
                  value={templateData.orientation}
                  label="Оберіть орієнтацію"
                  onChange={handleChange('orientation')}
                >
                  {orientations.map((orientation) => (
                    <MenuItem key={orientation.value} value={orientation.value}>
                      {orientation.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Step1BasicInfo;