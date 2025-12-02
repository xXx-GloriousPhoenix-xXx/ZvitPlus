import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { Download, Edit, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink, useParams } from 'react-router-dom';

const ReportDetail = () => {
  const { id } = useParams();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={RouterLink}
          to="/reports"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Назад
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Деталі звіту
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Звіт #{id}</Typography>
          <Box>
            <Button startIcon={<Download />} sx={{ mr: 1 }}>
              Завантажити
            </Button>
            <Button startIcon={<Edit />} variant="outlined">
              Редагувати
            </Button>
          </Box>
        </Box>
        
        <Typography color="text.secondary">
          Детальна інформація про звіт...
        </Typography>
      </Paper>
    </Container>
  );
};

export default ReportDetail;