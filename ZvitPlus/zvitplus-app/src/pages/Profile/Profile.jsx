// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Avatar,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import {
  Person,
  Email,
  CalendarToday,
  Security,
  Notifications,
  Language,
  CloudUpload,
  Save,
  Edit,
  Download
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    loadUserData();
  }, []);
  
  const loadUserData = () => {
    try {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          language: userData.language || 'uk',
          notifications: userData.notifications !== false
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };
  
  const handleSave = async () => {
    setSaving(true);
    // Здесь будет API запрос для сохранения
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);
      setSaving(false);
    }, 1000);
  };
  
  const handleExportData = () => {
    // Экспорт данных пользователя
    const dataStr = JSON.stringify(user, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zvitplus-profile-${user.email}.json`;
    link.click();
  };
  
  const handleDeleteAccount = () => {
    if (window.confirm('Ви впевнені, що хочете видалити акаунт? Цю дію неможливо скасувати.')) {
      // API запрос на удаление аккаунта
      localStorage.clear();
      navigate('/');
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Мій профіль
      </Typography>
      
      <Grid container spacing={3}>
        {/* Левая колонка - основная информация */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Особиста інформація</Typography>
              <Button
                startIcon={editMode ? <Save /> : <Edit />}
                onClick={editMode ? handleSave : () => setEditMode(true)}
                variant={editMode ? "contained" : "outlined"}
                disabled={saving}
              >
                {editMode ? 'Зберегти' : 'Редагувати'}
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ім'я"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  disabled
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!editMode}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Мова"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: <Language sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  select
                  SelectProps={{ native: true }}
                >
                  <option value="uk">Українська</option>
                  <option value="en">English</option>
                </TextField>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Статистика */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Статистика</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">12</Typography>
                    <Typography variant="body2">Шаблонів</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">47</Typography>
                    <Typography variant="body2">Звітів</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">3.2GB</Typography>
                    <Typography variant="body2">Використано</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">28д</Typography>
                    <Typography variant="body2">В системі</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Правая колонка - настройки и действия */}
        <Grid item xs={12} md={4}>
          {/* Аватар и роль */}
          <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: '0 auto 16px',
                bgcolor: 'primary.main',
                fontSize: '2rem'
              }}
            >
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            
            <Typography variant="h6">{user.name || 'Користувач'}</Typography>
            <Typography color="text.secondary" gutterBottom>{user.email}</Typography>
            
            <Chip 
              label={user.role === 'admin' ? 'Адміністратор' : 'Користувач'} 
              color={user.role === 'admin' ? 'secondary' : 'primary'}
              sx={{ mt: 1 }}
            />
            
            <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
              <CalendarToday sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
              Зареєстрований: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Невідомо'}
            </Typography>
          </Paper>
          
          {/* Настройки */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Security sx={{ verticalAlign: 'middle', mr: 1 }} />
              Налаштування
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Сповіщення по email" />
                <Switch 
                  checked={formData.notifications}
                  onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                  disabled={!editMode}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText 
                  primary="Автоматичне збереження"
                  secondary="Автоматично зберігати зміни"
                />
                <Switch defaultChecked disabled={!editMode} />
              </ListItem>
            </List>
          </Paper>
          
          {/* Действия */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Дії</Typography>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExportData}
              sx={{ mb: 2 }}
            >
              Експортувати мої дані
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              onClick={() => navigate('/change-password')}
              sx={{ mb: 2 }}
            >
              Змінити пароль
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Alert severity="warning" sx={{ mb: 2 }}>
              Видалення акаунта незворотнє. Усі ваші дані будуть втрачені.
            </Alert>
            
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleDeleteAccount}
            >
              Видалити акаунт
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;