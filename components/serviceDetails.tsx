import React, { useEffect } from "react";
import exterior1Img from './images/exterior1.jpg';
import tireImg from './images/tire2.jpg';
import toolImg from './images/tool1.jpg';
import washing2Img from './images/washing2.jpg';
import washingImg from './images/washing.jpg';
import Image from 'next/image'
import {
  Typography,
  Stack,
  Fade,
  Box
} from "@mui/material";

const DetailOptions = {
    interior: {
        title: 'Interior Detail',
        details: 'It is recommended to get an eye exam annually to assess your eyesight, especially as your eyes change as you age.',
        img: toolImg
    },
    exterior: {
        title: 'Exterior Detail',
        details: 'It is essential to have a seperate contact exam if you are interested in contact lenses to ensure a comfortable fit.',
        img: tireImg
    },
    combo: {
        title: 'Interior/Exterior Combo',
        details: 'As a courtesy to anyone, we offer free adjustments and cleaning for your glasses.',
        img: washing2Img
    },
  };

function ServiceDetails({ option }) {
    return (
        <React.Fragment>
        <Stack flexGrow={1} justifyContent="top" alignItems="center" p={4}  >
            <Typography flexGrow={1} variant="h5" fontWeight={1} >{DetailOptions[option].title} </Typography>
            <Typography variant="body1" p={2}> {DetailOptions[option].details} </Typography>
        </Stack>
        
        <Box height={300}>
        <Image  src={DetailOptions[option].img} />
        </Box>
        </React.Fragment>
    );
    
};

export default ServiceDetails;