import { useState, useEffect } from 'react';

// MUI
import { Card, Typography, Grid, List, Collapse, FormControl, ListItemButton,  } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';

const AddOn = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Typography>this is Add On section</Typography>
      </Card>
    </ThemeProvider>
  );
}
export default AddOn;
