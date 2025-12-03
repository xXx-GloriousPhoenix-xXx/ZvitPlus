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
  Link,
  Stack
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '../../api/authApi';

// Схема валидации
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Невірний формат email')
    .required('Email обов\'язковий')
    .max(100, 'Email занадто довгий'),
  login: Yup.string()
    .min(3, 'Логін має містити мінімум 3 символи')
    .max(50, 'Логін занадто довгий')
    .matches(/^[a-zA-Z0-9_]+$/, 'Логін може містити лише літери, цифри та підкреслення')
    .required('Логін обов\'язковий'),
  password: Yup.string()
    .min(6, 'Пароль має містити мінімум 6 символів')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Пароль має містити хоча б одну велику літеру, одну маленьку літеру та одну цифру'
    )
    .required('Пароль обов\'язковий'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати')
    .required('Підтвердження паролю обов\'язкове'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      login: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');
      setLoading(true);
      
      try {
        const formData = new FormData();
        formData.append('Email', values.email);
        formData.append('Login', values.login);
        formData.append('Password', values.password);

        console.log('Отправляем FormData регистрации:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await authApi.register(formData);
        
        console.log('Ответ сервера при регистрации:', response.data);
        
        setSuccess('Реєстрація успішна! Тепер ви можете увійти у систему.');
        formik.resetForm();
        
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        
      } catch (err) {
        console.error('Register error details:', err);
        
        let errorMessage = 'Помилка реєстрації. Спробуйте ще раз.';
        
        if (err.response?.data) {
          const errorData = err.response.data;
          
          if (errorData.title) {
            errorMessage = errorData.title;
          }
          else if (errorData.message) {
            errorMessage = errorData.message;
          }
          else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
          else if (errorData.errors) {
            const validationErrors = Object.entries(errorData.errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
              .join('; ');
            errorMessage = `Помилки валідації: ${validationErrors}`;
          }
          else if (errorData.type?.includes('Duplicate')) {
            errorMessage = 'Користувач з таким email або логіном вже існує';
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

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Функция для генерации надежного пароля
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    password += '0123456789'.charAt(Math.floor(Math.random() * 10));
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
    password += 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
    
    for (let i = 3; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    formik.setValues({
      ...formik.values,
      password: password,
      confirmPassword: password
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, sm: 4 }, 
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative'
        }}
      >
        {/* Кнопка назад */}
        <Button
          component={RouterLink}
          to="/login"
          startIcon={<ArrowBack />}
          sx={{ 
            position: 'absolute', 
            top: { xs: 8, sm: 16 }, 
            left: { xs: 8, sm: 16 },
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Назад
        </Button>
        
        <Box sx={{ textAlign: 'center', mb: 4, mt: { xs: 4, sm: 2 } }}>
          <PersonAdd sx={{ 
            fontSize: { xs: 40, sm: 48 }, 
            color: 'primary.main', 
            mb: 2 
          }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Реєстрація
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Створіть новий обліковий запис
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

        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setSuccess('')}
          >
            {success}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            {/* Email поле */}
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
              autoComplete="email"
              autoFocus
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />

            {/* Логин поле */}
            <TextField
              fullWidth
              id="login"
              name="login"
              label="Логін"
              type="text"
              variant="outlined"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
              autoComplete="username"
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />

            {/* Пароль поле */}
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
              autoComplete="new-password"
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

            {/* Подтверждение пароля поле */}
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Підтвердження паролю"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              autoComplete="new-password"
              InputProps={{
                sx: { borderRadius: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Кнопка генерации пароля */}
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={generatePassword}
                sx={{ textTransform: 'none' }}
              >
                Згенерувати надійний пароль
              </Button>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ display: 'block', mt: 0.5 }}
              >
                Автоматично створить безпечний пароль
              </Typography>
            </Box>

            {/* Требования к паролю */}
            <Box sx={{ 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <Typography variant="subtitle2" gutterBottom color="text.primary">
                Вимоги до паролю:
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                  • Мінімум 6 символів
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Хоча б одна велика літера (A-Z)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Хоча б одна маленька літера (a-z)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Хоча б одна цифра (0-9)
                </Typography>
              </Stack>
            </Box>

            {/* Кнопка регистрации */}
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
                mt: 1
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Зареєструватися'
              )}
            </Button>
          </Stack>
        </form>

        {/* Ссылка на вход */}
        <Box sx={{ 
          mt: 4, 
          pt: 3, 
          borderTop: 1, 
          borderColor: 'divider',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            Вже маєте обліковий запис?{' '}
            <Link 
              component={RouterLink} 
              to="/login" 
              underline="hover"
              fontWeight="bold"
              color="primary"
            >
              Увійти
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* Информация о системе */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Звіт+ © {new Date().getFullYear()} | Система генерації звітів
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;