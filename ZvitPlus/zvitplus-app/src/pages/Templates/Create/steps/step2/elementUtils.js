import {
    TextFields,
    Image,
    TableChart,
    BarChart
  } from '@mui/icons-material';
  
  export const getElementIcon = (type) => {
    const icons = {
      'text': <TextFields />,
      'image': <Image />,
      'table': <TableChart />,
      'chart': <BarChart />
    };
    return icons[type] || null;
  };