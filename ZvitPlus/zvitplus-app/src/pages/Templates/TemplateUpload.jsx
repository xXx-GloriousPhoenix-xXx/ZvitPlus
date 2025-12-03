import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  LinearProgress,
  IconButton,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowBack,
  CloudUpload,
  InsertDriveFile,
  Delete,
  CheckCircle,
  Error,
  UploadFile,
  Description,
  PictureAsPdf,
  TableChart,
  Slideshow,
  ExpandMore,
  ExpandLess,
  Code,
  Folder,
  Image,
  DataObject,
  Info
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

const TemplateUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [templateInfo, setTemplateInfo] = useState(null);
  const [templateStructure, setTemplateStructure] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [autoName, setAutoName] = useState(true);

  // Разрешенные форматы файлов
  const allowedFormats = ['.rep', '.zip'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  // Настройка drag-and-drop
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        setUploadError(`Файл занадто великий. Максимальний розмір: ${maxFileSize / 1024 / 1024}MB`);
      } else if (error.code === 'file-invalid-type') {
        setUploadError(`Непідтримуваний формат. Дозволені формати: ${allowedFormats.join(', ')}`);
      } else {
        setUploadError('Помилка завантаження файлу');
      }
      return;
    }

    const file = acceptedFiles[0];
    setSelectedFile(file);
    setUploadError('');
    setIsAnalyzing(true);

    try {
      // Анализ .rep файла
      await analyzeRepFile(file);
    } catch (error) {
      console.error('Error analyzing file:', error);
      setUploadError('Не вдалося проаналізувати файл. Перевірте формат.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.rep', '.zip'],
      'application/x-zip-compressed': ['.rep', '.zip']
    },
    maxSize: maxFileSize,
    multiple: false
  });

  // Анализ .rep файла
  const analyzeRepFile = async (file) => {
    const zip = new JSZip();
    const content = await zip.loadAsync(file);
    
    // Проверка обязательных файлов
    const hasTemplateJson = content.files['template.json'];
    if (!hasTemplateJson) {
      throw new Error('Файл template.json не знайдено у архіві');
    }

    // Чтение template.json
    const templateJson = await content.file('template.json').async('string');
    const templateData = JSON.parse(templateJson);
    
    // Сбор информации о шаблоне
    const info = {
      name: templateData.templateName || file.name.replace(/\.[^/.]+$/, ""),
      type: templateData.templateType || 'Unknown',
      pageSize: templateData.pageSize || 'A4',
      orientation: templateData.orientation || 'portrait',
      elementsCount: templateData.elements?.length || 0,
      created: templateData.createdDate || new Date().toISOString(),
      author: templateData.author || 'Unknown'
    };

    // Анализ структуры
    const structure = {
      textElements: templateData.elements?.filter(el => el.type === 'text').length || 0,
      imageElements: templateData.elements?.filter(el => el.type === 'image').length || 0,
      tableElements: templateData.elements?.filter(el => el.type === 'table').length || 0,
      chartElements: templateData.elements?.filter(el => el.type === 'chart').length || 0,
      mediaFiles: Object.keys(content.files).filter(key => key.startsWith('media/') && !content.files[key].dir).length,
      dataFiles: Object.keys(content.files).filter(key => key.startsWith('data/') && !content.files[key].dir).length
    };

    // Чтение metadata.json если есть
    let metadata = {};
    if (content.files['metadata.json']) {
      try {
        const metadataJson = await content.file('metadata.json').async('string');
        metadata = JSON.parse(metadataJson);
      } catch (e) {
        console.warn('Cannot read metadata.json:', e);
      }
    }

    setTemplateInfo({ ...info, ...metadata });
    setTemplateStructure(structure);
    
    if (autoName) {
      setTemplateName(info.name);
    }
  };

  // Переключение раскрытия секций
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Получение иконки типа элемента
  const getElementIcon = (type) => {
    switch (type) {
      case 'text': return <Description color="primary" />;
      case 'image': return <Image color="secondary" />;
      case 'table': return <TableChart color="success" />;
      case 'chart': return <Slideshow color="warning" />;
      default: return <Code />;
    }
  };

  // Форматирование размера файла
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Удаление файла
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setTemplateInfo(null);
    setTemplateStructure(null);
    setTemplateName('');
  };

  // Обработчик загрузки файла
  const handleUpload = async () => {
    if (!templateName.trim()) {
      setUploadError('Введіть назву шаблону');
      return;
    }

    if (!selectedFile) {
      setUploadError('Виберіть файл шаблону');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');
    setUploadSuccess('');

    try {
      // Создаем FormData для отправки
      const formData = new FormData();
      formData.append('templateFile', selectedFile);
      formData.append('name', templateName);
      formData.append('description', templateDescription);
      formData.append('type', templateInfo?.type || 'Custom');
      formData.append('metadata', JSON.stringify(templateInfo));

      // Симуляция загрузки
      const simulateUpload = () => {
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsUploading(false);
              setUploadSuccess('Шаблон успішно завантажено!');
              
              setTimeout(() => {
                navigate('/templates');
              }, 2000);
              
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      };

      simulateUpload();

      // Реальный запрос:
      /*
      const response = await fetch('/api/templates/upload-rep', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Помилка завантаження');
      }

      const result = await response.json();
      setUploadSuccess(result.message);
      */

    } catch (error) {
      setUploadError(error.message || 'Помилка завантаження');
      setIsUploading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Заголовок */}
      <Box sx={{ mb: 4 }}>
        <Button
          component={RouterLink}
          to="/create-report"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Назад до вибору методу
        </Button>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Завантаження шаблону .rep
        </Typography>
        <Typography color="text.secondary">
          Завантажте шаблон у форматі .rep (ZIP архів зі структурою)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Левая колонка - информация и структура */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Інформація про шаблон
            </Typography>

            {templateInfo ? (
              <>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      Основна інформація
                    </Typography>
                    <Box sx={{ '& > *': { mb: 0.5 } }}>
                      <Typography variant="body2">
                        <strong>Назва:</strong> {templateInfo.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Тип:</strong> {templateInfo.type}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Формат сторінки:</strong> {templateInfo.pageSize} ({templateInfo.orientation})
                      </Typography>
                      {templateInfo.author && (
                        <Typography variant="body2">
                          <strong>Автор:</strong> {templateInfo.author}
                        </Typography>
                      )}
                      {templateInfo.version && (
                        <Typography variant="body2">
                          <strong>Версія:</strong> {templateInfo.version}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleSection('structure')}
                    >
                      <Typography variant="subtitle2" color="primary">
                        Структура шаблону
                      </Typography>
                      {expandedSections.structure ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                    
                    <Collapse in={expandedSections.structure}>
                      <Box sx={{ mt: 2, '& > *': { mb: 0.5 } }}>
                        <Typography variant="body2">
                          <Description fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Текстові елементи: <strong>{templateStructure.textElements}</strong>
                        </Typography>
                        <Typography variant="body2">
                          <Image fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Зображення: <strong>{templateStructure.imageElements}</strong>
                        </Typography>
                        <Typography variant="body2">
                          <TableChart fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Таблиці: <strong>{templateStructure.tableElements}</strong>
                        </Typography>
                        <Typography variant="body2">
                          <Slideshow fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Діаграми: <strong>{templateStructure.chartElements}</strong>
                        </Typography>
                        <Typography variant="body2">
                          <Folder fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Файли медіа: <strong>{templateStructure.mediaFiles}</strong>
                        </Typography>
                        <Typography variant="body2">
                          <DataObject fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Файли даних: <strong>{templateStructure.dataFiles}</strong>
                        </Typography>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Info />}
                  onClick={() => setPreviewOpen(true)}
                  sx={{ mb: 2 }}
                >
                  Переглянути структуру
                </Button>
              </>
            ) : (
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <InsertDriveFile sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography color="text.secondary">
                    Завантажте файл для перегляду інформації
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Информация о формате .rep */}
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Формат .rep:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ZIP архів зі структурою:
              </Typography>
              <Box sx={{ mt: 1, pl: 2 }}>
                <Typography variant="caption" display="block">
                  • template.json - структура
                </Typography>
                <Typography variant="caption" display="block">
                  • media/ - зображення
                </Typography>
                <Typography variant="caption" display="block">
                  • data/ - дані для діаграм
                </Typography>
                <Typography variant="caption" display="block">
                  • metadata.json - метадані
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Правая колонка - загрузка файлов */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Завантаження файлу .rep
            </Typography>

            {/* Область drag-and-drop */}
            {!selectedFile ? (
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 6,
                  textAlign: 'center',
                  mb: 3,
                  cursor: 'pointer',
                  bgcolor: isDragActive ? 'action.hover' : 'transparent',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Відпустіть файл тут' : 'Перетягніть файл .rep сюди'}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  або натисніть для вибору
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Підтримуються файли .rep (ZIP архіви) до {formatFileSize(maxFileSize)}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mb: 3 }}>
                <Card variant="outlined">
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <InsertDriveFile sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {selectedFile.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatFileSize(selectedFile.size)} • {selectedFile.type || 'application/zip'}
                        </Typography>
                        {isAnalyzing && (
                          <Typography variant="caption" color="info.main">
                            Аналіз файлу...
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <IconButton 
                      onClick={handleRemoveFile} 
                      color="error"
                      disabled={isUploading || isAnalyzing}
                    >
                      <Delete />
                    </IconButton>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Поля для информации о шаблоне */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Назва шаблону"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  required
                  error={!templateName.trim()}
                  helperText={!templateName.trim() ? "Назва обов'язкова" : ''}
                  disabled={isUploading || isAnalyzing}
                />
                <ToggleButtonGroup
                  value={autoName}
                  exclusive
                  onChange={(e, value) => setAutoName(value)}
                  size="small"
                  sx={{ ml: 2 }}
                  disabled={isUploading || isAnalyzing}
                >
                  <ToggleButton value={true}>
                    Авто
                  </ToggleButton>
                  <ToggleButton value={false}>
                    Вручну
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              
              <TextField
                fullWidth
                label="Опис шаблону (необов'язково)"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                multiline
                rows={3}
                placeholder="Додайте опис для кращого розуміння призначення шаблону..."
                disabled={isUploading || isAnalyzing}
              />
            </Box>

            {/* Сообщения об ошибках/успехе */}
            {uploadError && (
              <Alert 
                severity="error" 
                sx={{ mt: 3 }}
                onClose={() => setUploadError('')}
              >
                {uploadError}
              </Alert>
            )}

            {uploadSuccess && (
              <Alert 
                severity="success" 
                sx={{ mt: 3 }}
                onClose={() => setUploadSuccess('')}
              >
                {uploadSuccess}
              </Alert>
            )}

            {/* Прогресс загрузки */}
            {isUploading && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Завантаження... {uploadProgress}%
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            {/* Кнопки действий */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/create-report"
                disabled={isUploading || isAnalyzing}
              >
                Скасувати
              </Button>
              <Button
                variant="contained"
                startIcon={<CloudUpload />}
                onClick={handleUpload}
                disabled={!selectedFile || !templateName.trim() || isUploading || isAnalyzing}
                sx={{ flexGrow: 1 }}
              >
                {isUploading ? 'Завантаження...' : 'Завантажити шаблон'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Диалог предпросмотра структуры */}
      <Dialog 
        open={previewOpen} 
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Структура шаблону
        </DialogTitle>
        <DialogContent>
          {templateInfo && (
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
              <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
                {JSON.stringify(templateInfo, null, 2)}
              </pre>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>
            Закрити
          </Button>
        </DialogActions>
      </Dialog>

      {/* Дополнительная информация */}
      <Paper sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Формат .rep:</strong> Це ZIP архів, що містить структуру шаблону у форматі JSON, 
          медіафайли та дані для діаграм. Такий формат дозволяє легко експортувати та імпортувати 
          складні шаблони з повною структурою.
        </Typography>
      </Paper>
    </Container>
  );
};

export default TemplateUpload;