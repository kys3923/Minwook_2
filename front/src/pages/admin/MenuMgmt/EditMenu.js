import { useState, useEffect } from 'react';

// MUI
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../../theme/theme';
import { Typography, Grid, Button, Modal, Card, Chip, Stack, CircularProgreess } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axios from 'axios';

const EditMenu = (props) => {
  // menu model : name, description, price, category, Sub_Category, stock_availability
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('');
  const [ Sub_Category, setSubCategory] = useState('');
  const [ stock_availability, setStock ] = useState(null);
  const [ error, setError ] = useState('loading');
  const [ receivedData, setReceivedData ] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedID, setSelectedID ] = useState('')
  const [ selectedMenu, setSelectedMenu ] = useState();
  
  
  // handlers
  const modalOpener = async (e) => {
    const setStates = async (data) => {
      if (!!data) {
          await setName(data.name)
          await setDescription(data.description)
          await setCaption(data.caption)
          await setPrice(data.price)
          await setCategory(data.category)
          await setSubCategory(data.Sub_Category)
          await setStock(data.stock_availability)
          await setSelectedID(data._id)
        }
      }
    const findOneMenu = async (data) => {
      console.log(data, 'data', receivedData)
      const foundMenu = receivedData.find(menu => menu._id === data)
      await setSelectedMenu(foundMenu)
      setStates(foundMenu)
    }
    
    findOneMenu(e.target.value)
    setModalOpen(true);
    }
    
    const modalCloser = (e) => {
      setModalOpen(false)
    }
    
    const stockFormatter = (boolean) => {
      if (boolean) {
        return 'in stock'
      } else {
        return 'out of stock'
      }
    }
    // ------------------------------------- receiving all menu from api
    useEffect(() => {
      if (props.receivedData.length > 0) {
        setIsLoaded(true);
        setReceivedData(props.receivedData);
      }
    },[props.receivedData, selectedMenu])

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Card elevation={2} sx={{ marginTop: '1em'}}>
            <Grid container sx={{ height: '2em', padding: '3ps 3px', minWidth: '900px', bgcolor: 'darkgreen', textAlign: 'center', color: 'white'}}>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={2}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1.5}>
                <Typography>Category</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1.5}>
                <Typography>Sub_Category</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1}>
                <Typography>Price</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1}>
                <Typography>Stock</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1}>
                <Typography>Caption</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={3}>
                <Typography>Description</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px'}} xs={1}>
                <Typography>Edit</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{ maxHeight: '80vh', overflow: 'auto'}}>
                {receivedData.map((menu, i) => (
                  <Grid container sx={{ minWidth: '900px', borderBottom: '1px solid lightgray', padding: '3px 0'}} key={i}>
                    <Grid item xs={2} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.name}</Typography>
                    </Grid>
                    <Grid item xs={1.5} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.category}</Typography>
                    </Grid>
                    <Grid item xs={1.5} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.Sub_Category}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>$ {menu.price.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{stockFormatter(menu.stock_availability)}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.caption}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.description}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Button value={menu._id} onClick={modalOpener}>Edit</Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Modal open={modalOpen}>
        <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em'}}>
          <Grid container>
            <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41'}}>
              <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Menu Edit</Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '1em', paddingLeft: '1em'}}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>{name}</Typography>
                  <Typography>{category}</Typography>
                  <Typography>{Sub_Category}</Typography>
                  <Typography>{price}</Typography>
                  <Typography>{stock_availability}</Typography>
                  <Typography>{caption}</Typography>
                  <Typography>{description}</Typography>
                  <Typography>{selectedID}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {console.log(selectedMenu)}
                <Grid item xs={4}>
                  <Button variant='outlined' onClick={modalCloser} sx={{ width: '100%'}}>Close</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant='contained' onClick={modalCloser} sx={{ width: '100%'}}>Update</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={modalCloser} sx={{ width: '100%'}}>Delete</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </ThemeProvider>
  )
}
export default EditMenu;