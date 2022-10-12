import React from "react";
import {
  Toolbar,
  Typography,
  Stack,
  Link,
  Box,
  Button
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";



export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', padding:1, justifyContent: "space-between" }}>
      <Stack direction={"row"} >
        <Link
        href="/admin"
        variant="h4"
        color="inherit"
        underline="none"
        fontSize={{xs:"1.225rem", sm:"2.125rem"}}
        sx={{  fontWeight:1, pl:1, pr: 1}}
      >
        Clean King Admin
        
      </Link>
        </Stack>
        <Box>
          <Button href="/admin/newApt"> New Appointment</Button>
        </Box>
        </Toolbar>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: "space-evenly" }}>
          <Link href="/" underline="none"  color="inherit">
            <Typography variant='overline'> Appointments</Typography>
          </Link>
          <Link href="/admin/customers" underline="none" color="inherit">
            <Typography variant='overline'> Customers </Typography>

          </Link>
          <Link href="/admin/settings" underline="none"  color="inherit">
            <Typography variant='overline'> Settings </Typography>
          </Link>
        </Toolbar>
        
      <main>{children}</main>
      <Toolbar sx={{ borderColor: 'divider', padding:1, justifyContent: "space-between" }}>
      <Stack direction={"column"} >
        {session ? <Button onClick={() => signOut()}> Sign Out </Button> :
        <Button onClick={() => signIn()}> Sign In </Button>}
        
        </Stack>
      </Toolbar>
    </React.Fragment>

    
  );
};