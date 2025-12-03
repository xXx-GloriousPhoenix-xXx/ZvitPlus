export const styles = {
    logo: {
      flexGrow: 1,
      fontWeight: 700,
      color: 'primary.main',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 1
    },
    logoDot: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      bgcolor: 'primary.main',
      display: 'inline-block'
    },
    activeIndicator: {
      height: 3,
      bgcolor: 'primary.main',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease'
    },
    createButton: {
      ml: 2,
      px: 3,
      borderRadius: 2,
      textTransform: 'none',
      fontWeight: 600,
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
      }
    },
    loginButton: {
      borderRadius: 2,
      textTransform: 'none',
      fontWeight: 600,
      borderWidth: 2,
      '&:hover': {
        borderWidth: 2
      }
    }
  };