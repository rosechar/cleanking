import React from "react";
import {
  TextField,
  Button,
  Stack,
  Box,
  Grid
} from "@mui/material";
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import {TimeGridHeader} from "react-big-calendar/lib/TimeGridHeader"
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from './customToolbar'

const locales = {
    'en-US': enUS,
    }
    
const localizer = dateFnsLocalizer({
format,
parse,
startOfWeek,
getDay,
locales,
})

function CalendarView({apts, openUpdateForm}) {
    const [events, setEvents] = React.useState<Event[]>(apts.map((apt) => ({ title: apt.name, start: new Date(apt.apt), end: new Date(apt.apt), resource: apt })))
    React.useEffect(() => {
        setEvents(apts.map((apt) => ({ title: apt.name, start: new Date(apt.apt), end: new Date(apt.apt), resource: apt })));
      }, [apts])

    function handleClick(event) {
        openUpdateForm(event.resource);
    }
  return (
    <React.Fragment>
        <Grid container direction="row"
  justifyContent="center"
  alignItems="center" fontSize={10} fontWeight={1} pl={2} pr={2}>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={event => handleClick(event)}
        components={{ toolbar: CustomToolbar }}
        style={{ height: '70vh', width:'90vh'}}
        views={['month']}
        />
        </Grid>
    </React.Fragment>
  );
};

export default CalendarView;