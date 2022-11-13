import React, { useEffect } from "react";
import CalendarView from './calendar'
import ListView from './list'
import Customers from './customers'
import Settings from './settings'
import {
  Typography,
  Box
} from "@mui/material";

function AdminDetails({ option, apts, openUpdateForm, search, setLoading, handleDelete }) {
    switch (option) {
        case 'list':
            return (
                <React.Fragment>
                    {(apts && apts.length > 0) ? <>
                        <ListView apts={apts} openUpdateForm={openUpdateForm} handleDelete={handleDelete}></ListView>
                        </>
                    :<> { (search) ? <Typography pt={4} sx={{textAlign:"center"}}>No matching appointments</Typography> 
                    : <Typography pt={4} sx={{textAlign:"center"}}>There are currently no upcoming appointments</Typography>}
                    </>}
                </React.Fragment>
            );
        case 'calendar':
            return (
                <Box pb={5} minHeight={"50vh"}><CalendarView apts={apts} openUpdateForm={openUpdateForm}></CalendarView> </Box>
            );
        case 'customers':
            return (
                <React.Fragment> <Customers setLoading={setLoading} apts={apts}></Customers> </React.Fragment>
            );
        case 'settings':
            return(
            <React.Fragment> <Settings setLoading={setLoading}></Settings></React.Fragment>
            );
        default:
            break;
    }
    
    
};

export default AdminDetails;