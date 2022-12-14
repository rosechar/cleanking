import { Typography, Stack, Button, Box } from "@mui/material";
import React from "react";
import FacebookIcon from '@mui/icons-material/FacebookOutlined';
import ArrowIcon from '@mui/icons-material/ArrowForwardOutlined';
import ReviewIcon from '@mui/icons-material/RateReviewOutlined';

export default function Contact() {

        return (
            <React.Fragment>
                <Stack  pt={3}  alignItems={"center"} direction="column" spacing={2} >
                    <Typography variant="h4" fontWeight={1} >
                        Contact 
                    </Typography>
                    <Button href="/schedule" endIcon={<ArrowIcon/>} sx={{color:"text.primary", fontSize:"1rem", fontWeight:1}}> Book a new appointment </Button>
                    <Button href="/cancel" endIcon={<ArrowIcon/>} sx={{color:"text.primary", fontSize:"1rem", fontWeight:1}}> Cancel an appointment </Button>
                    <Button href="https://www.facebook.com/people/Clean-King/100063915012506/" endIcon={<FacebookIcon/>} sx={{color:"text.primary", fontSize:"1rem", fontWeight:1}}> Connect with us on facebook </Button>
                    <Button href="https://goo.gl/maps/sUBufwUwrzyeocwJ9" endIcon={<ReviewIcon/>} sx={{color:"text.primary", fontSize:"1rem", fontWeight:1}}> Leave a review on Google  </Button>
                </Stack>
            </React.Fragment>
        );
};