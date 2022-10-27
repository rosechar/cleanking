import React from "react";
import {
  TextField,
  Button,
  Stack,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link
} from "@mui/material";
import interiorImg from '../components/images/interior.jpg';
import exteriorImg from '../components/images/exterior.jpg';
import washingImg from '../components/images/washing1.jpg';
import womanImg from '../components/images/woman.jpg';

function ServiceCards() {
    const serviceCardInfo = [
        {
            title: "Interior Detail",
            details: "Using premium cleaning products, we restore your car interior to that new car feeling. Includes vacuuming, shampooing, dashboard and glass cleaning, and more.",
            img:interiorImg,
            slug:"interior"
        },
        {
            title: "Full Detail",
            details: "Includes an interior detail as well as exterior wash and chamois dry, tire and wheel cleaning, and more.",
            img:exteriorImg,
            slug:"full"
        },
        {
            title: "Deluxe Detail",
            details: "Go that extra mile and you'll thank yourself later. Includes a full detail as well as an engine bay cleaning and conditioning.",
            img:washingImg,
            slug:"deluxe"
        },
        {
            title: "Spiffy Detail",
            details: "Just the essentials, including interior vacuuming and an exterior wash.",
            img:womanImg,
            slug:"spiffy"
        },
        {
          title: "A La Carte Services",
          details: "We also offer a la carte Clay Bar Buff & Wax services",
          img:womanImg,
          slug:"alacarte"
      }
    ]

  return (
    <React.Fragment>
        <Grid container spacing={2} justifyContent="space-evenly">
    {serviceCardInfo.map((card) => {
        return (
          <Grid item key={card.title}>
            <Card sx={{ width: {xs:320, md:450, lg:600}, height:350 }}>
            <CardActionArea component={Link} href={`/services?service=${card.slug}`}>
              <CardContent>
                <Typography color="#ba000d" gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Divider  />
                <Typography pt={1} variant="body2" fontWeight={1} >
                  {card.details}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="200"
                image={card.img.src}
              />
            </CardActionArea>
          </Card>
          </Grid>
        )
    })}

        </Grid>
    </React.Fragment>
  );
};

export default ServiceCards;