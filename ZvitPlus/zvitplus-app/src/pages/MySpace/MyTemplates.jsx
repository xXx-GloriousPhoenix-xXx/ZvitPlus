import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MyTemplates = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Мої шаблони
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Button
          component={RouterLink}
          to="/templates/create"
          variant="contained"
          startIcon={<Add />}
        >
          Завантажити новий шаблон
        </Button>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Список шаблонів</Typography>
        <Typography color="text.secondary">
          Тут будуть відображатися ваші шаблони...
        </Typography>
      </Paper>
    </Container>
  );
};

export default MyTemplates;