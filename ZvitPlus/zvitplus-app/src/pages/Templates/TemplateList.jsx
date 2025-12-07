import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Add, 
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Download,
  Visibility,
  FileCopy
} from '@mui/icons-material';
import { 
  Link as RouterLink,
  useNavigate 
} from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  InputAdornment, 
  Grid, 
  Button, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider,
  Tooltip
} from '@mui/material';
import { format } from 'date-fns';
import { templateApi } from '../../api/templateApi';

const TemplateList = () => {
  const navigate = useNavigate();
  
  // Состояния
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [filterType, setFilterType] = useState('');
  const [filterVisibility, setFilterVisibility] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Меню действий для каждого шаблона
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Фильтры типов
  const templateTypes = [
    { value: '', label: 'Всі типи' },
    { value: 'Invoice', label: 'Рахунок' },
    { value: 'Contract', label: 'Договір' },
    { value: 'Report', label: 'Звіт' },
    { value: 'Letter', label: 'Лист' },
    { value: 'Form', label: 'Форма' },
    { value: 'Certificate', label: 'Сертифікат' }
  ];
  
  // Видимость шаблонов
  const visibilityOptions = [
    { value: '', label: 'Всі' },
    { value: 'public', label: 'Публічні' },
    { value: 'private', label: 'Приватні' }
  ];
  
  // Загрузка шаблонов
  const loadTemplates = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Вычисляем страницу для API (API использует 1-based индексацию)
      const apiPage = page + 1;
      
      const response = await templateApi.getAll(apiPage, rowsPerPage);
      
      if (response.data && Array.isArray(response.data.templates)) {
        setTemplates(response.data.templates);
        setTotalTemplates(response.data.totalCount || response.data.templates.length);
      } else {
        // Если структура ответа другая
        setTemplates(Array.isArray(response.data) ? response.data : []);
        setTotalTemplates(response.data?.length || 0);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Ошибка загрузки шаблонов:', err);
      setError('Не вдалося завантажити шаблони');
      setTemplates([]);
      setLoading(false);
    }
  };
  
  // Загрузка шаблонов при изменении страницы, фильтров или поиска
  useEffect(() => {
    loadTemplates();
  }, [page, rowsPerPage, filterType, filterVisibility, sortBy, sortOrder]);
  
  // Поиск с задержкой
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        loadTemplates();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Обработчики пагинации
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Обработчики меню действий
  const handleMenuOpen = (event, template) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTemplate(null);
  };
  
  // Действия с шаблонами
  const handleViewTemplate = (template) => {
    navigate(`/templates/${template.id}/preview`);
    handleMenuClose();
  };
  
  const handleEditTemplate = (template) => {
    navigate(`/templates/${template.id}/edit`);
    handleMenuClose();
  };
  
  const handleDuplicateTemplate = async (template) => {
    try {
      // Здесь можно реализовать дублирование шаблона
      alert(`Дублікат шаблону "${template.name}" створюється...`);
      handleMenuClose();
    } catch (err) {
      setError('Помилка при створенні дублікату');
    }
  };
  
  const handleDownloadTemplate = async (template) => {
    try {
      const response = await templateApi.download(template.id);
      
      // Создаем URL для скачивания файла
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', template.originalFileName || `${template.name}.rep`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      handleMenuClose();
    } catch (err) {
      setError('Помилка при завантаженні шаблону');
    }
  };
  
  const handleDeleteTemplate = async (template) => {
    if (window.confirm(`Видалити шаблон "${template.name}"?`)) {
      try {
        await templateApi.delete(template.id);
        loadTemplates(); // Перезагружаем список
        handleMenuClose();
      } catch (err) {
        setError('Помилка при видаленні шаблону');
      }
    }
  };
  
  // Форматирование даты
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
    } catch {
      return dateString;
    }
  };
  
  // Форматирование размера файла
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Получение цвета для типа шаблона
  const getTypeColor = (type) => {
    const colors = {
      'Invoice': 'primary',
      'Contract': 'info',
      'Report': 'success',
      'Letter': 'warning',
      'Form': 'secondary',
      'Certificate': 'error'
    };
    return colors[type] || 'default';
  };
  
  // Если загрузка
  if (loading && templates.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Заголовок и кнопка создания */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Шаблони
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Управління вашими шаблонами документів
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to="/templates/create"
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Створити шаблон
        </Button>
      </Box>
      
      {/* Сообщения об ошибках */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      {/* Карточка статистики */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Загальна кількість
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {totalTemplates}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                шаблонів в системі
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Публічні шаблони
              </Typography>
              <Typography variant="h3" color="success" fontWeight="bold">
                {templates.filter(t => !t.isPrivate).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                доступні для всіх
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ваші шаблони
              </Typography>
              <Typography variant="h3" color="info" fontWeight="bold">
                {templates.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                на поточній сторінці
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Панель поиска и фильтров */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Пошук за назвою або автором..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Тип шаблону</InputLabel>
              <Select
                value={filterType}
                label="Тип шаблону"
                onChange={(e) => setFilterType(e.target.value)}
              >
                {templateTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Видимість</InputLabel>
              <Select
                value={filterVisibility}
                label="Видимість"
                onChange={(e) => setFilterVisibility(e.target.value)}
              >
                {visibilityOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setFilterType('');
                setFilterVisibility('');
                setSearchTerm('');
              }}
            >
              Очистити
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Таблица шаблонов */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell width="30%">
                  <Typography fontWeight="bold">Назва</Typography>
                </TableCell>
                <TableCell width="15%">
                  <Typography fontWeight="bold">Тип</Typography>
                </TableCell>
                <TableCell width="15%">
                  <Typography fontWeight="bold">Автор</Typography>
                </TableCell>
                <TableCell width="15%">
                  <Typography fontWeight="bold">Створено</Typography>
                </TableCell>
                <TableCell width="15%">
                  <Typography fontWeight="bold">Розмір</Typography>
                </TableCell>
                <TableCell width="10%" align="right">
                  <Typography fontWeight="bold">Дії</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      {loading ? 'Завантаження...' : 'Шаблонів не знайдено'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                templates.map((template) => (
                  <TableRow 
                    key={template.id}
                    hover
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                    onClick={() => handleViewTemplate(template)}
                  >
                    <TableCell>
                      <Box>
                        <Typography fontWeight="medium">
                          {template.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip
                            size="small"
                            label={template.isPrivate ? 'Приватний' : 'Публічний'}
                            color={template.isPrivate ? 'default' : 'success'}
                            variant="outlined"
                          />
                          {template.originalFileName && (
                            <Typography variant="caption" color="text.secondary">
                              {template.originalFileName}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={template.type}
                        color={getTypeColor(template.type)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {template.authorName || template.author?.email || 'Невідомо'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={formatDate(template.createdAt)}>
                        <Typography variant="body2">
                          {formatDate(template.createdAt)}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatFileSize(template.fileSize || 0)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, template)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Пагинация */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalTemplates}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Рядків на сторінці:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} з ${count}`
          }
        />
      </Paper>
      
      {/* Меню действий */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleViewTemplate(selectedTemplate)}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>Перегляд</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleEditTemplate(selectedTemplate)}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Редагувати</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDuplicateTemplate(selectedTemplate)}>
          <ListItemIcon>
            <FileCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Дублювати</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDownloadTemplate(selectedTemplate)}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Завантажити</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => handleDeleteTemplate(selectedTemplate)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Видалити</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Подсказки */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Натисніть на рядок для перегляду шаблону або використовуйте меню дій для інших операцій
        </Typography>
      </Box>
    </Container>
  );
};

export default TemplateList;