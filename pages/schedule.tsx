import { Typography, Grid, Backdrop, CircularProgress, Stack, Box, Link, Button } from "@mui/material";
import React from "react";
import ContactForm from "../components/contactForm";
import SuccessIcon from '@mui/icons-material/DoneAll';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';


export default function Schedule() {
    const [formComplete, setFormComplete] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
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
                <Stack direction={{ sm: 'column', md: 'row' }} mt={{ xs: 2, md: 4 }}  height={{ sm: "auto", md: 500 }} justifyContent="center" alignItems="center" alignContent="center">
                    {formComplete ? 
                    <Stack  justifyContent="center" m={3}>
                        <Typography align="center">
                        <SuccessIcon sx={{ fontSize: 100 }}/>
                            <CalendarIcon sx={{ fontSize: 100 }} />
                        </Typography>
                        <Typography  mt={3} mb={8} variant="h5" fontWeight={1} align="center" >
                            Thank you for booking a detail service, we look forward to seeing you.
                            
                        </Typography> 
                        <Button href="/cancel" sx={{color:"text.secondary"}}> If you need to cancel click here</Button>
                        
                    </Stack>  
                        
                     : 
                    <><Box pt={2} pl={{md:3}} width={{xs: 320, md: 450}}>
                            <Typography variant="h4" pb={1} fontWeight={1}>
                                Schedule an Appointment
                            </Typography>
                            <Typography variant="body1" fontWeight={1} >
                                Depending on the condition of the car, it may take up to 5 hours to detail. We ask that you bring your car in around 10 AM on the day of your appointment to ensure it is completed by the end of the day.
                            </Typography>
                        </Box>
                        <Box >
                            <ContactForm setLoading={setLoading} handleBackdropClose={handleBackdropClose} updateFormStatus={updateFormStatus}></ContactForm>
                            </Box>
                        
                        </>
}
                </Stack>
            </React.Fragment>
        );
};