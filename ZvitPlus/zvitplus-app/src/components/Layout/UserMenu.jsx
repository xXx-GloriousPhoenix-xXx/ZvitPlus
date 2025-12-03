import React from 'react';
import {
  Menu,
  MenuItem,
  Divider,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import {
  Settings,
  Logout,
  Shield,
  Dashboard,
  Description,
  Assessment,
  Add,
  Home,
  AccountCircle,
  Person
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { useRoleInfo } from './RoleUtils';

const UserMenu = ({ 
  anchorEl, 
  onClose, 
  user, 
  isMobile = false,
  onLogout 
}) => {
  const navigate = useNavigate();
  const roleInfo = useRoleInfo(user?.role);
  
  const isActive = (path) => {
    // Заглушка - эта функция должна быть передана из родительского компонента
    // или реализована здесь с использованием useLocation
    return false;
  };

  const handleAvatarClick = () => {
    navigate('/profile');
    onClose();
  };

  const commonMenuItems = [
    {
      key: 'my-space',
      label: 'My Space',
      icon: <Dashboard />,
      to: '/my-space',
      active: isActive('/my-space')
    },
    {
      key: 'templates',
      label: 'Шаблони',
      icon: <Description />,
      to: '/templates',
      active: isActive('/templates')
    },
    {
      key: 'reports',
      label: 'Звіти',
      icon: <Assessment />,
      to: '/reports',
      active: isActive('/reports')
    },
    { type: 'divider', key: 'divider1' },
    {
      key: 'create-report',
      label: 'Створити звіт',
      icon: <Add />,
      to: '/create-report'
    }
  ];

  const adminMenuItem = user?.role?.toLowerCase() === 'administrator' ? {
    key: 'admin-panel',
    label: 'Адмін панель',
    icon: <Shield />,
    to: '/admin',
    active: isActive('/admin'),
    color: roleInfo.color
  } : null;

  const profileMenuItem = {
    key: 'profile',
    label: 'Налаштування',
    icon: <Settings />,
    to: '/profile'
  };

  const logoutMenuItem = {
    key: 'logout',
    label: 'Вийти',
    icon: <Logout />,
    onClick: onLogout
  };

  const unauthenticatedMenuItems = [
    {
      key: 'home',
      label: 'Головна',
      icon: <Home />,
      to: '/',
      active: isActive('/')
    },
    {
      key: 'login',
      label: 'Увійти',
      icon: <AccountCircle />,
      to: '/login',
      active: isActive('/login')
    },
    {
      key: 'register',
      label: 'Реєстрація',
      icon: <Person />,
      to: '/register',
      active: isActive('/register')
    }
  ];

  const renderMenuItem = (item) => {
    if (item.type === 'divider') {
      return <Divider key={item.key} />;
    }

    return (
      <MenuItem
        key={item.key}
        component={item.to ? RouterLink : 'div'}
        to={item.to}
        onClick={item.onClick || onClose}
        selected={item.active}
        sx={item.color ? { color: item.color } : {}}
      >
        {item.icon && React.cloneElement(item.icon, { sx: { mr: 2 } })}
        {item.label}
      </MenuItem>
    );
  };

  // Функция для рендеринга элементов меню для авторизованных пользователей
  const renderAuthenticatedMenuItems = () => {
    const items = [
      // Аватар пользователя
      <MenuItem 
        key="user-avatar"
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' }
        }}
        onClick={handleAvatarClick}
      >
        <UserAvatar user={user} size={isMobile ? 40 : 36} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user.login}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: roleInfo.color,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontWeight: 'bold'
            }}
          >
            {roleInfo.icon}
            {roleInfo.label}
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          sx={{ 
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          <Settings fontSize="small" />
        </IconButton>
      </MenuItem>,
      <Divider key="divider-after-avatar" />
    ];

    // Добавляем общие пункты меню
    commonMenuItems.forEach(item => {
      items.push(renderMenuItem(item));
    });

    // Добавляем админ панель если нужно
    if (adminMenuItem) {
      items.push(renderMenuItem(adminMenuItem));
      items.push(<Divider key="admin-divider" />);
    }

    // Добавляем профиль и выход
    items.push(renderMenuItem(profileMenuItem));
    items.push(renderMenuItem(logoutMenuItem));

    return items;
  };

  // Функция для рендеринга элементов меню для неавторизованных пользователей
  const renderUnauthenticatedMenuItems = () => {
    return unauthenticatedMenuItems.map(renderMenuItem);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: { width: isMobile ? 280 : 240 }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {user?.login 
        ? renderAuthenticatedMenuItems()  // возвращает массив
        : renderUnauthenticatedMenuItems() // возвращает массив
      }
    </Menu>
  );
};

export default UserMenu;