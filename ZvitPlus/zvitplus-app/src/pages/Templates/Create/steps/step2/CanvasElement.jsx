import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton
} from '@mui/material';
import {
  DragIndicator,
  Delete
} from '@mui/icons-material';

// Выносим elementTypes в компонент или импортируем
const elementTypes = [
  { 
    type: 'text', 
    label: 'Текст', 
    color: 'primary'
  },
  { 
    type: 'image', 
    label: 'Зображення', 
    color: 'secondary'
  },
  { 
    type: 'table', 
    label: 'Таблиця', 
    color: 'info'
  },
  { 
    type: 'chart', 
    label: 'Діаграма', 
    color: 'success'
  }
];

const CanvasElement = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  scale = 1,
  canvasRef
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, elementX: 0, elementY: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const elementRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
    
    // Выбираем элемент при клике
    if (!isSelected) {
      onSelect(element.id);
    }
    
    if (e.target.classList.contains('resize-handle')) {
      // Начало изменения размера
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: element.size.width,
        height: element.size.height
      });
    } else {
      // Начало перетаскивания
      setIsDragging(true);
      
      // Получаем позицию канваса один раз
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        elementX: element.position.x,
        elementY: element.position.y,
        canvasLeft: canvasRect.left,
        canvasTop: canvasRect.top
      });
    }
  }, [element, isSelected, onSelect, canvasRef]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && dragStart.canvasLeft !== undefined) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      const newX = dragStart.elementX + deltaX;
      const newY = dragStart.elementY + deltaY;
      
      // Получаем текущие размеры канваса
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      
      const maxX = canvasRect.width - element.size.width;
      const maxY = canvasRect.height - element.size.height;
      
      onUpdate(element.id, {
        position: {
          x: Math.max(0, Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY))
        }
      });
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(50, resizeStart.width + deltaX);
      const newHeight = Math.max(20, resizeStart.height + deltaY);
      
      onUpdate(element.id, {
        size: { width: newWidth, height: newHeight }
      });
    }
  }, [isDragging, isResizing, dragStart, resizeStart, element, onUpdate, canvasRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const renderElementContent = () => {
    console.log('Rendering element type:', element.type, 'Content:', element);

    switch (element.type) {
      case 'text':
        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: element.backgroundColor || '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <Typography
              component="div" // Используем div для лучшего контроля
              sx={{
                fontSize: element.fontSize || '16px',
                color: element.color || '#000000',
                fontWeight: element.fontWeight || 'normal',
                textAlign: element.alignment || 'center',
                padding: element.padding || '8px',
                width: '100%',
                wordBreak: 'break-word'
              }}
            >
              {element.text || '[Пустой текст]'}
            </Typography>
          </Box>
        );
        
      case 'image':
        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: element.borderWidth > 0 ? `${element.borderWidth}px solid ${element.borderColor}` : 'none',
              borderRadius: element.borderRadius,
              backgroundColor: '#f5f5f5',
              overflow: 'hidden',
              opacity: element.opacity
            }}
          >
            {element.src ? (
              <img
                src={element.src}
                alt={element.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <Typography variant="caption" color="text.secondary">
                {element.alt}
              </Typography>
            )}
          </Box>
        );
        
        case 'table':
          return (
            <Box sx={{ width: '100%', height: '100%', overflow: 'auto', p: 1 }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  tableLayout: 'auto'
                }}
              >
                {element.header && (
                  <thead>
                    <tr>
                      {element.columns.map((col, idx) => (
                        <th
                          key={idx}
                          style={{
                            backgroundColor: element.headerBackground || '#f5f5f5',
                            color: element.headerTextColor || '#000000',
                            padding: `${element.cellPadding || 8}px`,
                            border: `${element.borderWidth || 1}px solid ${element.borderColor || '#dddddd'}`,
                            textAlign: 'left',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {element.rows.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          style={{
                            backgroundColor: element.cellBackground || '#ffffff',
                            color: element.cellTextColor || '#000000',
                            padding: `${element.cellPadding || 8}px`,
                            border: `${element.borderWidth || 1}px solid ${element.borderColor || '#dddddd'}`,
                            fontSize: '13px'
                          }}
                        >
                          {cell || '\u00A0'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          );
        
      case 'chart':
        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              border: `${element.borderWidth}px solid ${element.borderColor}`,
              backgroundColor: element.backgroundColor,
              display: 'flex',
              flexDirection: 'column',
              p: 2
            }}
          >
            <Typography variant="subtitle2" gutterBottom align="center">
              {element.title}
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                [{element.chartType} chart]
              </Typography>
            </Box>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Paper
      ref={elementRef}
      elevation={isSelected ? 3 : 1}
      sx={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        cursor: isDragging ? 'grabbing' : (isSelected ? 'move' : 'pointer'),
        border: isSelected ? '2px solid #1976d2' : '1px solid #ccc',
        overflow: 'hidden',
        userSelect: 'none',
        '&:hover': {
          boxShadow: 3,
          borderColor: isSelected ? '#1976d2' : '#999'
        }
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Верхняя панель управления */}
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px 4px 0 0',
            fontSize: '12px',
            zIndex: 10
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DragIndicator fontSize="small" />
            <Typography variant="caption">
              {elementTypes.find(t => t.type === element.type)?.label}
            </Typography>
          </Box>
          <Box>
            <IconButton
              size="small"
              sx={{ color: 'white', p: 0.5 }}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(element.id);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      )}
      
      {/* Содержимое элемента */}
      {renderElementContent()}
      
      {/* Ручка для изменения размера (в правом нижнем углу) */}
      {isSelected && (
        <Box
          className="resize-handle"
          sx={{
            position: 'absolute',
            right: -4,
            bottom: -4,
            width: 12,
            height: 12,
            backgroundColor: '#1976d2',
            border: '2px solid white',
            borderRadius: '50%',
            cursor: 'nwse-resize',
            zIndex: 10
          }}
        />
      )}
    </Paper>
  );
};

export default CanvasElement;