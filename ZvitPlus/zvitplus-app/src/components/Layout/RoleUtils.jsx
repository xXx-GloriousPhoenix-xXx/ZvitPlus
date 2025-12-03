import { useTheme } from '@mui/material';
import { Shield, Gavel, PersonOutline } from '@mui/icons-material';

export const useRoleInfo = (role) => {
  const theme = useTheme();
  
  switch (role?.toLowerCase()) {
    case 'administrator':
      return {
        icon: <Shield />,
        color: theme.palette.error.main,
        bgColor: theme.palette.error.light,
        borderColor: theme.palette.error.main,
        textColor: theme.palette.error.contrastText,
        label: 'Адміністратор'
      };
    case 'moderator':
      return {
        icon: <Gavel />,
        color: theme.palette.warning.main,
        bgColor: theme.palette.warning.light,
        borderColor: theme.palette.warning.main,
        textColor: theme.palette.warning.contrastText,
        label: 'Модератор'
      };
    case 'user':
    default:
      return {
        icon: <PersonOutline />,
        color: theme.palette.primary.main,
        bgColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        textColor: theme.palette.primary.contrastText,
        label: 'Користувач'
      };
  }
};

export const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : {};
  } catch (error) {
    console.error('Error parsing user data:', error);
    return {};
  }
};