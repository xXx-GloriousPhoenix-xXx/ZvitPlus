import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Grid,
  Button,
  Divider,
  IconButton,
  ColorPicker,
  Switch,
  FormControlLabel,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  AddPhotoAlternate,
  Delete,
  Save,
  Cancel
} from '@mui/icons-material';
import { fontSizes, fontFamilies, alignments, chartTypes } from '../../constants';

const ElementEditor = ({ selectedElement, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  if (!selectedElement) {
    return (
      <Paper sx={{ 
        p: 2, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <Box sx={{ 
            p: 3,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'action.hover'
          }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              <Box component="span" sx={{ display: 'block', mb: 1 }}>
                📝
              </Box>
              Редактор елементів
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Оберіть будь-який елемент на полотні
              <br />
              для початку редагування
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  const handleChange = (field, value) => {
    onUpdate(selectedElement.id, { [field]: value });
  };

  const handleStyleChange = (field, value) => {
    onUpdate(selectedElement.id, {
      style: { ...selectedElement.style, [field]: value }
    });
  };

  const renderTextEditor = () => (
    <Box>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Текст
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        value={selectedElement.text || ''}
        onChange={(e) => handleChange('text', e.target.value)}
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
        Шрифт
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Розмір</InputLabel>
            <Select
              value={selectedElement.fontSize || 12}
              label="Розмір"
              onChange={(e) => handleChange('fontSize', e.target.value)}
            >
              {fontSizes.map(size => (
                <MenuItem key={size} value={size}>{size}px</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Шрифт</InputLabel>
            <Select
              value={selectedElement.fontFamily || 'Arial'}
              label="Шрифт"
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            >
              {fontFamilies.map(font => (
                <MenuItem key={font} value={font}>{font}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Стиль тексту
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <IconButton
              size="small"
              color={selectedElement.fontWeight === 'bold' ? 'primary' : 'default'}
              onClick={() => handleChange('fontWeight', selectedElement.fontWeight === 'bold' ? 'normal' : 'bold')}
            >
              <FormatBold />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              color={selectedElement.fontStyle === 'italic' ? 'primary' : 'default'}
              onClick={() => handleChange('fontStyle', selectedElement.fontStyle === 'italic' ? 'normal' : 'italic')}
            >
              <FormatItalic />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              color={selectedElement.textDecoration === 'underline' ? 'primary' : 'default'}
              onClick={() => handleChange('textDecoration', selectedElement.textDecoration === 'underline' ? 'none' : 'underline')}
            >
              <FormatUnderlined />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Вирівнювання
        </Typography>
        <Grid container spacing={1}>
          {alignments.map((align) => (
            <Grid item key={align}>
              <IconButton
                size="small"
                color={selectedElement.alignment === align ? 'primary' : 'default'}
                onClick={() => handleChange('alignment', align)}
              >
                {align === 'left' && <FormatAlignLeft />}
                {align === 'center' && <FormatAlignCenter />}
                {align === 'right' && <FormatAlignRight />}
                {align === 'justify' && <FormatAlignJustify />}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );

  const renderImageEditor = () => (
    <Box sx={{display: 'flex', flexDirection: "column"}}>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Зображення
      </Typography>
      
      <TextField
        label="URL зображення"
        value={selectedElement.src || ''}
        onChange={(e) => handleChange('src', e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="Альтернативний текст"
        value={selectedElement.alt || ''}
        onChange={(e) => handleChange('alt', e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Прозорість
        </Typography>
        <Slider
        fullWidth
          value={selectedElement.opacity || 1}
          onChange={(e, value) => handleChange('opacity', value)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );

  const renderTableEditor = () => (
    <Box>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Таблиця
      </Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={selectedElement.header || false}
            onChange={(e) => handleChange('header', e.target.checked)}
          />
        }
        label="Показувати заголовок"
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Кількість колонок
        </Typography>
        <Slider
          value={selectedElement.columns?.length || 3}
          onChange={(e, value) => {
            const newColumns = Array(value).fill(0).map((_, i) => 
              selectedElement.columns?.[i] || `Колонка ${i + 1}`
            );
            handleChange('columns', newColumns);
          }}
          min={1}
          max={10}
          valueLabelDisplay="auto"
        />
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Кількість рядків
        </Typography>
        <Slider
          value={selectedElement.rows?.length || 2}
          onChange={(e, value) => {
            const newRows = Array(value).fill(0).map((_, i) => 
              selectedElement.rows?.[i] || Array(selectedElement.columns?.length || 3).fill('')
            );
            handleChange('rows', newRows);
          }}
          min={1}
          max={20}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );

  const renderChartEditor = () => (
    <Box sx={{display: 'flex', flexDirection: "column"}}>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Діаграма
      </Typography>
      
      <FormControl size="small" sx={{ mb: 2 }}>
        <InputLabel>Тип діаграми</InputLabel>
        <Select
          value={selectedElement.chartType || 'bar'}
          label="Тип діаграми"
          onChange={(e) => handleChange('chartType', e.target.value)}
        >
          {chartTypes.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField
        label="Заголовок"
        value={selectedElement.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <FormControlLabel
        control={
          <Switch
            checked={selectedElement.showLegend !== false}
            onChange={(e) => handleChange('showLegend', e.target.checked)}
          />
        }
        label="Показувати легенду"
        sx={{ mb: 1 }}
      />
      
      <FormControlLabel
        control={
          <Switch
            checked={selectedElement.showLabels !== false}
            onChange={(e) => handleChange('showLabels', e.target.checked)}
          />
        }
        label="Показувати підписи"
      />
    </Box>
  );

  const renderCommonProperties = () => (
    <Box>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Розмір та позиція
      </Typography>
      <Grid container spacing={2} sx={{display: 'flex', flexDirection: "column"}}>
        <Grid item xs={6}>
          <TextField
            label="Ширина"
            type="number"
            value={selectedElement.size?.width || 0}
            onChange={(e) => handleChange('size', {
              ...selectedElement.size,
              width: parseInt(e.target.value)
            })}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Висота"
            type="number"
            value={selectedElement.size?.height || 0}
            onChange={(e) => handleChange('size', {
              ...selectedElement.size,
              height: parseInt(e.target.value)
            })}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="X"
            type="number"
            value={selectedElement.position?.x || 0}
            onChange={(e) => handleChange('position', {
              ...selectedElement.position,
              x: parseInt(e.target.value)
            })}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Y"
            type="number"
            value={selectedElement.position?.y || 0}
            onChange={(e) => handleChange('position', {
              ...selectedElement.position,
              y: parseInt(e.target.value)
            })}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return selectedElement.type === 'text' ? renderTextEditor() :
               selectedElement.type === 'image' ? renderImageEditor() :
               selectedElement.type === 'table' ? renderTableEditor() :
               selectedElement.type === 'chart' ? renderChartEditor() : null;
      case 1:
        return renderCommonProperties();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      height: '100%',
      bgcolor: 'background.paper',
      borderLeft: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Paper sx={{ 
        p: 2, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden' // Скрываем переполнение
      }}>
        {/* Заголовок */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          flexShrink: 0 // Не сжимается
        }}>
          <Typography variant="h6">
            Редагування елементу
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <Cancel />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ flexShrink: 0 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Властивості" />
            <Tab label="Розміщення" />
          </Tabs>
          <Divider sx={{ mb: 2 }} />
        </Box>

        {/* Контент с прокруткой */}
        <Box sx={{ 
          flex: 1, 
          pb: 2 
        }}>
          {renderTabContent()}
        </Box>
      </Paper>
    </Box>
  );
};

export default ElementEditor;