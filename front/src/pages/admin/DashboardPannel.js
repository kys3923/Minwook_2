import { useState, useEffect } from "react";

// MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Typography } from "@mui/material";


// Store on/off, set schedule

const DashBoardPannel = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography>Dash Pannel? </Typography>
    </ThemeProvider>
  );
}
export default DashBoardPannel;