import React, { useEffect } from "react";
import exterior1Img from './images/exterior1.jpg';
import tireImg from './images/tire2.jpg';
import toolImg from './images/tool1.jpg';
import washing2Img from './images/washing2.jpg';
import washingImg from './images/washing.jpg';
import Image from 'next/image'
import CalendarView from './calendar'
import ListView from './list'
import Customers from './customers'
import Settings from './settings'
import {
  Typography,
  Stack,
  Fade,
  Box
} from "@mui/material";

function AdminDetails({ option, data, handleDelete, openUpdateForm, search }) {
    switch (option) {
        case 'list':
            return (
                <React.Fragment>
                    {(data && data.length > 0) ? <>
                        <ListView apts={data} handleDelete={handleDelete} openUpdateForm={openUpdateForm}></ListView>
                        </>
                    :<> { (search) ? <Typography pt={4} sx={{textAlign:"center"}}>No matching appointments</Typography> 
                    : <Typography pt={4} sx={{textAlign:"center"}}>There are currently no upcoming appointments</Typography>}
                    </>}
                </React.Fragment>
            );
        case 'calendar':
            return (
                <Box pb={5} minHeight={"50vh"}><CalendarView apts={data}></CalendarView> </Box>
            );
        case 'customers':
            return (
                <React.Fragment> <Customers apts={data}></Customers> </React.Fragment>
            );
        case 'settings':
            return(
            <React.Fragment> <Settings></Settings></React.Fragment>
            );
        default:
            break;
    }
    
    
};

export default AdminDetails;