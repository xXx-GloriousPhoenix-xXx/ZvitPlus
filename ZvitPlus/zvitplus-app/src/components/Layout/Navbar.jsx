import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Person,
  Description,
  Assessment,
  Add,
  Menu as MenuIcon,
  Home,
  Dashboard,
  Logout,
  Settings,
  AccountCircle
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  
  const isAuthenticated = localStorage.getItem('token');
  
  // Безопасный парсинг пользователя
  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : {};
    } catch (error) {
      console.error('Error parsing user data:', error);
      return {};
    }
  };
  
  const user = getUser();
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleMenuClose();
    handleMobileMenuClose();
    navigate('/login');
  };
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Меню для мобильных устройств
  const mobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: { width: 250 }
      }}
    >
      {isAuthenticated ? (
        <>
          <MenuItem 
            component={RouterLink} 
            to="/my-space"
            onClick={handleMobileMenuClose}
            selected={isActive('/my-space')}
          >
            <Dashboard sx={{ mr: 2 }} />
            My Space
          </MenuItem>
          <MenuItem 
            component={RouterLink} 
            to="/templates"
            onClick={handleMobileMenuClose}
            selected={isActive('/templates')}
          >
            <Description sx={{ mr: 2 }} />
            Шаблони
          </MenuItem>
          <MenuItem 
            component={RouterLink} 
            to="/reports"
            onClick={handleMobileMenuClose}
            selected={isActive('/reports')}
          >
            <Assessment sx={{ mr: 2 }} />
            Звіти
          </MenuItem>
          <Divider />
          <MenuItem 
            component={RouterLink} 
            to="/create-report"
            onClick={handleMobileMenuClose}
          >
            <Add sx={{ mr: 2 }} />
            Створити звіт
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 2 }} />
            Вийти
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem 
            component={RouterLink} 
            to="/"
            onClick={handleMobileMenuClose}
            selected={location.pathname === '/'}
          >
            <Home sx={{ mr: 2 }} />
            Головна
          </MenuItem>
          <MenuItem 
            component={RouterLink} 
            to="/login"
            onClick={handleMobileMenuClose}
            selected={location.pathname === '/login'}
          >
            <AccountCircle sx={{ mr: 2 }} />
            Увійти
          </MenuItem>
          <MenuItem 
            component={RouterLink} 
            to="/register"
            onClick={handleMobileMenuClose}
            selected={location.pathname === '/register'}
          >
            <Person sx={{ mr: 2 }} />
            Реєстрація
          </MenuItem>
        </>
      )}
    </Menu>
  );
  
  return (
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
          // Мобильное меню
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
            {mobileMenu}
          </>
        ) : (
          // Десктопное меню
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <>
                {/* Основная навигация */}
                <Tooltip title="My Space">
                  <Button
                    component={RouterLink}
                    to="/my-space"
                    startIcon={<Dashboard />}
                    color={isActive('/my-space') ? "primary" : "inherit"}
                    sx={{
                      color: isActive('/my-space') ? 'primary.main' : 'text.primary',
                      fontWeight: isActive('/my-space') ? 600 : 400
                    }}
                  >
                    Мій простір
                  </Button>
                </Tooltip>
                
                <Tooltip title="Шаблони">
                  <Button
                    component={RouterLink}
                    to="/templates"
                    startIcon={<Description />}
                    color={isActive('/templates') ? "primary" : "inherit"}
                    sx={{
                      color: isActive('/templates') ? 'primary.main' : 'text.primary',
                      fontWeight: isActive('/templates') ? 600 : 400
                    }}
                  >
                    Шаблони
                  </Button>
                </Tooltip>
                
                <Tooltip title="Звіти">
                  <Button
                    component={RouterLink}
                    to="/reports"
                    startIcon={<Assessment />}
                    color={isActive('/reports') ? "primary" : "inherit"}
                    sx={{
                      color: isActive('/reports') ? 'primary.main' : 'text.primary',
                      fontWeight: isActive('/reports') ? 600 : 400
                    }}
                  >
                    Звіти
                  </Button>
                </Tooltip>
                
                {/* Кнопка создания отчета */}
                <Button
                  component={RouterLink}
                  to="/create-report"
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    ml: 2,
                    px: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    }
                  }}
                >
                  Створити звіт
                </Button>
                
                {/* Профиль пользователя */}
                <Tooltip title="Профіль">
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                      ml: 1,
                      border: '2px solid',
                      borderColor: 'primary.light',
                      bgcolor: 'primary.50'
                    }}
                  >
                    {user && user.email ? (
                      <Avatar
                        sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: 'primary.main',
                          fontSize: '0.875rem'
                        }}
                      >
                        {user.email.charAt(0).toUpperCase()}
                      </Avatar>
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                </Tooltip>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {user && user.email && (
                    <MenuItem disabled sx={{ color: 'text.secondary' }}>
                      <Typography variant="body2">{user.email}</Typography>
                    </MenuItem>
                  )}
                  {user && user.role && (
                    <MenuItem disabled sx={{ color: 'text.secondary' }}>
                      <Badge 
                        badgeContent={user.role} 
                        color="secondary"
                        sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
                      />
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem 
                    component={RouterLink} 
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    <Settings fontSize="small" sx={{ mr: 1 }} />
                    Налаштування
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" sx={{ mr: 1 }} />
                    Вийти
                  </MenuItem>
                </Menu>
              </>
            ) : (
              // Неавторизованный пользователь
              <>
                <Button
                  component={RouterLink}
                  to="/"
                  color={location.pathname === '/' ? "primary" : "inherit"}
                  sx={{
                    color: location.pathname === '/' ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === '/' ? 600 : 400
                  }}
                >
                  Головна
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    }
                  }}
                >
                  Увійти
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    }
                  }}
                >
                  Реєстрація
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
      
      {/* Индикатор активной страницы (подсветка) */}
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
  );
};

export default Navbar;