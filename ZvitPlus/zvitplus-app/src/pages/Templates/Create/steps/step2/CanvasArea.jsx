import React, { useCallback } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CanvasElement from './CanvasElement';

const CanvasArea = ({
  canvasRef,
  getCanvasStyle,
  handleCanvasDrop,
  handleCanvasDragOver,
  handleClearSelection,
  hasSelectedElement,
  templateData,
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onRemoveElement
}) => {
  
  // Обработчик клика по канвасу
  const handleCanvasClick = useCallback((e) => {
    // Проверяем, был ли клик именно по канвасу (не по элементу)
    if (e.target === canvasRef.current) {
      handleClearSelection();
    }
  }, [handleClearSelection, canvasRef]);

  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Заголовок и кнопка отмены выбора */}
      <CanvasHeader
        templateData={templateData}
        handleClearSelection={handleClearSelection}
        hasSelectedElement={hasSelectedElement}
      />
      
      {/* Основное полотно */}
      <Canvas
        canvasRef={canvasRef}
        getCanvasStyle={getCanvasStyle}
        handleCanvasDrop={handleCanvasDrop}
        handleCanvasDragOver={handleCanvasDragOver}
        handleCanvasClick={handleCanvasClick}
        elements={elements}
        selectedElementId={selectedElementId}
        onSelectElement={onSelectElement}
        onUpdateElement={onUpdateElement}
        onRemoveElement={onRemoveElement}
      />
      
      {/* Подсказки */}
      <CanvasHint />
    </Paper>
  );
};

// Подкомпонент: Заголовок канваса
const CanvasHeader = ({ templateData, handleClearSelection, hasSelectedElement }) => (
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
);

// Подкомпонент: Основное полотно
const Canvas = ({
  canvasRef,
  getCanvasStyle,
  handleCanvasDrop,
  handleCanvasDragOver,
  handleCanvasClick,
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onRemoveElement
}) => (
  <Box
    ref={canvasRef}
    sx={getCanvasStyle()}
    onDrop={handleCanvasDrop}
    onDragOver={handleCanvasDragOver}
    onClick={handleCanvasClick}
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
    
    {elements.length === 0 && <EmptyCanvasMessage />}
  </Box>
);

// Подкомпонент: Сообщение для пустого канваса
const EmptyCanvasMessage = () => (
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
);

// Подкомпонент: Подсказки
const CanvasHint = () => (
  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
    <Typography variant="caption" color="text.secondary">
      Перетягніть елементи на полотно • Натисніть для вибору • Тягніть за край для зміни розміру
    </Typography>
  </Box>
);

export default CanvasArea;