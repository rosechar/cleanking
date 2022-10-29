import React, { useEffect } from "react";
import exterior1Img from './images/exterior1.jpg';
import tireImg from './images/tire2.jpg';
import toolImg from './images/tool1.jpg';
import washing2Img from './images/washing2.jpg';
import washingImg from './images/washing.jpg';
import ArrowIcon from '@mui/icons-material/ArrowRightOutlined';
import Image from 'next/image'
import {
  Typography,
  Stack,
  Grid,
  Divider,
  Box,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Button
} from "@mui/material";

const DetailOptions = {
    interior: {
        title: 'Interior Detail',
        details: ['Upholstery Vacuumed & Shampooed','Carpets Vacuumed & Shampooed','Dashboard Cleaned & Conditioned','Door Panels Cleaned & Conditioned','Instrument Panel Cleaned','Air Vents cleaned','Leather Seats Cleaned & Conditioned','All Glass Cleaned (Interior Only)','Vacuum Interior & Trunk'],
        img: toolImg,
        price:'$100'
    },
    full: {
        title: 'Full Detail',
        details: ['Exterior Wash','Chamois Dry','Clean Door Jambs','Clean & Condition Tires','Clean Wheels','All Glass Cleaned (Interior & Exterior)','Spray Wax'],
        img: tireImg,
        price:'$130'
    },
    deluxe: {
        title: 'Deluxe Detail',
        details: ['Vacuum Trunk','Clean Trunk Channels','Clean & Condition Engine Bay'],
        img: washing2Img,
        price:'$150'
    },
    spiffy: {
        title: 'Spiffy Detail',
        details: ['Exterior Wash','Interior Vacuum','Interior Glass Cleaned'],
        img: washing2Img,
        price:'$35'
    },
    alacarte: {
        title: 'A La Carte Services',
        details: ['Clay Bar / Wax', 'Clay Bar / Buff / Wax',],
        img: washing2Img,
        price:'$60/$100'
    }
  };

function ServiceDetails({ option }) {
    return (
        <React.Fragment>
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <Box  textAlign="center" pt={1}>
            <Typography variant="h5" fontWeight={1} >{DetailOptions[option].title} - {DetailOptions[option].price} </Typography>
            {(option==="deluxe") ? <Typography fontWeight={1} variant="overline">Includes all Full Services plus... </Typography> : <></>}
            {(option==="full") ? <Typography fontWeight={1} variant="overline">Includes all Interior Services plus... </Typography> : <></>}
            </Box>
            <Grid container width={{xs:320, md: 900}} pl={{md:6}} pt={1} >
            {DetailOptions[option].details.map((detail) => {
                return (
                    <Grid item xs={12} md={6} key={detail}>
                    <ListItem disablePadding >
                        <ListItemIcon sx={{minWidth:"40px"}} >
                            <ArrowIcon sx={{ color: "#ba000d" }}  />
                        </ListItemIcon>  
                        <ListItemText sx={{margin:0}} primary={<Typography fontSize={{xs:".8rem", md:".9rem"}}  fontWeight={1} variant="overline" lineHeight={0}>  {detail} </Typography>} />
                    </ListItem>
                    </Grid>
                )
            })}
            </Grid>
            <Typography sx={{color:"#ba000d"}}variant="overline" fontSize="2rem" fontStyle={"italic"} fontWeight={1}> Keep it clean! </Typography>

        </Grid>
        <Box height={300} position="relative">
        <Image layout="fill" objectFit="cover" src={DetailOptions[option].img} />
        </Box>
        </React.Fragment>
    );
    
};

export default ServiceDetails;