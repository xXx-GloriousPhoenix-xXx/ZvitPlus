import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const MyReports = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Мої звіти
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Список звітів</Typography>
        <Typography color="text.secondary">
          Тут будуть відображатися ваші створені звіти...
        </Typography>
      </Paper>
    </Container>
  );
};

export default MyReports;