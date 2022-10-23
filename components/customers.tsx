import type { Customer } from '../interfaces/customer'
import useSwr, { mutate } from 'swr'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionActions, AccordionDetails, Grid, AccordionSummary, Backdrop, Box, Button, CircularProgress, Divider, Stack, Toolbar, Typography } from '@mui/material'
import { compareAsc, format } from 'date-fns';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'


export default function Customers({apts}) {
  const { data: session } = useSession();
  let custos = apts.reduce((m, obj) => {
    if (m[obj.id]) {
      m[obj.id].push(obj)
    }
    else {
      m[obj.id] = [obj];
    }
    return m;
}, new Map());
  console.log(custos)
  if (!session) return <><Typography sx={{textAlign:"center", mt:5}} >Sign in to view customers</Typography></>
  return (    
    <React.Fragment>
      <Grid container >
        {/* {custos.forEach((value, key) => {
          return (
            <Grid item key={key}>
              
            </Grid>
          )
        })} */}
      </Grid>
      
    </React.Fragment>
)
}
