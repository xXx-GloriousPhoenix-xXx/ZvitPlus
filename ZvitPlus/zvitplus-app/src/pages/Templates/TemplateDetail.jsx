import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { Download, Edit, ArrowBack, Description } from '@mui/icons-material';
import { Link as RouterLink, useParams } from 'react-router-dom';

const TemplateDetail = () => {
  const { id } = useParams();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={RouterLink}
          to="/templates"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Назад
        </Button>
        <Description sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h4" fontWeight="bold">
          Деталі шаблону
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Шаблон #{id}</Typography>
          <Box>
            <Button 
              component={RouterLink}
              to={`/create-report/${id}`}
              variant="contained"
              sx={{ mr: 1 }}
            >
              Створити звіт
            </Button>
            <Button startIcon={<Download />}>
              Завантажити
            </Button>
          </Box>
        </Box>
        
        <Typography color="text.secondary">
          Детальна інформація про шаблон...
        </Typography>
      </Paper>
    </Container>
  );
};

export default TemplateDetail;