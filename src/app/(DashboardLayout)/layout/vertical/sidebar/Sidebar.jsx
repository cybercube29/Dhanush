import Scrollbar from '@/app/components/shared/Scrollbar';
import { hoverSidebar, toggleMobileSidebar } from '@/store/customizer/CustomizerSlice';
import { Button, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconPower } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../customizer/Logo';
import SidebarItems from './SidebarItems';

const Sidebar = () => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true));
    }
  };

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push(process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL);
  }

  return (<>
    {!lgUp ?
      <Box sx={{ zIndex: 100, width: toggleWidth, flexShrink: 0, ...(customizer.isCollapse && { position: 'absolute', }), }} >
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: 'border-box',
            },
          }}>
          <Box sx={{ height: '100%', }} >
            <Logo />
            <Scrollbar sx={{ height: 'calc(100% - 100px)' }}>
              <SidebarItems />
            </Scrollbar>

            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Tooltip title="Logout" placement="top">
                <Button
                  color="primary"
                  size='small'
                  endIcon={<IconPower size={15} />}
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    width: '100%',
                  }}
                  onClick={handleLogout}
                >
                  LOGOUT
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Drawer>
      </Box>
      :
      <Drawer
        anchor="left"
        open={customizer.isMobileSidebar}
        onClose={() => dispatch(toggleMobileSidebar())}
        variant="temporary"
        PaperProps={{
          sx: {
            width: customizer.SidebarWidth,
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}>
        <Box sx={{ px: 2 }}> Dashboard </Box>
        <SidebarItems />
      </Drawer>
    }
  </>);
};

export default Sidebar;
