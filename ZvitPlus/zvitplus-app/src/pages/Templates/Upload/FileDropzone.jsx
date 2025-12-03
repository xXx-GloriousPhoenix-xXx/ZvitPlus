import React from 'react';
import { Box, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ onFileSelect, maxFileSize, allowedFormats, isAnalyzing }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    accept: {
      'application/zip': ['.rep', '.zip'],
      'application/x-zip-compressed': ['.rep', '.zip']
    },
    maxSize: maxFileSize,
    multiple: false,
    disabled: isAnalyzing
  });

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        borderRadius: 2,
        p: 6,
        textAlign: 'center',
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
  );
};

export default FileDropzone;