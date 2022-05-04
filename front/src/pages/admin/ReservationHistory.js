import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Typography, Grid, Button, Modal, Card, Chip, Stack, CircularProgress } from '@mui/material';

const statusFilter = (isShowedUp) => {
  if (isShowedUp) {
    return 'Arrived'
  } else {
    return 'Booked'
  }
}

// TODO: need to finish reservation logic below
// Booked Left Message Confirmed Running Late Partially Arrived Arrived Cancelled No-Show


const ReservationHistory = (props) => {

  // States
  const [ loading, setLoading ] = useState(true);
  const [ reservations, setReservations ] = useState([]);
  const [ reservation, setReservation ] = useState([]);
  const [ modalLoading, setModalLoading ] = useState(false);
  const [ detailOpen, setDetailOpen ] = useState(false);

  // Handlers
  const detailHandler = (e) => {
    setModalLoading(true);
    setDetailOpen(true);
    const findOneReservation = async (id) => {
      const foundReservation = reservations.find(reservation =>  reservation._id === id)
      await setReservation(foundReservation);
    }
    findOneReservation(e.currentTarget.value);
  }

  const detailCloser = (e) => {
    setDetailOpen(false);
  }

  // useEffect
  useEffect(() => {
    async function fetchReservations() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/reservation/list/listreservation`, config)
      setReservations(data.reservation);
    }
    fetchReservations();
  },[])


  return (
    <ThemeProvider theme={theme}>
      { loading ? 
      <Grid container>
        <Grid item xs={12} sx={{ width: '100%', height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress />
          <Typography sx={{ marginTop: '1em'}}>Loading...</Typography>
        </Grid>
        { reservations ? <>{setLoading(false)}</> : null }
      </Grid> :
      <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41'}}>Reservation History</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={2} sx={{ marginTop: '1em' }}>
            <Grid container sx={{ padding: '3px 3px', minWidth: '900px', bgcolor: 'darkgreen', textAlign: 'center', color: 'white'}}>
              <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                <Typography>Status</Typography>
              </Grid>
              <Grid item xs={3} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                {/* comments, contact, date, reservedate, customer, reservename, totalparty, status */}
                <Typography>Reserved Date</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>Reserved Name</Typography>
              </Grid>
              <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                <Typography>Party Number</Typography>
              </Grid>
              <Grid item xs={2} sx={{ padding: '3px 3px'}}>
                <Typography>More Info</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
              {reservations.map((reservation, i) => (
                <Grid container key={i} sx={{ width: '100%', minWidth: '900px', textAlign: 'center', borderBottom: '1px solid lightgray'}}>
                  <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{statusFilter(reservation.isShowedUp)}</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{moment(reservation.reserveDate).format('MM[/]DD[/]YY[, ]hh[:]mm[ ]a')}</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', paddingLeft: '2em'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{reservation.name}</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{reservation.totalParty}&nbsp;ppl</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button size='small' value={reservation._id} onClick={detailHandler}>Details</Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Modal open={detailOpen}>
        {modalLoading ? 
        <Card sx={{ width: 500, maxHeight: '80vh', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em', overflow: 'auto'}}>
          <Grid container>
            <Grid item xs={12} sx={{ width: '100%', height: '65vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress />
              <Typography sx={{ marginTop: '1em' }}>Loading...</Typography>
            </Grid>
          </Grid>
          {reservation ? <>{setModalLoading(false)}</> : null }
        </Card> 
        : 
        <Card sx={{ width: 500, maxHeight: '80vh', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em', overflow: 'auto'}}>
          <Grid container>
            <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41'}}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Reservation Details</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{statusFilter(reservation.isShowedUp)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container sx={{ padding: '1em 2em'}}>
                <Grid item xs={12} sx={{ marginTop: '.25em', marginBottom: '1em'}}>
                  <Stack
                    direction='row'
                    alignItems='flex-start'
                    spacing={1}
                  >
                    <Chip size='small' variant='outlined' sx={{ border: '1px solid darkgreen'}} label={reservation.email} />
                    <Chip size='small' variant='outlined' sx={{ border: '1px solid darkgreen'}} label={reservation.contact} />
                    <Chip size='small' variant='outlined' sx={{ border: '1px solid darkgreen'}} label={moment(reservation.updatedAt).format('MM[/]DD[/]YY[, ]h[:]mm[ ]a')} />
                  </Stack>
                </Grid>
                <Grid item xs={5} sx={{ marginBottom: '.5em' }}>
                  <Typography variant='body1' sx={{ color: '#dc5a41' }}>
                    Reserved Name:
                  </Typography>
                </Grid>
                <Grid item xs={7} sx={{ marginBottom: '.5em' }}>
                  <Typography variant='body1' sx={{ color: 'darkgreen' }}>
                    {reservation.name}
                  </Typography>
                </Grid>
                <Grid item xs={5} sx={{ marginBottom: '.5em', marginTop: '.5em' }}>
                  <Typography variant='body1' sx={{ color: '#dc5a41' }}>
                    Reserved Date:
                  </Typography>
                </Grid>
                <Grid item xs={7} sx={{ marginBottom: '.5em', marginTop: '.5em' }}>
                  <Typography variant='body1' sx={{ color: 'darkgreen' }}>
                    {moment(reservation.reserveDate).format('MM[/]DD[/]YY[, ]hh[:]mm[ ]a')}
                  </Typography>
                </Grid>
                <Grid item xs={5} sx={{ marginBottom: '.5em', marginTop: '.5em' }}>
                  <Typography variant='body1' sx={{ color: '#dc5a41' }}>
                    Number of Party:
                  </Typography>
                </Grid>
                <Grid item xs={7} sx={{ marginBottom: '.5em', marginTop: '.5em' }}>
                  <Typography variant='body1' sx={{ color: 'darkgreen' }}>
                    {reservation.totalParty}&nbsp;ppl
                  </Typography>
                </Grid>
                { reservation.comments ? 
                <>
                  <Grid item xs={5} sx={{ marginBottom: '.5em', marginTop: '.5em' }}>
                    <Typography variant='body1' sx={{ color: '#dc5a41' }}>
                      Comments:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sx={{ marginBottom: '.5em', marginTop: '.5em' }}>
                    <Typography variant='body1' sx={{ color: 'darkgreen', paddingTop: '.25em' }}>
                      {reservation.comments}
                    </Typography>
                  </Grid>
                </> : null}
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
              <Button onClick={detailCloser} variant="contained" sx={{ width: '10em'}}>Close</Button>
            </Grid>
          </Grid>
        </Card>
        }
      </Modal>
      </>
      }
    </ThemeProvider>
  );
}
export default ReservationHistory;