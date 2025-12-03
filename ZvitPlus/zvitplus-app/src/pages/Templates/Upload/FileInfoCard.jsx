import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { InsertDriveFile, Delete } from '@mui/icons-material';

const FileInfoCard = ({ file, onRemove, isUploading, isAnalyzing, formatFileSize }) => {
  return (
    <Card variant="outlined">
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InsertDriveFile sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {file.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatFileSize(file.size)} • {file.type || 'application/zip'}
            </Typography>
            {isAnalyzing && (
              <Typography variant="caption" color="info.main">
                Аналіз файлу...
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton 
          onClick={onRemove} 
          color="error"
          disabled={isUploading || isAnalyzing}
        >
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default FileInfoCard;