import React from 'react';
import {
  Box,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Dashboard,
  Description,
  Assessment,
  Add
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import UserAvatar from './UserAvatar';

const NavbarDesktop = ({
  isAuthenticated,
  user,
  isActive,
  onMenuOpen,
  onLogout
}) => {
  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            color: 'text.primary',
            fontWeight: 400
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
            '&:hover': { borderWidth: 2 }
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
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
      
      <Tooltip title={`${user?.login || 'Користувач'}`}>
        <IconButton onClick={onMenuOpen} sx={{ ml: 1 }}>
          <UserAvatar user={user} size={36} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NavbarDesktop;