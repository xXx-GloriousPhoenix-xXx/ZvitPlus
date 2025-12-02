import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Reports = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center">
          Звіти
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
          Сторінка звітів (в розробці)
        </Typography>
      </Paper>
    </Container>
  );
};

export default Reports;