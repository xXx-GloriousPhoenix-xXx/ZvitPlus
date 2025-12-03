import React from 'react';
import { Avatar, Box } from '@mui/material';
import { useRoleInfo } from './RoleUtils';

const UserAvatar = ({ user, size = 36 }) => {
  const roleInfo = useRoleInfo(user?.role);
  const userInitial = user?.login ? user.login.charAt(0).toUpperCase() : 'U';

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: roleInfo.bgColor,
          color: roleInfo.textColor,
          fontSize: size * 0.44,
          fontWeight: 'bold',
          border: `2px solid ${roleInfo.borderColor}`,
          boxShadow: `0 0 0 1px ${theme => theme.palette.background.paper}`
        }}
      >
        {userInitial}
      </Avatar>
      <Box
        sx={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          width: size * 0.56,
          height: size * 0.56,
          borderRadius: '50%',
          bgcolor: theme => theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${theme => theme.palette.divider}`
        }}
      >
        <Box
          sx={{
            color: roleInfo.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size * 0.44
          }}
        >
          {roleInfo.icon}
        </Box>
      </Box>
    </Box>
  );
};

export default UserAvatar;