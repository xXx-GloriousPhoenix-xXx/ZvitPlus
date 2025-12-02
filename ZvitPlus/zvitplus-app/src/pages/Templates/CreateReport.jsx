import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const CreateReport = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={RouterLink}
          to="/templates"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Назад до шаблонів
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Створення звіту
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Виберіть шаблон</Typography>
        <Typography color="text.secondary" paragraph>
          Оберіть шаблон зі списку або завантажте новий...
        </Typography>
        
        <Button 
          component={RouterLink}
          to="/templates"
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Обрати з існуючих
        </Button>
        <Button 
          component={RouterLink}
          to="/templates/create"
          variant="contained"
        >
          Завантажити новий
        </Button>
      </Paper>
    </Container>
  );
};

export default CreateReport;