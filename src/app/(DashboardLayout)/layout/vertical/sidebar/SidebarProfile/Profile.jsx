import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconPower } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: "center",
        gap: 2,
        m: 3,
        p: 2,
        bgcolor: 'secondary.light'
      }}
    >
      {!hideMenu && (
        <>
          <Avatar alt="User Avatar" src={"/images/profile/user-1.jpg"} sx={{ height: 40, width: 40 }} />

          <Box>
            <Typography variant="h6">{"Guest"}</Typography>
            <Typography variant="caption">{"N/A"}</Typography>
          </Box>

          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
    </Box>
  );
};