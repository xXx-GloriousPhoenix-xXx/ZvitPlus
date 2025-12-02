import React from 'react';
import { Search, Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Paper, TextField, InputAdornment, Grid, Button, Box } from '@mui/material';

const TemplateList = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Шаблони
        </Typography>
        <Button
          component={RouterLink}
          to="/templates/create"
          variant="contained"
          startIcon={<Add />}
        >
          Новий шаблон
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Пошук шаблонів..."
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
              Фільтри: за типом, датою, автором
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Список шаблонів</Typography>
        <Typography color="text.secondary">
          Тут будуть відображатися всі доступні шаблони...
        </Typography>
      </Paper>
    </Container>
  );
};

export default TemplateList;