import { Typography, Backdrop, CircularProgress, Stack, Box, Button, Link, Alert, Snackbar } from "@mui/material";
import React from "react";
import SuccessIcon from '@mui/icons-material/DoneAll';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmailForm from "../components/email";
import ScheduleForm from "../components/scheduleForm";
import { defaultFormValues, getAvailableDays } from "../utility/formUtils";


export default function Schedule() {
    const [formComplete, setFormComplete] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [emailStatus, setEmailStatus] =  React.useState(false);
    const [formError, setFormError] = React.useState(false);
    const [formValues, setFormValues] = React.useState(defaultFormValues)
    React.useEffect(() => {
      getAvailableDays().then((days) =>    
      setFormValues(current => ({
        ...current,
        time: {
          value:days[0],
          options:days
        },
      })));
  
      }, []);
  
    React.useEffect(() => {
        handleBackdropClose();
      }, [emailStatus]);
  
    const handleAlertClose = () => {
      setFormError(false);
    };
    const updateFormStatus = (formComplete) => {
        setFormComplete(formComplete);
      }
      const handleBackdropClose = () => {
        setLoading(false);
      };
      React.useEffect(() => {
        handleBackdropClose();
        }, [formComplete]);
        return (
            <React.Fragment>
              <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={loading}
                  onClick={handleBackdropClose}
              >
                  <CircularProgress color="inherit" />
              </Backdrop>
                <Stack direction={{ sm: 'column', md: 'row' }} mt={{ xs: 2, md: 5 }}  height={{ sm: "auto", md: 450 }} justifyContent="center" alignItems="center" alignContent="center">
                    {formComplete ? 
                    <Stack  justifyContent="center" m={3}>
                        <Typography align="center">
                        <SuccessIcon sx={{ fontSize: 100 }}/>
                            <CalendarIcon sx={{ fontSize: 100 }} />
                        </Typography>
                        <Typography  mt={3} mb={8} variant="h5" fontWeight={1} align="center" >
                            Thank you for booking a detail service, we look forward to seeing you. 
                        </Typography> 
                        <Typography color="text.primary" underline="none" component={Link} href="/cancel" variant="body2" fontWeight={1} align="center" >
                            If you need to cancel, click here
                        </Typography> 
                        
                    </Stack>  
                        
                     : 
                    <>
                    <Box width={{xs: 320, md: 450}} pl={{md:3}}>
                        <Typography variant="h4" fontWeight={1} pb={1} textAlign={{xs:"left", md:"left"}}>
                            Book Appointment 
                        </Typography>
                        <Typography variant="body2"  fontWeight={1}  textAlign={{xs:"left", md:"left"}}>
                            Depending on the condition of the car, it may take up to 5 hours to detail. We ask that you bring your car in around 10 AM on the day of your appointment to ensure it is completed by the end of the day.
                        </Typography>
                    </Box>
                    <Box width={{xs: 320, sm:350}} pt={2} pl={{xs:2}} pr={{xs:2}}>
                    {emailStatus?
                    <ScheduleForm formValues={formValues} setFormError={setFormError} setLoading={setLoading} updateFormStatus={updateFormStatus} setFormValues={setFormValues}></ScheduleForm>
                    : <EmailForm formValues={formValues} setFormError={setFormError} formError={formError} setLoading={setLoading} setFormValues={setFormValues} setEmailStatus={setEmailStatus}></EmailForm>
                    }
                    </Box>
                        
                        </>
}
                </Stack>
            </React.Fragment>
        );
};