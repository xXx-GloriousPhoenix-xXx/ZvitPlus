import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import { 
  ArrowBack, 
  UploadFile, 
  Description, 
  LibraryAdd, 
  CreateNewFolder,
  CloudUpload,
  InsertDriveFile,
  FileCopy
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const CreateReport = () => {
  // Пример списка недавних шаблонов (можно заменить на данные из API)
  const recentTemplates = [
    { id: 1, name: 'Фінансовий звіт Q1', description: 'Щоквартальний фінансовий звіт', date: '2024-03-15' },
    { id: 2, name: 'Маркетинговий аналіз', description: 'Аналіз маркетингової діяльності', date: '2024-03-10' },
    { id: 3, name: 'Звіт по продажам', description: 'Щомісячний звіт про продажі', date: '2024-03-05' },
  ];

  const options = [
    {
      title: 'Обрати з існуючих',
      description: 'Виберіть з ваших шаблонів або спільних',
      icon: <Description color="primary" sx={{ fontSize: 40 }} />,
      to: '/templates',
      variant: 'outlined',
      color: 'primary'
    },
    {
      title: 'Завантажити шаблон',
      description: 'Завантажте готовий шаблон з вашого пристрою',
      icon: <UploadFile color="secondary" sx={{ fontSize: 40 }} />,
      to: '/templates/upload',
      variant: 'outlined',
      color: 'secondary'
    },
    {
      title: 'Створити новий',
      description: 'Створіть власний шаблон з нуля',
      icon: <CreateNewFolder color="success" sx={{ fontSize: 40 }} />,
      to: '/templates/create',
      variant: 'contained',
      color: 'success'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Заголовок и кнопка назад */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          component={RouterLink}
          to="/templates"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Назад
        </Button>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Створення нового звіту
          </Typography>
          <Typography color="text.secondary">
            Оберіть спосіб створення звіту
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Основные варианты создания */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Виберіть дію
            </Typography>
            <Typography color="text.secondary" paragraph>
              Створіть звіт на основі існуючого шаблону або створіть новий
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={3}>
              {options.map((option, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderWidth: 2,
                      borderColor: option.variant === 'contained' ? `${option.color}.main` : 'divider',
                      '&:hover': {
                        borderColor: `${option.color}.main`,
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Box sx={{ mb: 2 }}>
                        {option.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        {option.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        component={RouterLink}
                        to={option.to}
                        variant={option.variant}
                        color={option.color}
                        startIcon={
                          option.title === 'Обрати з існуючих' ? <FileCopy /> :
                          option.title === 'Завантажити шаблон' ? <CloudUpload /> :
                          <LibraryAdd />
                        }
                        size="large"
                      >
                        {option.title}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Недавние шаблоны (если они есть) */}
        {recentTemplates.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Нещодавні шаблони
              </Typography>
              <Typography color="text.secondary" paragraph>
                Швидкий доступ до ваших останніх шаблонів
              </Typography>
              
              <Grid container spacing={2}>
                {recentTemplates.map((template) => (
                  <Grid item xs={12} sm={6} md={4} key={template.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <InsertDriveFile color="action" sx={{ mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight="bold" noWrap>
                            {template.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {template.description}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          Останнє використання: {template.date}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/templates/${template.id}/create-report`}
                          startIcon={<Description />}
                        >
                          Використати
                        </Button>
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/templates/${template.id}`}
                        >
                          Переглянути
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* Быстрые действия */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Швидкі дії
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="outlined"
                startIcon={<FileCopy />}
                component={RouterLink}
                to="/templates/my"
                sx={{ flex: 1 }}
              >
                Мої шаблони
              </Button>
              <Button
                variant="outlined"
                startIcon={<Description />}
                component={RouterLink}
                to="/reports"
                sx={{ flex: 1 }}
              >
                Мої звіти
              </Button>
              <Button
                variant="outlined"
                startIcon={<LibraryAdd />}
                component={RouterLink}
                to="/templates/shared"
                sx={{ flex: 1 }}
              >
                Спільні шаблони
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Подсказка внизу */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Потрібна допомога?{' '}
          <Button component={RouterLink} to="/help/create-report" size="small">
            Переглянути інструкцію
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default CreateReport;