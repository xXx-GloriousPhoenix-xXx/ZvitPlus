import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import {
  TextFields,
  Image,
  TableChart,
  BarChart,
  Delete,
  Download
} from '@mui/icons-material';
import { elementTypes } from '../constants';
import CanvasElement from '../CanvasElement';
import ElementEditor from '../ElementEditor';

const Step2Elements = ({ 
  elements, 
  onAddElement, 
  onRemoveElement, 
  onClearAll,
  onUpdateElement,
  templateData,
  selectedElementId,  // Принимаем как пропс
  onSelectElement     // Принимаем как пропс
}) => {
  const [draggedElementType, setDraggedElementType] = useState(null);
  const canvasRef = useRef(null);

  const getElementIcon = (type) => {
    switch (type) {
      case 'text': return <TextFields />;
      case 'image': return <Image />;
      case 'table': return <TableChart />;
      case 'chart': return <BarChart />;
      default: return null;
    }
  };

  const handleDragStart = (type) => (e) => {
    setDraggedElementType(type);
    e.dataTransfer.setData('elementType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    const type = draggedElementType || e.dataTransfer.getData('elementType');
    
    if (type && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - 75;
      const y = e.clientY - canvasRect.top - 20;
      
      onAddElement(type, { x, y });
    }
    
    setDraggedElementType(null);
  };

  const handleCanvasDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleClearSelection = () => {
    onSelectElement(null);
  };

  const selectedElement = elements.find(el => el.id === selectedElementId);

  const getCanvasStyle = () => {
    const isPortrait = templateData.orientation === 'portrait';
    const baseWidth = 800;
    const baseHeight = isPortrait ? 1131 : 566; // A4 пропорции в пикселях
    
    return {
      width: baseWidth,
      height: baseHeight,
      backgroundColor: '#ffffff',
      border: '2px solid #ccc',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      margin: '0 auto'
    };
  };

  const handleDownloadTemplate = () => {
    const templateJson = {
      templateName: templateData.name,
      templateType: templateData.type,
      pageSize: templateData.pageSize,
      orientation: templateData.orientation,
      elements: elements
    };

    const dataStr = JSON.stringify(templateJson, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${templateData.name || 'template'}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Візуальний редактор шаблону
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Перетягніть елементи на полотно та налаштуйте їх
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Панель инструментов */}
        <Grid item xs={12} md={2}>
          <Paper sx={{ p: 2, height: '100%', overflow: 'auto' }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Інструменти
            </Typography>
            
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
                      onDragStart={handleDragStart(elementType.type)}
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
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <ElementEditor
                selectedElement={selectedElement}
                onUpdate={onUpdateElement}
                onClose={handleClearSelection}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Керування:
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<Delete />}
                onClick={onClearAll}
                disabled={elements.length === 0}
                sx={{ mb: 1 }}
              >
                Очистити все
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<Download />}
                onClick={handleDownloadTemplate}
                disabled={elements.length === 0}
                sx={{ mb: 1 }}
              >
                Експорт JSON
              </Button>
              
              {selectedElement && (
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => {
                    onRemoveElement(selectedElementId);
                    onSelectElement(null);
                  }}
                >
                  Видалити вибраний
                </Button>
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Статистика:
              </Typography>
              <Typography variant="body2">
                Елементів: <strong>{elements.length}</strong>
              </Typography>
              {selectedElement && (
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  Вибрано: {elementTypes.find(t => t.type === selectedElement.type)?.label}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Полотно для редактирования */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Полотно ({templateData.pageSize}, {templateData.orientation === 'portrait' ? 'Книжна' : 'Альбомна'})
              </Typography>
              <Button
                size="small"
                onClick={handleClearSelection}
                disabled={!selectedElement}
              >
                Скасувати вибір
              </Button>
            </Box>
            
            <Box
              ref={canvasRef}
              sx={getCanvasStyle()}
              onDrop={handleCanvasDrop}
              onDragOver={handleCanvasDragOver}
              onClick={handleClearSelection}
            >
              {elements.map((element) => (
                <CanvasElement
                  key={element.id}
                  element={element}
                  isSelected={element.id === selectedElementId}
                  onSelect={onSelectElement} 
                  onUpdate={onUpdateElement}
                  onRemove={onRemoveElement}
                  canvasRef={canvasRef}
                />
              ))}
              
              {elements.length === 0 && (
                <Box sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: 'text.secondary'
                }}>
                  <Typography variant="body1" gutterBottom>
                    Полотно порожнє
                  </Typography>
                  <Typography variant="body2">
                    Перетягніть елементи з панелі інструментів
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Перетягніть елементи на полотно • Натисніть для вибору • Тягніть за край для зміни розміру
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2Elements;