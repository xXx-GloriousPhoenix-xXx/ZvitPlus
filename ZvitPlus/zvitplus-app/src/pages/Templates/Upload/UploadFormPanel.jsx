import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Alert,
  LinearProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button
} from '@mui/material';
import { CloudUpload, Lock, Public } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import FileDropzone from './FileDropzone';
import FileInfoCard from './FileInfoCard';

const UploadFormPanel = ({
  selectedFile,
  templateName,
  templateDescription,
  templateType,
  isPrivate,
  uploadProgress,
  isUploading,
  isAnalyzing,
  uploadError,
  uploadSuccess,
  templateTypes,
  authorId,
  onFileSelect,
  onRemoveFile,
  setTemplateName,
  setTemplateDescription,
  setTemplateType,
  setIsPrivate,
  setUploadError,
  setUploadSuccess,
  handleUpload,
  formatFileSize
}) => {
  const maxFileSize = 50 * 1024 * 1024; // 50MB
  const allowedFormats = ['.rep', '.zip', 'application/zip'];

  return (
    <Paper sx={{ p: 3 }}> {/* Убрали height: '100%' */}
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Завантаження файлу .rep
      </Typography>

      {/* Область drag-and-drop или информация о файле */}
      {!selectedFile ? (
        <Box sx={{ mb: 3 }}>
          <FileDropzone
            onFileSelect={onFileSelect}
            maxFileSize={maxFileSize}
            allowedFormats={allowedFormats}
            isAnalyzing={isAnalyzing}
          />
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <FileInfoCard
            file={selectedFile}
            onRemove={onRemoveFile}
            isUploading={isUploading}
            isAnalyzing={isAnalyzing}
            formatFileSize={formatFileSize}
          />
        </Box>
      )}

      {/* Поля для информации о шаблоне */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Назва шаблону"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          required
          error={!templateName.trim()}
          helperText={!templateName.trim() ? "Назва обов'язкова" : 'Ви можете редагувати назву'}
          disabled={isUploading || isAnalyzing}
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Тип шаблону *</InputLabel>
          <Select
            value={templateType}
            label="Тип шаблону *"
            onChange={(e) => setTemplateType(e.target.value)}
            disabled={isUploading || isAnalyzing}
            error={templateType === 'Unset'}
          >
            {templateTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          {templateType === 'Unset' && (
            <Typography variant="caption" color="error" sx={{ ml: 2 }}>
              Оберіть тип шаблону
            </Typography>
          )}
        </FormControl>

        {/* Переключатель приватности */}
        <FormControlLabel
          control={
            <Switch
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              disabled={isUploading || isAnalyzing}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isPrivate ? (
                <>
                  <Lock sx={{ mr: 1, fontSize: 16 }} />
                  Приватний шаблон
                </>
              ) : (
                <>
                  <Public sx={{ mr: 1, fontSize: 16 }} />
                  Публічний шаблон
                </>
              )}
            </Box>
          }
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Опис шаблону (необов'язково)"
          value={templateDescription}
          onChange={(e) => setTemplateDescription(e.target.value)}
          multiline
          rows={3}
          placeholder="Додайте опис для кращого розуміння призначення шаблону..."
          disabled={isUploading || isAnalyzing}
          helperText="Це поле може не зберігатися на сервері"
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
          disabled={!selectedFile || !templateName.trim() || templateType === 'Unset' || !authorId || isUploading || isAnalyzing}
          sx={{ flexGrow: 1 }}
        >
          {isUploading ? 'Завантаження...' : 'Завантажити шаблон'}
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadFormPanel;