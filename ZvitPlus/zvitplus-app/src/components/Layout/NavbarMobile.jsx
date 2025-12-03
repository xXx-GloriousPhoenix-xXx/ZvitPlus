import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add,
  Dashboard,
  Description,
  Assessment,
  Home,
  AccountCircle,
  Person,
  Settings,
  Logout,
  Shield
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRoleInfo } from './RoleUtils';
import UserAvatar from './UserAvatar';

const NavbarMobile = ({
  isAuthenticated,
  user,
  location,
  onLogout
}) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const roleInfo = useRoleInfo(user?.role);
  
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };
  
  const handleAvatarClick = () => {
    navigate('/profile');
    handleMobileMenuClose();
  };
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  const renderMenuItems = () => {
    if (!isAuthenticated) {
      return [
        <MenuItem 
          key="home"
          component={RouterLink} 
          to="/"
          onClick={handleMobileMenuClose}
          selected={location.pathname === '/'}
        >
          <Home sx={{ mr: 2 }} />
          Головна
        </MenuItem>,
        <MenuItem 
          key="login"
          component={RouterLink} 
          to="/login"
          onClick={handleMobileMenuClose}
          selected={location.pathname === '/login'}
        >
          <AccountCircle sx={{ mr: 2 }} />
          Увійти
        </MenuItem>,
        <MenuItem 
          key="register"
          component={RouterLink} 
          to="/register"
          onClick={handleMobileMenuClose}
          selected={location.pathname === '/register'}
        >
          <Person sx={{ mr: 2 }} />
          Реєстрація
        </MenuItem>
      ];
    }
    
    const items = [
      // Кликабельный аватар с переходом в профиль
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
        <UserAvatar user={user} size={40} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.login || 'Користувач'}
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
        <Settings fontSize="small" sx={{ color: 'text.secondary' }} />
      </MenuItem>,
      <Divider key="divider1" />,
      <MenuItem 
        key="my-space"
        component={RouterLink} 
        to="/my-space"
        onClick={handleMobileMenuClose}
        selected={isActive('/my-space')}
      >
        <Dashboard sx={{ mr: 2 }} />
        Мій простір
      </MenuItem>,
      <MenuItem 
        key="templates"
        component={RouterLink} 
        to="/templates"
        onClick={handleMobileMenuClose}
        selected={isActive('/templates')}
      >
        <Description sx={{ mr: 2 }} />
        Шаблони
      </MenuItem>,
      <MenuItem 
        key="reports"
        component={RouterLink} 
        to="/reports"
        onClick={handleMobileMenuClose}
        selected={isActive('/reports')}
      >
        <Assessment sx={{ mr: 2 }} />
        Звіти
      </MenuItem>,
      <Divider key="divider2" />,
      <MenuItem 
        key="create-report"
        component={RouterLink} 
        to="/create-report"
        onClick={handleMobileMenuClose}
      >
        <Add sx={{ mr: 2 }} />
        Створити звіт
      </MenuItem>
    ];
    
    if (user?.role?.toLowerCase() === 'administrator') {
      items.push(
        <Divider key="divider-admin" />,
        <MenuItem 
          key="admin-panel"
          component={RouterLink} 
          to="/admin"
          onClick={handleMobileMenuClose}
          selected={isActive('/admin')}
          sx={{ color: roleInfo.color }}
        >
          <Shield sx={{ mr: 2 }} />
          Адмін панель
        </MenuItem>
      );
    }
    
    // Убираем пункт "Налаштування", так как аватар уже кликабельный
    items.push(
      <Divider key="divider3" />,
      <MenuItem 
        key="logout" 
        onClick={() => {
          handleMobileMenuClose();
          onLogout();
        }}
      >
        <Logout sx={{ mr: 2 }} />
        Вийти
      </MenuItem>
    );
    
    return items;
  };
  
  return (
    <>
      {isAuthenticated && (
        <IconButton
          component={RouterLink}
          to="/create-report"
          color="primary"
          sx={{ mr: 1 }}
        >
          <Add />
        </IconButton>
      )}
      <IconButton
        color="inherit"
        onClick={handleMobileMenuOpen}
        sx={{ color: 'text.primary' }}
      >
        <MenuIcon />
      </IconButton>
      
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        {renderMenuItems()}
      </Menu>
    </>
  );
};

export default NavbarMobile;