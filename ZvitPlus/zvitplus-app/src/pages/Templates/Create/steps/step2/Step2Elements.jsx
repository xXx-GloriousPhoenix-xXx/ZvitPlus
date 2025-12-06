import React, { useRef } from 'react';
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
import {
  TextFields,
  Image,
  TableChart,
  BarChart,
  Delete,
  Download
} from '@mui/icons-material';
import { elementTypes } from '../../constants';
import CanvasElement from '../../CanvasElement';
import ElementEditor from '../../ElementEditor';
import { useStep2Handlers } from './useStep2Handlers';

const Step2Elements = ({ 
  elements, 
  onAddElement, 
  onRemoveElement, 
  onClearAll,
  onUpdateElement,
  templateData,
  selectedElementId,
  onSelectElement
}) => {
  const canvasRef = useRef(null);

  const {
    getCanvasStyle,
    handleDragStart,
    handleCanvasDrop,
    handleCanvasDragOver,
    handleClearSelection,
    handleDownloadTemplate,
    handleRemoveSelectedElement,
    getSelectedElement,
    getElementStatistics
  } = useStep2Handlers({
    elements,
    onAddElement,
    onRemoveElement,
    onClearAll,
    onUpdateElement,
    templateData,
    selectedElementId,
    onSelectElement
  });

  const { totalElements, selectedElementType, hasSelectedElement } = getElementStatistics();
  const selectedElement = getSelectedElement();

  const getElementIcon = (type) => {
    const icons = {
      'text': <TextFields />,
      'image': <Image />,
      'table': <TableChart />,
      'chart': <BarChart />
    };
    return icons[type] || null;
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
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
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
          </Paper>
        </Grid>
        
        {/* Полотно для редактирования */}
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Полотно ({templateData.pageSize}, {templateData.orientation === 'portrait' ? 'Книжна' : 'Альбомна'})
              </Typography>
              <Button
                size="small"
                onClick={handleClearSelection}
                disabled={!hasSelectedElement}
              >
                Скасувати вибір
              </Button>
            </Box>
            
            <Box
              ref={canvasRef}
              sx={getCanvasStyle()}
              onDrop={(e) => handleCanvasDrop(e, canvasRef)}
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