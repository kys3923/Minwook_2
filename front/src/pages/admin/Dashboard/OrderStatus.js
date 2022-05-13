import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment';
// move io to dashboardPannel

// Mui
import { ThemeProvider } from '@mui/material/styles'
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Modal, Badge, CircularProgress, Card, Chip } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Components
import theme from '../../../theme/theme';
import DetailCard from './DetailCard';

const OrderStatus = (props) => {
  
  // states
  const [ expanded, setExpanded ] = useState(false);
  const [ newOrderNum, setNewOrderNum ] = useState(0);
  const [ confirmOrderNum, setConfirmOrderNum ] = useState(0);
  const [ readyPickNum, setReadyPickNum ] = useState(0);
  const [ orderNumber, setOrderNumber ] = useState();
  const [ socketNewOrders, setSocketNewOrders ] = useState([]);
  const [ socketConfirmedOrders, setSocketConfirmedOrders ] = useState([]);
  const [ socketReadyOrders, setSocketReadyOrders ] = useState([]);
  const [ fetchingNewOrder, setFetchingNewOrder ] = useState(false);
  const [ fetchingConfirmedOrder, setFetchingConfirmedOrder ] = useState(false);
  const [ fetchingReadyOrder, setFetchingReadyOrder ] = useState(false);
  const [ buttonLoading, setButtonLoading ] = useState(false);
  const [ modalValue, setModalValue ] = useState('');
  const [ modalOpen, setModalOpen ] = useState(false);

  // Don't touch this, else break the code
  const socket = io('http://localhost:8000')

  useEffect(() => {
    setFetchingNewOrder(true)
    setFetchingConfirmedOrder(true);
    const fetchingNewOrderData = () => {
      try {
        socket.on('broadcast', (order) => {
          setSocketNewOrders(order);
          setFetchingNewOrder(false);
        })
      } catch (err) {
        console.log(err)
      }
    }
    
    const fetchingConfirmedOrderData = () => {
      try {
        socket.on('confirmOrder', (order) => {
          setSocketConfirmedOrders(order)
          setFetchingConfirmedOrder(false);
        })
      } catch (err) {
        console.log(err)
      }
    }

    fetchingNewOrderData();
    fetchingConfirmedOrderData();
  },[])
  

  // use anything else to use the useEffect here
  useEffect(() => {
    if (!!socketNewOrders.length > 0) {
      setNewOrderNum(socketNewOrders.length)
    }
  }, [socketNewOrders])

  useEffect(() => {
    if (!!socketConfirmedOrders.length > 0) {
      setConfirmOrderNum(socketConfirmedOrders.length)
    }
  },[socketConfirmedOrders])

  // useEffect(() => {
  //   if (!!socketConfirmedOrders.length > 0) {
  //     setConfirmOrderNum(socketConfirmedOrders.length)
  //   }
  // },[socketConfirmedOrders])
  
  useEffect(() => {
    if (!!modalValue) {
      console.log(modalValue, modalOpen)
    }
  },[modalValue, modalOpen])

  // handlers
  const pannelHandler = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const paidOrNotPaidText = (Boolean) => {
    if (Boolean) {
      return <Chip label='Pay at Restaurant' color='primary' size='small' />
    } else if(!Boolean) {
      return <Chip label='Paid Online' color='success' size='small' />
    } else {
      return 'Loading...'
    }
  }

  const totalPriceText = (Number) => {
    if (!!Number) {
      return `$${Number.toFixed(2)}`
    } else {
      return 'Loading Data'
    }
  }

  const detailButtonHandler = (e) => {
    setModalValue(e.currentTarget.value);
    setModalOpen(true);
  }

  const confirmOrderHandler = (e) => {
    console.log(e.currentTarget.value);
    const connectingSocket = async () => {
      try {
        await socket.emit('confirmOrder', e.currentTarget.value)
        console.log('req sent')
      } catch (err) {
        console.log(err)
      }
    }
    connectingSocket();
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
            <Badge badgeContent={newOrderNum} color='primary'><Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>New</Typography></Badge>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
            { fetchingNewOrder && !!socketNewOrders ? 
              <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto', flexDirection: 'column'}}>
                  <CircularProgress />
                  <Typography variant='body1' sx={{marginTop: '.5em'}}>Loading...</Typography>
                </Grid>
              </Grid>
            : 
              <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2} >
                {console.log(socketNewOrders)}
                {socketNewOrders.map((order, i) => (
                  <Grid item xs={12} key={i}>
                    <Card sx={{ padding: '1em 1em'}}>
                      <Grid container>
                        <Grid item xs={8}>
                          <Grid container>
                            <Grid item xs={12} sx={{marginBottom: '.5em', marginTop: '.5em', display: 'flex', flexDirection: 'row'}}>
                              <Typography sx={{ fontWeight: 'bold', color: 'darkgreen', marginRight: '1.5em'}}>
                                {order.OrderNumber}
                              </Typography>
                              <Typography sx={{ fontSize: '.85em', fontWeight: 'light', paddingTop: '.15em'}}>
                                Order Placed: {moment(order.updatedAt).calendar()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row'}}>
                              <Typography sx={{ marginRight: '1em', fontWeight: 'light'}}>
                                Order Total: 
                              </Typography>
                              <Typography sx={{ color: '#dc5a41', fontWeight: 'bold'}}>
                                {totalPriceText(order.grandTotal)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em'}}>
                              {paidOrNotPaidText(order.isPaidAtRestaurant)}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: '.5em', marginTop: '.5em'}}>
                              <LoadingButton variant='outlined' value={order._id} onClick={detailButtonHandler}>Order Details</LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                              <LoadingButton variant='contained' value={order._id} onClick={confirmOrderHandler}>Confirm Order</LoadingButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            }
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
            <Badge badgeContent={confirmOrderNum} color='primary'><Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Confirmed</Typography></Badge>
            {/* TODO: set lineheight */}
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
          { fetchingConfirmedOrder && !!socketConfirmedOrders ? 
              <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto', flexDirection: 'column'}}>
                  <CircularProgress />
                  <Typography variant='body1' sx={{marginTop: '.5em'}}>Loading...</Typography>
                </Grid>
              </Grid>
            : 
              <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2} >
                {console.log(socketConfirmedOrders)}
                {socketConfirmedOrders.map((order, i) => (
                  <Grid item xs={12} key={i}>
                    <Card sx={{ padding: '1em 1em'}}>
                      <Grid container>
                        <Grid item xs={8}>
                          <Grid container>
                            <Grid item xs={12} sx={{marginBottom: '.5em', marginTop: '.5em', display: 'flex', flexDirection: 'row'}}>
                              <Typography sx={{ fontWeight: 'bold', color: 'darkgreen', marginRight: '1.5em'}}>
                                {order.OrderNumber}
                              </Typography>
                              <Typography sx={{ fontSize: '.85em', fontWeight: 'light', paddingTop: '.15em'}}>
                                Order Placed: {moment(order.updatedAt).calendar()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row'}}>
                              <Typography sx={{ marginRight: '1em', fontWeight: 'light'}}>
                                Order Total: 
                              </Typography>
                              <Typography sx={{ color: '#dc5a41', fontWeight: 'bold'}}>
                                {totalPriceText(order.grandTotal)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em'}}>
                              {paidOrNotPaidText(order.isPaidAtRestaurant)}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: '.5em', marginTop: '.5em'}}>
                              <LoadingButton variant='outlined' value={order._id} onClick={detailButtonHandler}>Order Details</LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                              <LoadingButton variant='contained' value={order._id} onClick={confirmOrderHandler}>Confirm Order</LoadingButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            }
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
      <Modal open={modalOpen}>
        <DetailCard value={modalValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </Modal>
    </ThemeProvider>
  );
}
export default OrderStatus;