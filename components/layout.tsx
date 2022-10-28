import React from "react";
import {
  Toolbar,
  Typography,
  Stack,
  Link,
  Box,
  Button,
  Grid
} from "@mui/material";
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import ScheduleIcon from '@mui/icons-material/EventAvailableOutlined';



export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Box sx={{minHeight:"100vh", position: "relative"}}>
      <Box pb={"4rem"}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', padding:1, justifyContent: "space-between" }}>
      <Stack direction={"column"} >
        <Link
          href="/"
          variant="h4"
          color="inherit"
          underline="none"
          fontSize={{xs:"1.225rem", sm:"2.125rem"}}
          sx={{  fontWeight:1, pl:1, pr: 1, color:"#ba000d"}}
        >
          Clean King
          
        </Link>
        
        </Stack>
        <Box>
          <Button href="/schedule" variant="outlined" size="small" sx={{color:"text.secondary", borderColor:"gray"}} endIcon={<ScheduleIcon/>}> Book Appointment </Button>
        </Box>
        
        </Toolbar>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: "space-evenly" }}>
        <Link href="/contact"color="inherit" underline="none">
          <Typography fontSize={{sm:"1rem"}} variant='overline'> Contact</Typography>
        </Link>
        <Link href="/services"  color="inherit" underline="none">
          <Typography fontSize={{sm:"1rem"}} variant='overline'> Detail Services</Typography>
          
        </Link>
        <Link href="/about" color="inherit" underline="none">
          <Typography fontSize={{sm:"1rem"}} variant='overline'> About </Typography>
        </Link>
      </Toolbar>
      
      
      <main>{children}</main>
      </Box>
      <Grid container bottom={0} mb={2} position={"absolute" } justifyContent={"space-between"}>
        <Typography component={Link} underline="none" href="https://goo.gl/maps/sUBufwUwrzyeocwJ9" sx={{ color:"#ba000d"}} ml={{xs:2, sm:4}} lineHeight={1.5} variant="overline" fontSize={{xs:".75rem", sm:"1rem"}}> 610 W Adrian Street {<br></br>} Blissfield, MI 49228 </Typography>
        <Button sx={{ color:"#ba000d", mr:{xs:2, sm:4}, fontSize:{xs:".9rem", sm:"1.25rem"}}} href="tel:2488528830"> <PhoneIcon sx={{pr:1, fontSize:{xs:"1.5rem", sm:"2rem"}}} > </PhoneIcon>517-682-1919 </Button>
        </Grid>
      </Box>
    </React.Fragment>

    
  );
};