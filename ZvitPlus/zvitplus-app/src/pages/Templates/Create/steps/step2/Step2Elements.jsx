import React, { useRef } from 'react';
import { Box, Typography, Grid, Divider, Paper } from '@mui/material';

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
        </Grid>
        
        {/* Полотно для редактирования */}
        <Grid item xs={12} md={10}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2Elements;