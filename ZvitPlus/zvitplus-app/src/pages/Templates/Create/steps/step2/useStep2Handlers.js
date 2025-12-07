import { useState, useCallback } from 'react';

export const useStep2Handlers = ({ 
  elements, 
  onAddElement, 
  onRemoveElement, 
  onClearAll,
  onUpdateElement,
  templateData,
  selectedElementId,
  onSelectElement 
}) => {
  const [draggedElementType, setDraggedElementType] = useState(null);

  const getCanvasStyle = useCallback(() => {
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
  }, [templateData.orientation]);

  const handleDragStart = useCallback((type) => (e) => {
    setDraggedElementType(type);
    e.dataTransfer.setData('elementType', type);
    e.dataTransfer.effectAllowed = 'copy';
    
    // Добавляем визуальный элемент для перетаскивания
    const dragImage = document.createElement('div');
    dragImage.style.opacity = '0';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  }, []);

  const handleCanvasDrop = useCallback((e, canvasRef) => {
    e.preventDefault();
    const type = draggedElementType || e.dataTransfer.getData('elementType');
    
    if (type && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      // Более точное позиционирование
      const x = Math.max(0, e.clientX - canvasRect.left - 50); // Центрируем по курсору
      const y = Math.max(0, e.clientY - canvasRect.top - 25);
      
      onAddElement(type, { x, y });
    }
    
    setDraggedElementType(null);
  }, [draggedElementType, onAddElement]);

  const handleCanvasDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleClearSelection = useCallback(() => {
    onSelectElement(null);
  }, [onSelectElement]);

  const handleDownloadTemplate = useCallback(() => {
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
  }, [templateData, elements]);

  const handleRemoveSelectedElement = useCallback(() => {
    if (selectedElementId) {
      onRemoveElement(selectedElementId);
      onSelectElement(null);
    }
  }, [selectedElementId, onRemoveElement, onSelectElement]);

  const getSelectedElement = useCallback(() => {
    return elements.find(el => el.id === selectedElementId);
  }, [elements, selectedElementId]);

  return {
    draggedElementType,
    getCanvasStyle,
    handleDragStart,
    handleCanvasDrop,
    handleCanvasDragOver,
    handleClearSelection,
    handleDownloadTemplate,
    handleRemoveSelectedElement,
    getSelectedElement,
    getElementStatistics: () => ({
      totalElements: elements.length,
      selectedElementType: getSelectedElement()?.type,
      hasSelectedElement: !!selectedElementId
    })
  };
};