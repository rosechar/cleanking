import React from "react";
import {
  TextField,
  Button,
  Stack,
  Box,
  Grid,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography
} from "@mui/material";
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { compareAsc, format } from "date-fns";


function ListView({apts, openUpdateForm, handleDelete}) {
  return (
  <Stack direction="column" spacing={2} pb={5} minHeight={"100vh"}>
          
  {apts.sort((a, b) => {return compareAsc(new Date(a.apt), new Date(b.apt))}).map((item) => {
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
            <Grid container sx={{ mt: 2 }} direction={{ xs: "column", sm: "row" }} justifyContent="space-evenly" alignContent="center" spacing={2}>
              <Stack direction="row" spacing={1}>
                <Typography> <CalendarIcon sx={{ fontSize: 20 }} /> </Typography>
                <Typography variant={"body2"}> {item.appointment} </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant={"body2"}> <EmailIcon sx={{ fontSize: 20 }} /></Typography>
                <Typography variant={"body2"}> {item.email} </Typography>
              </Stack>
              <Stack  direction="row" spacing={1}>
                <Typography variant={"body2"}> <PhoneIcon sx={{ fontSize: 20 }} /> </Typography>
                <Typography variant={"body2"}> {item.phone} </Typography>
              </Stack>
              {(item.details) ?
              <Stack  direction="row" spacing={1}>
                <Typography variant={"body2"}> <InfoIcon sx={{ fontSize: 20 }} /> </Typography>
                <Typography variant={"body2"}> {item.details} </Typography>
              </Stack> : <></>}
            </Grid>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button size="small" color="inherit" onClick={() => openUpdateForm(item)}>Update</Button>
            <Button size="small" color="error" onClick={() => handleDelete(item.id, item.apt)}>Delete</Button>
          </AccordionActions>
        </Accordion>
      </div>);
    })}
  </Stack>
  )
};

export default ListView;