import type { Customer } from '../interfaces/customer'
import useSwr from 'swr'
import Link from 'next/link'
import { Button, Chip, createTheme, Divider, Grid, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import ExteriorIcon from '@mui/icons-material/LocalCarWashOutlined';
import InteriorIcon from '@mui/icons-material/CleaningServicesOutlined';
import ComboOutline from '@mui/icons-material/NoCrashOutlined';
import ServiceDetails from "../components/serviceDetails";

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
function createData(day, open, close, closed) {
  return { day, open, close, closed };
}

const rows = [
  createData('Mon', "9", "6", false),
  createData('Tue', "9", "5:30", false),
  createData('Wed', "9", "5:30", false),
  createData('Thur', "9", "6", false)
];
const rows2 = [
  createData('Fri', "9", "5", false),
  createData('Sat', "9", "12", false),
  createData('Sun', "CLOSED", "", true)
];
export default function Services() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Stack mt={3} alignItems="center">
            <Typography variant="h4" fontWeight={1}>About Us</Typography>
            <Divider><Typography variant="overline" fontWeight={1}>Hours</Typography></Divider>
            <Grid>

            </Grid>
          </Stack>
            
        </React.Fragment>
        </ThemeProvider>
  )
}
