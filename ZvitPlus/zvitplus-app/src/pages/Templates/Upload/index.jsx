import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import TemplateInfoPanel from './TemplateInfoPanel';
import UploadFormPanel from './UploadFormPanel';
import { useTemplateUpload } from './useTemplateUpload';

const TemplateUpload = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const {
    selectedFile,
    templateInfo,
    templateStructure,
    uploadProgress,
    isUploading,
    isAnalyzing,
    uploadError,
    uploadSuccess,
    templateName,
    templateDescription,
    templateType,
    isPrivate,
    currentUser,
    authorId,
    templateTypes,
    setTemplateName,
    setTemplateDescription,
    setTemplateType,
    setIsPrivate,
    setUploadError,
    setUploadSuccess,
    handleFileSelect,
    handleRemoveFile,
    handleUpload,
    formatFileSize
  } = useTemplateUpload();

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

      {/* Flex контейнер вместо Grid */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        width: '100%'
      }}>
        {/* Левая колонка - информация и структура (33% на десктопе) */}
        <Box sx={{ 
          width: { xs: '100%', md: '33.33%' },
          flexShrink: 0
        }}>
          <TemplateInfoPanel
            templateInfo={templateInfo}
            templateStructure={templateStructure}
            currentUser={currentUser}
            onPreviewOpen={() => setPreviewOpen(true)}
          />
        </Box>
        
        {/* Правая колонка - загрузка файлов (66% на десктопе) */}
        <Box sx={{ 
          flex: 1,
          width: { xs: '100%', md: '66.66%' }
        }}>
          <UploadFormPanel
            selectedFile={selectedFile}
            templateName={templateName}
            templateDescription={templateDescription}
            templateType={templateType}
            isPrivate={isPrivate}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            isAnalyzing={isAnalyzing}
            uploadError={uploadError}
            uploadSuccess={uploadSuccess}
            templateTypes={templateTypes}
            authorId={authorId}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            setTemplateName={setTemplateName}
            setTemplateDescription={setTemplateDescription}
            setTemplateType={setTemplateType}
            setIsPrivate={setIsPrivate}
            setUploadError={setUploadError}
            setUploadSuccess={setUploadSuccess}
            handleUpload={handleUpload}
            formatFileSize={formatFileSize}
          />
        </Box>
      </Box>

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
          <strong>Примітка:</strong> Після завантаження шаблон буде доступний у вашому особистому кабінеті.
          {isPrivate ? ' Приватні шаблони доступні тільки вам.' : ' Публічні шаблони можуть бачити інші користувачі.'}
        </Typography>
      </Paper>
    </Container>
  );
};

export default TemplateUpload;