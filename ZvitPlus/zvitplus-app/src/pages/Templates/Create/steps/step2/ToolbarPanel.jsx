import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Paper
} from '@mui/material';
import { Delete, Download } from '@mui/icons-material';
import { elementTypes } from '../../constants';
import ElementEditor from '../ElementEditor';
import { getElementIcon } from './elementUtils';

const ToolbarPanel = ({
  onDragStart,
  selectedElement,
  onUpdateElement,
  handleClearSelection,
  onClearAll,
  totalElements,
  handleDownloadTemplate,
  handleRemoveSelectedElement,
  hasSelectedElement,
  selectedElementType
}) => {
  return (
    <Paper sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Інструменти
      </Typography>
      
      {/* Список элементов для перетаскивания */}
      <ElementsList onDragStart={onDragStart} />
      
      <Divider sx={{ my: 2 }} />
      
      {/* Редактор элемента */}
      <ElementEditorSection
        selectedElement={selectedElement}
        onUpdateElement={onUpdateElement}
        handleClearSelection={handleClearSelection}
      />
      
      <Divider sx={{ my: 2 }} />
      
      {/* Панель управления */}
      <ControlPanel
        onClearAll={onClearAll}
        totalElements={totalElements}
        handleDownloadTemplate={handleDownloadTemplate}
        handleRemoveSelectedElement={handleRemoveSelectedElement}
        hasSelectedElement={hasSelectedElement}
      />
      
      <Divider sx={{ my: 2 }} />
      
      {/* Статистика */}
      <StatisticsSection
        totalElements={totalElements}
        hasSelectedElement={hasSelectedElement}
        selectedElementType={selectedElementType}
      />
    </Paper>
  );
};

// Подкомпонент: Список элементов
const ElementsList = ({ onDragStart }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
      Перетягніть на полотно:
    </Typography>
    <Grid container spacing={1}>
      {elementTypes.map((elementType) => (
        <Grid item xs={6} md={12} key={elementType.type}>
          <Card
            variant="outlined"
            draggable
            onDragStart={onDragStart(elementType.type)}
            sx={{
              cursor: 'grab',
              mb: 1,
              '&:hover': {
                bgcolor: `${elementType.color}.light`,
                borderColor: `${elementType.color}.main`
              }
            }}
          >
            <CardContent sx={{ p: 1.5, textAlign: 'center' }}>
              <Box sx={{ color: `${elementType.color}.main`, mb: 0.5 }}>
                {getElementIcon(elementType.type)}
              </Box>
              <Typography variant="caption" fontWeight="medium">
                {elementType.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

// Подкомпонент: Секция редактора элемента
const ElementEditorSection = ({ 
  selectedElement, 
  onUpdateElement, 
  handleClearSelection 
}) => (
  <Box sx={{ mb: 3 }}>
    <ElementEditor
      selectedElement={selectedElement}
      onUpdate={onUpdateElement}
      onClose={handleClearSelection}
    />
  </Box>
);

// Подкомпонент: Панель управления
const ControlPanel = ({
  onClearAll,
  totalElements,
  handleDownloadTemplate,
  handleRemoveSelectedElement,
  hasSelectedElement
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
      Керування:
    </Typography>

    <Grid container spacing={1} sx={{ mb: 1 }}>
      <Grid item xs={4}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<Delete />}
          onClick={onClearAll}
          disabled={totalElements === 0}
          sx={{ 
            height: '32px',
            fontSize: '0.75rem'
          }}
        >
          Очистити
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<Download />}
          onClick={handleDownloadTemplate}
          disabled={totalElements === 0}
          sx={{ 
            height: '32px',
            fontSize: '0.75rem'
          }}
        >
          Експорт
        </Button>
      </Grid>
      <Grid item xs={4}>
        {hasSelectedElement && (
          <Button
            fullWidth
            variant="outlined"
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={handleRemoveSelectedElement}
            sx={{ 
              height: '32px',
              fontSize: '0.75rem'
            }}
          >
            Видалити
          </Button>
        )}
      </Grid>
    </Grid>

    {!hasSelectedElement && (
      <EmptySelectionPlaceholder />
    )}
  </Box>
);

// Подкомпонент: Заполнитель для пустого выбора
const EmptySelectionPlaceholder = () => (
  <Box sx={{ 
    height: '32px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    border: '1px dashed',
    borderColor: 'divider',
    borderRadius: '4px'
  }}>
    <Typography variant="caption" color="text.secondary">
      Виберіть елемент для видалення
    </Typography>
  </Box>
);

// Подкомпонент: Секция статистики
const StatisticsSection = ({ 
  totalElements, 
  hasSelectedElement, 
  selectedElementType 
}) => (
  <Box>
    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
      Статистика:
    </Typography>
    <Typography variant="body2">
      Елементів: <strong>{totalElements}</strong>
    </Typography>
    {hasSelectedElement && (
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
        Вибрано: {elementTypes.find(t => t.type === selectedElementType)?.label}
      </Typography>
    )}
  </Box>
);

export default ToolbarPanel;