import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Box } from "@mui/material";
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    backgroundColor: "#fefefe",
    width: "0"
  },
  "& .simplebar-track.simplebar-vertical": {
    width: "0",
  },
  "& .simplebar-track.simplebar-horizontal": {
    height: "0",
  }
}));

const Scrollbar = (props) => {
  const { children, sx, ...other } = props;
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  if (lgDown) {
    return <Box sx={{ overflowX: "auto" }}>{children}</Box>;
  }

  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default Scrollbar;