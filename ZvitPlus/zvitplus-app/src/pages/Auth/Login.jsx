import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '../../api/authApi';

// Схема валидации
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Невірний формат email')
    .required('Email обов\'язковий'),
  password: Yup.string()
    .min(4, 'Пароль має містити мінімум 6 символів') //6
    .required('Пароль обов\'язковий'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError('');
      setLoading(true);
      
      try {
        // Создаем FormData для отправки
        const formData = new FormData();
        formData.append('Identifier', values.email); // <- ИЗМЕНИТЬ НА Identifier
        formData.append('Password', values.password);
  
        console.log('Отправляем FormData:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
  
        // Отправляем запрос на бэкенд
        const response = await authApi.login(formData);
        
        console.log('Ответ сервера:', response.data);
        
        // Сохраняем токен и данные пользователя
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Перенаправляем на главную страницу
        navigate('/templates');
        
      } catch (err) {
        console.error('Login error details:', err);
        console.error('Response data:', err.response?.data);
        console.error('Response status:', err.response?.status);
        
        // Более детальное сообщение об ошибке
        let errorMessage = 'Помилка входу. Перевірте дані та спробуйте ще раз.';
        
        if (err.response?.data) {
          const errorData = err.response.data;
          
          // Если это объект ProblemDetails
          if (errorData.title) {
            errorMessage = errorData.title;
          }
          // Если есть сообщение
          else if (errorData.message) {
            errorMessage = errorData.message;
          }
          // Если это строка
          else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
          // Если есть ошибки валидации
          else if (errorData.errors) {
            const validationErrors = Object.values(errorData.errors).flat().join(', ');
            errorMessage = `Помилки валідації: ${validationErrors}`;
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Вхід до системи
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Увійдіть у свій обліковий запис для доступу до функціоналу
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            autoComplete="email"
            autoFocus
            InputProps={{
              sx: { borderRadius: 1 }
            }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            autoComplete="current-password"
            InputProps={{
              sx: { borderRadius: 1 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: 'right', mt: 1, mb: 3 }}>
            <Link 
              component={RouterLink} 
              to="/forgot-password" 
              underline="hover"
              color="primary"
            >
              Забули пароль?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              mt: 2
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Увійти'
            )}
          </Button>
        </form>

        <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" align="center" color="text.secondary">
            Ще не маєте облікового запису?{' '}
            <Link 
              component={RouterLink} 
              to="/register" 
              underline="hover"
              fontWeight="bold"
              color="primary"
            >
              Зареєструватися
            </Link>
          </Typography>
        </Box>

        {/* Демо кнопки для тестирования (можно удалить) */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              formik.setValues({ 
                email: 'admin@zvitplus.com', // Используем правильный email
                password: 'admin' 
              });
            }}
          >
            Тест админа
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              formik.setValues({ email: 'user@example.com', password: 'User123!' });
            }}
          >
            Тест пользователя
          </Button>
        </Box>
      </Paper>

      {/* Информация о системе */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          ZvitPlus © {new Date().getFullYear()} | Система генерації звітів
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;