import React from 'react';
import { Container, Typography, Paper, Button, Grid, Box } from '@mui/material';
import { Description, Assessment, Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Мій простір
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Description sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6">Мої шаблони</Typography>
            <Button 
              component={RouterLink} 
              to="/my-space/templates"
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Переглянути
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Assessment sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6">Мої звіти</Typography>
            <Button 
              component={RouterLink} 
              to="/my-space/reports"
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Переглянути
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Add sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6">Створити звіт</Typography>
            <Button 
              component={RouterLink} 
              to="/templates"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Обрати шаблон
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Остання активність</Typography>
        <Typography color="text.secondary">
          Тут буде відображатися ваша остання активність...
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;