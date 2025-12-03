import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';
import UserMenu from './UserMenu';
import { getUserFromStorage } from './RoleUtils';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [menuAnchor, setMenuAnchor] = useState(null);
  
  const isAuthenticated = localStorage.getItem('token');
  const user = getUserFromStorage();
  
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleMenuClose();
    navigate('/login');
  };
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  return (
    <>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          {/* Логотип */}
          <Typography
            variant="h6"
            component={RouterLink}
            to={isAuthenticated ? "/my-space" : "/"}
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'inline-block'
              }}
            />
            Звіт+
          </Typography>
          
          {isMobile ? (
            <NavbarMobile
              isAuthenticated={isAuthenticated}
              user={user}
              location={location}
              onLogout={handleLogout}
            />
          ) : (
            <NavbarDesktop
              isAuthenticated={isAuthenticated}
              user={user}
              isActive={isActive}
              onMenuOpen={handleMenuOpen}
              onLogout={handleLogout}
            />
          )}
        </Toolbar>
        
        {/* Индикатор активной страницы (только для десктопа) */}
        {!isMobile && isAuthenticated && (
          <Box sx={{ 
            height: 3, 
            bgcolor: 'primary.main',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
            ...(isActive('/my-space') && { 
              transform: 'scaleX(0.166)',
              left: 'calc(16.66% * 0)'
            }),
            ...(isActive('/templates') && { 
              transform: 'scaleX(0.166)',
              left: 'calc(16.66% * 1)'
            }),
            ...(isActive('/reports') && { 
              transform: 'scaleX(0.166)',
              left: 'calc(16.66% * 2)'
            }),
          }} />
        )}
      </AppBar>
      
      {/* Десктопное меню пользователя */}
      {!isMobile && (
        <UserMenu
          anchorEl={menuAnchor}
          onClose={handleMenuClose}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;