import { createTheme, Divider, Grid, Stack, ThemeProvider, Typography } from '@mui/material'
import React from 'react'

function createData(day, open, close, closed) {
  return { day, open, close, closed };
}

const rows = [
  createData('Monday - Friday', "9", "6", false),
  createData('Sat - Sun', "CLOSED", "", true),
];
export default function Services() {
    return (
        <React.Fragment >
          <Stack mt={3} alignItems="center" >
            <Typography variant="h4" fontWeight={1}>About Us</Typography>
            <Typography p={2}>
              ABOUT
            </Typography>
            <Typography variant="overline" >Hours</Typography>
            <Stack  direction="column" width={200}>
              {rows.map((day) => {
                return (
                  <Stack direction="row" justifyContent={"space-between"} key={day.day}>
                  <Typography>
                    {day.day}
                  </Typography>
                  
                  <Typography>
                    {day.open}
                  {(!day.closed) ? 
                  <>-{day.close} </>: <></>}
                  </Typography>
                  </Stack>
                )
              })}
            
            </Stack>
          </Stack>
        </React.Fragment>
  )
}
