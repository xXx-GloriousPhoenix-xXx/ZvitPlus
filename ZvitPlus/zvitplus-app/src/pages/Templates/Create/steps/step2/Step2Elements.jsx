import React, { useRef, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';

import ToolbarPanel from './ToolbarPanel';
import CanvasArea from './CanvasArea';
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Удаление по клавише Delete или Backspace
      if ((e.key === 'Delete') && selectedElementId) {
        e.preventDefault(); // Предотвращаем стандартное поведение
        handleRemoveSelectedElement();
      }
      
      // Escape - отмена выбора
      if (e.key === 'Escape' && selectedElementId) {
        handleClearSelection();
      }
    };

    // Добавляем обработчик только если есть выбранный элемент
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElementId, handleRemoveSelectedElement, handleClearSelection]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Візуальний редактор шаблону
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Перетягніть елементи на полотно та налаштуйте їх
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          md: 'minmax(300px, 1fr) 2fr'
        },
        gap: 3,
        height: '100%'
      }}>
        <Box>
          <ToolbarPanel
            onDragStart={handleDragStart}
            selectedElement={selectedElement}
            onUpdateElement={onUpdateElement}
            handleClearSelection={handleClearSelection}
            onClearAll={onClearAll}
            totalElements={totalElements}
            handleDownloadTemplate={handleDownloadTemplate}
            handleRemoveSelectedElement={handleRemoveSelectedElement}
            hasSelectedElement={hasSelectedElement}
            selectedElementType={selectedElementType}
          />
        </Box>
        <Box>
          <CanvasArea
            canvasRef={canvasRef}
            getCanvasStyle={getCanvasStyle}
            handleCanvasDrop={(e) => handleCanvasDrop(e, canvasRef)}
            handleCanvasDragOver={handleCanvasDragOver}
            handleClearSelection={handleClearSelection}
            hasSelectedElement={hasSelectedElement}
            templateData={templateData}
            elements={elements}
            selectedElementId={selectedElementId}
            onSelectElement={onSelectElement}
            onUpdateElement={onUpdateElement}
            onRemoveElement={onRemoveElement}
          />
        </Box>
      </Box>
      
    </Box>
  );
};

export default Step2Elements;