import { useState, useEffect } from 'react';
import AddOn from './AddOn';
import OrderDetails from './OrderDetails';
import PaymentSetting from './PaymentSetting';
import OrderFinal from './OrderFinal';
import OrderResult from './OrderResult';
// TODO: import use navigate to home

// Mui
import { Button, Card, Grid, Typography, FormGroup, FormControlLabel, Checkbox, Stepper, Step, StepButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Confirmation = (props) => {
  // States
  const [ finalCart, setFinalCart ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ addOns, setAddOns ] = useState([]);
  const [ removeItem, setRemoveItem ] = useState('');
  const [ sauceOpen, SetSauceOpen ] = useState(false);
  const [ drinkOpen, SetDrinkOpen ] = useState(false);
  const [ termsCondition, setTermsCondition ] = useState(false);
  
  // MUI Steps
  const [ activeStep, setActiveStep ] = useState(0);
  const [ completed, setCompleted ] = useState({});
  
  // Add on states
  const [ spMayoQty, setSpMayoQty ] = useState(0);
  const [ soyQty, setSoyQty ] = useState(0);
  const [ eelQty, setEelQty ] = useState(0);
  const [ gingerQty, setGingerQty ] = useState(0);
  
  // Calc Total
  const [ subTotal, setSubTotal ] = useState();
  const [ tax, setTax ] = useState();
  const [ creditCardFee, setCreditCardFee ] = useState();
  const [ grandTotal, setGrandTotal ] = useState();

  // Handlers

  const sauceOpenHandler = (e) => {
    SetSauceOpen(!sauceOpen);
  }

  const drinkOpenHandler = (e) => {
    SetDrinkOpen(!drinkOpen);
  }
  
  const checkHandler = (e) => {
    console.table(props.allItem.menu)
    console.log(finalCart, spMayoQty, 'spMayo', soyQty, 'soy', eelQty, 'eel', gingerQty, 'ginger' )
  }

  // MUI Steps

  const steps = [
    'Confirmation',
    'Add-On Order',
    'Payment',
    'Order Placement'
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  
  // Addon Handlers
  const addOnSauceHandler = (e) => {
    // have items that is more than 0 qty on soy, sp, eel, ginger, added to a temp array with keys
    // add temp arry to addOn state
    // add addOn state to final Cart
    // make 0 for all sauce qty
    // update displays
  }

  const soyQtyHandler = (e) => {
    setSoyQty(e.target.value);
  }

  const soyAddHandler = (e) => {
    e.preventDefault();
    console.log(soyQty);

    async function addSoyQty() {
      if (soyQty !== 0) {
        await setAddOns([{
          id: "622e4de10a11c87f85a1f448",
          qty: soyQty,
          name: 'Soy Sauce',
          price: 0,
        },...addOns])
      } else {
        addSoyQty()
      }
    }
    addSoyQty()
    // setSoyQty(0);
    console.log(addOns)
  }
  const calcGrandTotal = () => {
    setSubTotal(props.subTotal*1);
    setTax(props.subTotal*0.0875);
    setCreditCardFee(props.subTotal*0.03);
    let allFees = tax+creditCardFee
    let tempTotal = subTotal+allFees
    setGrandTotal(tempTotal);
  }
  
  useEffect(() => {
    async function setFinalCartItems() {
      await setFinalCart({ "Orders": props.cart });
      setDataLoaded(true);
    }
    calcGrandTotal();
    setFinalCartItems();
  },[props.cart, props.subTotal, grandTotal])
  
  console.log(props.subTotal, 'props total', subTotal, 'state total', tax, 'tax', creditCardFee, 'credit fee', grandTotal, 'grandTotal')
  // add modifiy item function - addon , comment
  // add terms of conditions
  // add subtotal
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: '400px', maxWidth: '800px', padding: '3em 3em', margin: '0 auto', backgroundColor: 'rgba(255, 249, 220, 1)', marginTop: '1em' }} >
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ fontFamily: 'Raleway', fontWeight: 'bold', paddingBottom: '.5em', marginBottom: '1em', borderBottom: '2px solid #dc5a41' }}>
            <Typography variant='h4' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>Order Confirmation</Typography>
          </Grid>
          {/* Steps */}
          <Stepper nonLinear activeStep={activeStep} sx={{ marginTop: '.5em', width: '100%'}} alternativeLabel>
            {steps.map((label, i) => (
              <Step key={label} completed={completed[i]}>
                <StepButton color='inherit' onClick={handleStep(i)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {allStepsCompleted() ? (
            <OrderResult />
          ) : activeStep === 0 ? (
            <OrderDetails 
              finalCart={finalCart} 
              subTotal={subTotal} 
              tax={tax} 
              creditCardFee={creditCardFee}
              grandTotal={grandTotal}
              closeConfirmation={props.closeConfirmation}
              handleNext={handleNext}
            />
          ) : activeStep === 1 ? (
            <AddOn />
          ) : activeStep === 2 ? (
            <PaymentSetting />
          ) : (
            <OrderFinal />
          )}
        </Grid>
        <Button onClick={checkHandler}>Check</Button>
      </Card>
    </ThemeProvider>
  );
}
export default Confirmation;