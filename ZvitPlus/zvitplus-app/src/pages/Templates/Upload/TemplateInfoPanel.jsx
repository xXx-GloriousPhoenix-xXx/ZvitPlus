import React from 'react';
import { Paper, Typography, Card, CardContent, Box, Divider, Button } from '@mui/material';
import { Info, Person, InsertDriveFile } from '@mui/icons-material';
import TemplateStructure from './TemplateStructure';

const TemplateInfoPanel = ({ 
  templateInfo, 
  templateStructure, 
  currentUser, 
  onPreviewOpen 
}) => {
  return (
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
                {templateInfo.author && templateInfo.author !== 'Unknown' && (
                  <Typography variant="body2">
                    <strong>Автор файлу:</strong> {templateInfo.author}
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

          <TemplateStructure structure={templateStructure} />

          {/* Информация о текущем пользователе */}
          <Card variant="outlined" sx={{ mb: 2, mt: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom color="primary">
                Автор завантаження
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {currentUser?.login || 'Користувач'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {currentUser?.email || 'Не авторизовано'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Info />}
            onClick={onPreviewOpen}
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

      {/* Информация о формате .rep - теперь просто статическая информация */}
      <Box>
        <Typography 
          variant="subtitle2" 
          gutterBottom 
          fontWeight="bold"
        >
          Формат .rep
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
            • data/ - дані для діаграм, таблиць
          </Typography>
          <Typography variant="caption" display="block">
            • metadata.json - метадані
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TemplateInfoPanel;