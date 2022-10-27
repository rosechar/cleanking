import { Divider, Fade, Grid, Box, ImageList, ImageListItem, Typography, Button } from '@mui/material'
import React from 'react'
import interiorImg from '../components/images/interior1.jpg';
import exterior1Img from '../components/images/exterior1.jpg';
import tireImg from '../components/images/tire1.jpg';
import toolImg from '../components/images/tool1.jpg';
import washing2Img from '../components/images/washing2.jpg';
import washingImg from '../components/images/washing.jpg';
import ServiceCards from '../components/serviceCards';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

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
                <img
                    {...srcset(item.img.src, 10, item.rows, item.cols)}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>
        </Fade>
        <Divider ><Typography fontWeight={1} fontSize={"1.5rem"} variant="overline">Services</Typography></Divider>

        <Box pt={2}>

          <ServiceCards></ServiceCards>
          </Box>
          <Box display="flex" justifyContent="center" mt={3}>
          <Button href="/contact" sx={{textAlign:"center", color:"text.secondary"}} variant="outlined" size="large"> Schedule A Detail Service For As Soon As Tomorrow </Button>
          </Box>
      </Grid>
    </React.Fragment>
  )
}

const itemData = [
  {
    img: exterior1Img,
    rows: 2,
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
    rows: 2
  },
  {
    img: toolImg,
    rows: 2,
  },
  {
    img: washingImg
  }
];
