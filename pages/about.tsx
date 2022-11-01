import { createTheme, Divider, Grid, Stack, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
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
  createData('Thur', "9", "6", false),
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
            {/* <Stack>
              {rows.map((day) => {
                return (
                  <>
                  <Stack direction="row" spacing={10} justifyContent="right">
                  <Typography>
                    {day.day}
                  </Typography>
                  <Typography>
                    {day.open}
                  {(!day.closed) ? 
                  <>-{day.close} </>: <></>}
                  </Typography>
                  <Divider></Divider>
                  </Stack>
                    </>
                )
              })}
            </Stack> */}
          </Stack>
            
        </React.Fragment>
        </ThemeProvider>
  )
}
