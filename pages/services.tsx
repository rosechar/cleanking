import { Button, Chip, createTheme, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import ExteriorIcon from '@mui/icons-material/LocalCarWashOutlined';
import InteriorIcon from '@mui/icons-material/CleaningServicesOutlined';
import DeluxeIcon from '@mui/icons-material/NoCrashOutlined';
import SpiffyIcon from '@mui/icons-material/MinorCrashOutlined';
import ServiceDetails from "../components/serviceDetails";
import { useRouter } from 'next/router'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material/styles';
import Head from 'next/head';


export default function Services() {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            secondary: {
              main: '#ba000d',
            }
          },
        },
        dark: {
          palette: {
            secondary: {
              main: '#ba000d',
            }
          },
        },
      },
    });
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
      <CssVarsProvider theme={theme}>
            <React.Fragment>
            <Stack direction="column" justifyContent="center" spacing={2} >
            <Stack sx={{ justifyContent: 'space-between' }} direction={{ sm: 'column', md: 'row' }} alignItems="center">
                <Typography variant="h4" p={2} fontWeight={1} pl={2}>
                    Services
                </Typography>
                <Stack sx={{ justifyContent: 'space-evenly' }}  p={{md:2}} direction="row" rowGap={1} spacing={1} flexWrap="wrap" >
                <Chip  icon={<InteriorIcon/>} label="Interior Detail" variant="outlined" color={color.interior ? 'secondary' : 'default'} onClick={() => handleClick("interior")}  />
                <Chip icon={<ExteriorIcon/>} label="Full Detail" variant="outlined" color={color.full ? 'secondary' : 'default'} onClick={() => handleClick("full")}  />
                <Chip icon={<DeluxeIcon/>} label="Deluxe Detail" variant="outlined" color={color.deluxe ? 'secondary' : 'default'} onClick={() => handleClick("deluxe")} />    
                <Chip icon={<SpiffyIcon/>} label="Spiffy Detail" variant="outlined" color={color.spiffy ? 'secondary' : 'default'} onClick={() => handleClick("spiffy")} />                
                <Chip icon={<SpiffyIcon/>} label="A La Carte Services" variant="outlined" color={color.alacarte ? 'secondary' : 'default'} onClick={() => handleClick("alacarte")} />                            
                </Stack>
            </Stack>
            
            <ServiceDetails option={selected} ></ServiceDetails>
            <Box p={2} pb={3} display="flex" justifyContent="center">
            <Button href="/schedule" sx={{textAlign:"center", color:"text.secondary", borderColor:"gray"}} variant="outlined" size="large" > Schedule a Detail Service For As Soon As Tomorrow </Button>
            </Box>
            </Stack>
        </React.Fragment>
        </CssVarsProvider>
  )
}
