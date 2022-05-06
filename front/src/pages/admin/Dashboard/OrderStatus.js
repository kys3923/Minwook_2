import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// Mui
import { ThemeProvider } from '@mui/material/styles'
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Modal, Badge } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Components
import theme from '../../../theme/theme';

const OrderStatus = (props) => {
  // socket connection
  const socket = useRef();

  useEffect(() => {
    // TODO: update ws location
    socket.current = io("ws://localhost:8000")
    socket.current.on('connection', () => {
      console.log('connected to the server')
    })
  }, [])

  // states
  const [ expanded, setExpanded ] = useState(false);

  // handlers
  const pannelHandler = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} md={8} sx={{ margin: '3em auto'}}>
        {/* New Orders */}
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={pannelHandler('panel1')}
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            {/* TODO: Badge numers = order length */}
            <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '1.25em', color: 'darkgreen'}}>New</Typography>
            {/* TODO: set lineheight */}
            <Typography sx={{ fontSize: '1em', color: 'gray'}}>Second text</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
            <Typography>some details</Typography>
          </AccordionDetails>
        </Accordion>
        {/* Confired Orders */}
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={pannelHandler('panel2')}
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            {/* TODO: Badge numers = order length */}
            <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '1.25em', color: 'darkgreen'}}>Confirmed</Typography>
            {/* TODO: set lineheight */}
            <Typography sx={{ fontSize: '1em', color: 'gray'}}>Second text</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
            <Typography>some details</Typography>
          </AccordionDetails>
        </Accordion>
        {/* Finished Orders */}
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={pannelHandler('panel3')}
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            {/* TODO: Badge numers = order length */}
            <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '1.25em', color: 'darkgreen'}}>Ready for Pickup</Typography>
            {/* TODO: set lineheight */}
            <Typography sx={{ fontSize: '1em', color: 'gray'}}>Second text</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
            <Typography>some details</Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </ThemeProvider>
  );
}
export default OrderStatus;