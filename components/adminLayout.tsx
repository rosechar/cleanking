import React from "react";
import {
  Toolbar,
  Typography,
  Stack,
  Link,
  Box,
  Button,
  Grid,
  TextField,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import CustomerIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#ba000d',
    },
  },
});

export default function AdminLayout({ children, setNewForm, setView, view, search, handleSearchChange }) {
  const { data: session } = useSession();

  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <Box sx={{minHeight:"100vh", position: "relative"}}>
      <Box pb={"4rem"}>
      <Grid
  container
  direction="row"
  justifyContent="space-between"
  alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider', padding:2 }}>
      <Grid item >
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
      </Grid>
      <Grid item mr={1}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          {session ? <><Button sx={{alignContent:"right"}} onClick={() => signOut()}> <Typography color="secondary" lineHeight={1} fontSize={{xs:".8rem", sm:"1rem"}}>Sign Out </Typography></Button>
          </> :
          <Button onClick={() => signIn()}><Typography color="secondary" lineHeight={1} fontSize={{xs:".8rem", sm:"1rem"}}> Sign In</Typography> </Button>}
        </Grid>
      </Grid>
      </Grid>
        
      <main>{children}</main>
      </Box>
      <Grid sx={{backgroundColor:"#121212"}} container bottom={0} padding={1}  direction={{xs:"column-reverse", sm:"row"}}  position={"fixed" } alignItems="center" justifyContent="space-between">
        {session ? 
        <><Grid item ml={1} mb={{sm:2}}>
            <Button onClick={() => { setNewForm(true) } } sx={{ color: '#ffffff', minWidth: {xs:"40px", sm:"50px"} }}>
              <AddIcon  ></AddIcon>
            </Button>
            <Button onClick={() => { setView("list"); } } sx={{ minWidth: {xs:"40px", sm:"50px"} }}>
              <ListIcon color={(view === "list") ? "secondary" : "primary"} ></ListIcon>
            </Button>
            <Button onClick={() => { setView("calendar"); } } sx={{ minWidth: {xs:"40px", sm:"50px"}}}>
              <CalendarIcon color={(view === "calendar") ? "secondary" : "primary"} ></CalendarIcon>
            </Button>
            <Button onClick={() => { setView("customers"); } } sx={{ minWidth: {xs:"40px", sm:"50px"} }}>
              <CustomerIcon color={(view === "customers") ? "secondary" : "primary"} ></CustomerIcon>
            </Button>
            <Button onClick={() => { setView("settings") } } sx={{ minWidth: {xs:"40px", sm:"50px"} }}>
              <SettingsIcon color={(view === "settings") ? "secondary" : "primary"} ></SettingsIcon>
            </Button>
          </Grid>
          <Grid item mr={{sm: 3}} height={55} >
            {(view === "list") ? <TextField
                sx={{ width: { xs: 250, sm: 300}}}
                id="search"
                label="Search"
                name="search"
                size="small"
                value={search}
                onChange={handleSearchChange} /> : <></>}
              
            </Grid></> 
            :<></>}
        
      </Grid>
      </Box>
    </React.Fragment>
    </ThemeProvider>

    
  );
};