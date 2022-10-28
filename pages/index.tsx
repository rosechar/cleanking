import { Divider, Fade, Grid, Box, ImageList, ImageListItem, Typography, Button } from '@mui/material'
import React from 'react'
import interiorImg from '../components/images/interior1.jpg';
import exterior1Img from '../components/images/exterior1.jpg';
import tireImg from '../components/images/tire1.jpg';
import toolImg from '../components/images/tool1.jpg';
import washing2Img from '../components/images/washing2.jpg';
import washingImg from '../components/images/washing.jpg';
import ServiceCards from '../components/serviceCards';
import Testimonals from '../components/testimonials';
import Image from 'next/image';

export default function Index() {

  return (
    <React.Fragment>
      <Grid p={3} alignItems="center"  justifyContent="center">
        <Typography pb={2} sx={{textAlign:"center"}} color="#ba000d" variant="h3"  >
          The King of Auto Detaling 
        </Typography>
        <Divider ><Typography  variant="overline">Located in Blissfield, Michigan</Typography></Divider>

        <Fade in timeout={4000}>
            <ImageList
            
            variant="masonry"
            cols={3}
            rowHeight={121}
            >
            {itemData.map((item) => (
                <ImageListItem key={item.img.src} cols={item.cols || 1} rows={item.rows || 1}>
                <Image objectFit='cover' quality={50} layout="fill" src={item.img.src}></Image>
                </ImageListItem>
            ))}
            </ImageList>
        </Fade>
        <Divider ><Typography fontWeight={1} fontSize={"1.5rem"} variant="overline">Services</Typography></Divider>

        <Box pt={2}>
          <ServiceCards></ServiceCards>
        </Box >
        <Box pt={2}>
          <Divider ><Typography fontWeight={1} fontSize={"1.5rem"} variant="overline">Testimonals</Typography></Divider>
        </Box>
        <Box  >
          <Testimonals></Testimonals>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button href="/contact" sx={{textAlign:"center", color:"text.secondary", borderColor:"gray"}} variant="outlined" size="large"> Schedule A Detail Service For As Soon As Tomorrow </Button>
        </Box>
      </Grid>
    </React.Fragment>
  )
}

const itemData = [
  {
    img: exterior1Img,
    rows: 2,
    height:242
  },
  {
    img: interiorImg
  },
  {
    img: washing2Img,
    cols:1
  },
  {
    img: tireImg,
    rows: 2,
    height:242
  },
  {
    img: toolImg,
    rows: 2,
    height:242
  },
  {
    img: washingImg
  }
];
