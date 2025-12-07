import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Save,
  UploadFile
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { steps } from './constants';

const StepperNavigation = ({ 
  activeStep, 
  onBack, 
  onNext, 
  onSave, 
  loading, 
  templateData,
  elements,
  steps = []
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Button
            onClick={onBack}
            disabled={activeStep === 0 || loading}
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            Назад
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={onSave}
              disabled={loading || !templateData.name}
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
              sx={{ minWidth: 180 }}
            >
              {loading ? 'Збереження...' : 'Зберегти шаблон'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={onNext}
              endIcon={<ArrowBack sx={{ transform: 'rotate(180deg)' }} />}
              sx={{ minWidth: 120 }}
            >
              Далі
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Крок {activeStep + 1} з {steps.length}
        </Typography>
      </Box>

      {activeStep === steps.length - 1 && !loading && (
        <Paper sx={{ p: 3, mt: 4, borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Додаткові опції
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<UploadFile />}
                component={RouterLink}
                to="/templates/upload"
                size="large"
              >
                Завантажити .rep файл
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Save />}
                onClick={() => {
                  const dataStr = JSON.stringify({
                    templateName: templateData.name,
                    templateType: templateData.type,
                    pageSize: templateData.pageSize,
                    orientation: templateData.orientation,
                    elements: elements
                  }, null, 2);
                  
                  const dataBlob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${templateData.name || 'template'}.json`;
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                  URL.revokeObjectURL(url);
                }}
                disabled={!templateData.name || elements.length === 0}
                size="large"
              >
                Експорт JSON
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default StepperNavigation;