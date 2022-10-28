import type { Customer } from '../interfaces/customer'
import useSwr from 'swr'
import Link from 'next/link'
import { Button, Chip, createTheme, Box, Grid, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import ExteriorIcon from '@mui/icons-material/LocalCarWashOutlined';
import InteriorIcon from '@mui/icons-material/CleaningServicesOutlined';
import ComboOutline from '@mui/icons-material/NoCrashOutlined';
import ServiceDetails from "../components/serviceDetails";
import { useRouter } from 'next/router'
import ScheduleIcon from '@mui/icons-material/EventAvailableOutlined';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#ba000d',
    },
  },
});
export default function Services() {
    const router = useRouter()
    const defaultSelection = {
      'interior': false,
      'full': false,
      'deluxe': false,
      'spiffy': false,
      'alacarte': false
    }
    const [selected, setSelected] = React.useState("interior");
    const [color, setColor] = React.useState({
      'interior': true,
      'full': false,
      'deluxe': false,
      'spiffy': false,
      'alacarte': false
    })
    let service = ''
    React.useEffect(() => {
      if (router.isReady) {
        service = router.asPath.split('=')[1];
        if (service) {
          console.log(service);
          setSelected(service)
          let newSelection = defaultSelection;
          newSelection[service] = true;
          setColor(newSelection);
        }
      }
    }, [router.isReady]);

    function handleClick(option) {
        setSelected(option);
        let newSelection = defaultSelection;
        newSelection[option] = true;
        setColor(newSelection);
        
        
      };
    return (
      <ThemeProvider theme={theme}>
            <React.Fragment>
            <Stack direction="column" justifyContent="center" spacing={2} >
            <Stack sx={{ justifyContent: 'space-between' }} direction={{ sm: 'column', md: 'row' }} alignItems="center">
                <Typography variant="h4" p={2} fontWeight={1} pl={2}>
                    Services
                </Typography>
                <Stack sx={{ justifyContent: 'space-evenly' }}  p={{md:2}} direction="row" rowGap={1} spacing={1} flexWrap="wrap" >
                <Chip  icon={<InteriorIcon/>} label="Interior Detail" variant="outlined" color={color.interior ? 'secondary' : 'default'} onClick={() => handleClick("interior")}  />
                <Chip icon={<ExteriorIcon/>} label="Full Detail" variant="outlined" color={color.full ? 'secondary' : 'default'} onClick={() => handleClick("full")}  />
                <Chip icon={<ComboOutline/>} label="Deluxe Detail" variant="outlined" color={color.deluxe ? 'secondary' : 'default'} onClick={() => handleClick("deluxe")} />    
                <Chip icon={<ComboOutline/>} label="Spiffy Detail" variant="outlined" color={color.spiffy ? 'secondary' : 'default'} onClick={() => handleClick("spiffy")} />                
                <Chip icon={<ComboOutline/>} label="A La Carte Services" variant="outlined" color={color.alacarte ? 'secondary' : 'default'} onClick={() => handleClick("alacarte")} />                            
                </Stack>
            </Stack>
            
            <ServiceDetails option={selected} ></ServiceDetails>
            <Box p={2} display="flex" justifyContent="center">
            <Button href="/contact" sx={{textAlign:"center", color:"text.secondary", borderColor:"gray"}} variant="outlined" size="large" > Schedule a Detail Service For As Soon As Tomorrow </Button>
            </Box>
            </Stack>
        </React.Fragment>
        </ThemeProvider>
  )
}
