import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Ласкаво просимо до Звіт+
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Система генерації звітів
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            size="large"
          >
            Увійти
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/register"
            size="large"
          >
            Реєстрація
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;