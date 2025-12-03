import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess, Description, Image, TableChart, Slideshow, Folder, DataObject } from '@mui/icons-material';

const TemplateStructure = ({ structure }) => {
  const [expanded, setExpanded] = useState(false);

  if (!structure) return null;

  return (
    <Card variant="outlined">
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="subtitle2" color="primary">
            Структура шаблону
          </Typography>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </Box>
        
        <Collapse in={expanded}>
          <Box sx={{ mt: 2, '& > *': { mb: 0.5 } }}>
            <Typography variant="body2">
              <Description fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Текстові елементи: <strong>{structure.textElements || 0}</strong>
            </Typography>
            <Typography variant="body2">
              <Image fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Зображення: <strong>{structure.imageElements || 0}</strong>
            </Typography>
            <Typography variant="body2">
              <TableChart fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Таблиці: <strong>{structure.tableElements || 0}</strong>
            </Typography>
            <Typography variant="body2">
              <Slideshow fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Діаграми: <strong>{structure.chartElements || 0}</strong>
            </Typography>
            <Typography variant="body2">
              <Folder fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Файли медіа: <strong>{structure.mediaFiles || 0}</strong>
            </Typography>
            <Typography variant="body2">
              <DataObject fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Файли даних: <strong>{structure.dataFiles || 0}</strong>
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default TemplateStructure;