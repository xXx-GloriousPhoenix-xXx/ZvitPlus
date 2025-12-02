import React from 'react';
import { Container, Typography, Paper, TextField, InputAdornment, Grid } from '@mui/material';
import { Search } from '@mui/icons-material';

const ReportList = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Всі звіти
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Пошук звітів..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Фільтри: за датою, типом, автором
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Список всіх звітів</Typography>
        <Typography color="text.secondary">
          Тут будуть відображатися всі звіти...
        </Typography>
      </Paper>
    </Container>
  );
};

export default ReportList;