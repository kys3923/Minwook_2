import { useState, useEffect } from 'react';
import AddOn from './AddOn';
import OrderDetails from './OrderDetails';
import PaymentSetting from './PaymentSetting';
import OrderFinal from './OrderFinal';
import OrderResult from './OrderResult';
// TODO: import use navigate to home

// Mui
import { Button, Card, Grid, Typography, FormGroup, FormControlLabel, Checkbox, Stepper, Step, StepButton, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Confirmation = (props) => {
  // States
  const [ finalCart, setFinalCart ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ addOns, setAddOns ] = useState([]);
  const [ removeItem, setRemoveItem ] = useState('');
  const [ sauceOpen, SetSauceOpen ] = useState(false);
  const [ drinkOpen, SetDrinkOpen ] = useState(false);
  const [ termsCondition, setTermsCondition ] = useState(false);
  const [ orderId, setOrderId ] = useState();
  const [ loading, setLoading ] = useState(true);
  
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

  // MUI Steps

  const steps = [
    'Confirmation',
    'Add-On Order',
    'Order Placement',
    'Payment'
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
    if (dataLoaded) {
      setLoading(false);
    }
  },[props.cart, props.subTotal, grandTotal])
  
  return (
    <ThemeProvider theme={theme}>
      { loading ?
        <>
        <LinearProgress sx={{ minWidth: '320px', maxWidth: '800px', margin: '0 auto', padding: '0 3em',  marginTop: '1em' }}/> 
        </> 
      : 
        <Card sx={{ minWidth: '300px', maxWidth: '800px', margin: '0 auto', padding: '0 3em',  marginTop: '1em' }}/> 
      }
      <Card sx={{ minWidth: '300px', maxWidth: '800px', padding: '3em 3em', margin: '0 auto', backgroundColor: 'rgba(255, 249, 220, 1)' }} >
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
              setOrderId={setOrderId}
              orderId={orderId}
              closeConfirmation={props.closeConfirmation}
              handleNext={handleNext}
              setLoading={setLoading}
              loading={loading}
            />
          ) : activeStep === 1 ? (
            <AddOn 
              loading={loading}
              setLoading={setLoading}
              handleBack={handleBack} 
              handleNext={handleNext} 
              orderId={orderId}
              subTotal={subTotal}
              tax={tax}
              creditCardFee={creditCardFee}
              grandTotal={grandTotal}
            />
            ) : activeStep === 2 ? (
              <OrderFinal 
                handleBack={handleBack}
                handleNext={handleNext} 
                orderId={orderId}
                loading={loading}
                setLoading={setLoading}
                subTotal={subTotal}
                tax={tax}
                creditCardFee={creditCardFee}
                grandTotal={grandTotal}
              />
            ) : (
              <PaymentSetting handleBack={handleBack} handleNext={handleNext}/>
          )}
        </Grid>
      </Card>
    </ThemeProvider>
  );
}
export default Confirmation;