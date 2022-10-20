import type { Customer } from '../interfaces/customer'
import useSwr from 'swr'
import Link from 'next/link'
import { Button, Chip, Divider, Grid, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import ExteriorIcon from '@mui/icons-material/LocalCarWashOutlined';
import InteriorIcon from '@mui/icons-material/CleaningServicesOutlined';
import ComboOutline from '@mui/icons-material/NoCrashOutlined';
import ServiceDetails from "../components/serviceDetails";


export default function Services() {

    const [selected, setSelected] = React.useState("exterior");
    const [color, setColor] = React.useState({
        'exterior': true,
        'interior': false,
        'combo': false
    })
    function handleClick(option) {
        setSelected(option);
        let newColor = {
          'exterior': false,
          'interior': false,
          'combo': false
        }
        newColor[option] = true;
        setColor(newColor);
        
        
      };
    return (
            <React.Fragment>
            <Stack direction="column" justifyContent="center" >
            <Stack sx={{ justifyContent: 'space-between' }} direction={{ sm: 'column', md: 'row' }} alignItems="center">
                <Typography margin={2} variant="h4" fontWeight={1} pl={2}>
                    Services
                </Typography>
                <Stack sx={{ justifyContent: 'space-evenly' }} margin={2} direction="row" rowGap={1} spacing={1} flexWrap="wrap" >
                <Chip icon={<ExteriorIcon/>} label="Exterior Detail" variant="outlined" color={color.exterior ? 'primary' : 'default'} onClick={() => handleClick("exterior")}  />
                <Chip  icon={<InteriorIcon/>} label="Interior Detail" variant="outlined" color={color.interior ? 'primary' : 'default'} onClick={() => handleClick("interior")}  />
                <Chip icon={<ComboOutline/>} label="Combo" variant="outlined" color={color.combo ? 'primary' : 'default'} onClick={() => handleClick("combo")} />                </Stack>
            </Stack>
            
            <ServiceDetails option={selected} ></ServiceDetails>
            
            <Button href="/contact" sx={{textAlign:"center", color:"text.secondary", m:3}} variant="outlined" size="large"> Schedule A Detail Service For As Soon As Tomorrow </Button>

            </Stack>
        </React.Fragment>
  )
}
