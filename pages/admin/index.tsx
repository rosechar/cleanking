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
  if (!session) return <><Typography sx={{textAlign:"center", mt:5}} >Sign in to view appointments</Typography></>
  if (error) return <><Typography sx={{textAlign:"center", mt:5}} >Failed to load appointments</Typography></>
  if (!data) return <Typography sx={{textAlign:"center", mt:5}}>Loading...</Typography>
  return (    
      <><Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      onClick={handleBackdropClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop><Stack direction="column" spacing={2} mb={3}>
        
        {(data.length > 0) ? data.map((item) => {
          return (
            <div key={item.apt}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"

                >
                  <Typography sx={{ fontWeight: 1, width: "80%" }} variant={"body2"}>{item.name}</Typography>
                  <Typography variant={"body2"}>{format(new Date(item.apt), 'MM/dd/yy')}</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Stack sx={{ mt: 2 }} direction={{ sm: "column", md: "row" }} spacing={2}>
                    <Stack width={"33%"} direction="row" spacing={1}>
                      <Typography> <CalendarIcon sx={{ fontSize: 20 }} /> </Typography>
                      <Typography variant={"body2"}> {item.appointment} </Typography>
                    </Stack>
                    <Stack width={"33%"} direction="row" spacing={1}>
                      <Typography variant={"body2"}> <EmailIcon sx={{ fontSize: 20 }} /></Typography>
                      <Typography variant={"body2"}> {item.email} </Typography>
                    </Stack>
                    <Stack width={"33%"} direction="row" spacing={1}>
                      <Typography variant={"body2"}> <PhoneIcon sx={{ fontSize: 20 }} /> </Typography>
                      <Typography variant={"body2"}> {item.phone} </Typography>
                    </Stack>
                  </Stack>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button size="small" color="error" onClick={() => handleDelete(item.id, item.apt)}>Delete</Button>
                </AccordionActions>
              </Accordion>
            </div>);
        }) :
        <Typography sx={{textAlign:"center"}}>There are currently no upcoming appointments</Typography>}
      </Stack></>
)
}
