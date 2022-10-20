import type { Customer } from '../../interfaces/customer'
import useSwr, { mutate } from 'swr'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionActions, AccordionDetails, Link, AccordionSummary, Backdrop, Box, Button, CircularProgress, Divider, Stack, Toolbar, Typography } from '@mui/material'
import { format } from 'date-fns';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Admin() {
  const { data, error, mutate } = useSwr<Customer[]>('/api/appointments', fetcher);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { data: session } = useSession();

  const handleBackdropClose = () => {
    setLoading(false);
  };
  const handleDelete = async (id, apt) => {
    setLoading(true);
    const response = await fetch(`/api/appointments/book/?id=${id}&apt=${apt}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      console.log("ERROR");
    }
    setLoading(false);
    let newData = data.filter((x) => x.id != id);
    mutate(newData);


  }
  if (!session) return <><Typography sx={{textAlign:"center", mt:5}} >Sign in to view customers</Typography></>
  if (error) return <><Typography sx={{textAlign:"center", mt:5}} >Failed to load customers</Typography></>
  if (!data) return <Typography sx={{textAlign:"center", mt:5}}>Loading...</Typography>
  return (    
      <><Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      onClick={handleBackdropClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Stack direction="column" spacing={2} mb={3}>
      
      </Stack></>
)
}
