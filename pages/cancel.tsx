import { Typography, Backdrop, CircularProgress, Stack, Box, Button, Link, TextField, Snackbar, Alert } from "@mui/material";
import React from "react";
import SuccessIcon from '@mui/icons-material/DoneAll';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import ReCAPTCHA from "react-google-recaptcha";


export default function Cancel() {
    const [cancelComplete, setCancelComplete] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [cancelError, setCancelError] = React.useState(false);
    const [cancelNotFound, setCancelNotFound] = React.useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
        let emailError = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        (emailError) ? setEmailError(false) : setEmailError(true);
    }

    const reRef = React.useRef<ReCAPTCHA>();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        setLoading(true);
        const token = await reRef.current.executeAsync();
        reRef.current.reset();
        const response = await fetch(`/api/customers/${email.toLowerCase()}?token=${token}`);
        if (!response.ok) {
            console.log("ERROR");
        }
        const data = await response.json();
        
        if (data.length > 0) {
            const deleteResponse = await fetch(`/api/appointments/book/?id=${data[0].id}&apt=${data[0].apt}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              if (!deleteResponse.ok) {
                console.log("ERROR");
                setCancelError(true)
              }
            setLoading(false);
            setCancelComplete(true);
        }
        else {
            setLoading(false);
            setCancelNotFound(true);
        }

        
      }
    }
    return (
        <React.Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={() => setLoading(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar anchorOrigin={{vertical:'top', horizontal: 'center'}} open={cancelNotFound} autoHideDuration={5000} onClose={() => setCancelNotFound(false)}>
                <Alert onClose={() => setCancelNotFound(false)} severity="error" >
                    No appointments found associated with that email address
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical:'top', horizontal: 'center'}} open={cancelError} autoHideDuration={5000} onClose={() => setCancelError(false)}>
                <Alert onClose={() => setCancelError(false)} severity="error" >
                    There was an error cancelling your appointment, please try again or call to cancel
                </Alert>
            </Snackbar>
            <Stack direction={{ sm: 'column', md: 'row' }} mt={{ sm: 0, md: 4 }}  height={{ sm: "auto", md: 450 }} justifyContent="center" alignItems="center" alignContent="center">
                {cancelComplete ? 
                <Box m={5} ml={{ xs: 5, sm: 0}}>
                    <Typography align="center">
                    <SuccessIcon sx={{ fontSize: 100 }}/>
                        <CalendarIcon sx={{ fontSize: 100 }} />
                    </Typography>
                    <Typography width={{xs: 300, md: 450}} mt={3} variant="h5" fontWeight={1} align="center" >
                        Your appointment has been cancelled, we hope to see you sometime soon!
                    </Typography> 
                </Box> : 
                <><Box pt={3} pl={{md:3}} width={{xs: 320, md: 450}}>
                        <Typography variant="h4" pb={1} fontWeight={1}>
                            Cancel an appointment
                        </Typography>
                        <Typography variant="body1" fontWeight={1} >
                            No worries, just enter your email and we will cancel your appointment.
                        </Typography>
                    </Box>
                    <Stack width={{xs:320, sm:350}} direction="column" component="form" noValidate onSubmit={handleSubmit} pl={2} pr={2}>
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} size="invisible" ref={reRef} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                            error={emailError}
                            helperText={emailError && "Please enter a valid email address"}
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor:"#ba000d", color:"text.primary","&:hover": {backgroundColor: "#8e0000"} }}
                            >
                            Continue
                            </Button>
                        <Typography fontSize={10}>This site is protected by reCAPTCHA and the Google <Link underline="none" color="inherit" href="https://policies.google.com/privacy">Privacy Policy</Link> and <Link underline="none" color="inherit" href="https://policies.google.com/terms">Terms of Service</Link> apply.</Typography>
                    </Stack>
                    
                    </>
}
            </Stack>
        </React.Fragment>
    );
};