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
            title: "Interior Detailing",
            details: "Using premium cleaning products, we restore your car interior to that new car feeling",
            img:interiorImg,
            slug:"interior"
        },
        {
            title: "Exterior Detailing",
            details: "Using premium cleaning products, we restore your car interior to that new car feeling",
            img:exteriorImg,
            slug:"exterior"
        },
        {
            title: "Exterior/Interior Combo",
            details: "Using premium cleaning products, we restore your car interior to that new car feeling",
            img:washingImg,
            slug:"combo"
        },
        {
            title: "Upsell Special ",
            details: "Offered as an optional add on, ",
            img:womanImg,
            slug:"upsell"
        }
    ]

  return (
    <React.Fragment>
        <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  flexDirection={{xs:"column", sm:"row"}}
  flexWrap="wrap"
  gap={2}
>
    {serviceCardInfo.map((card) => {
        return (
            <Card key={card.title} sx={{ width: {xs:280, sm:400, md:450}, maxHeight:900 }}>
            <CardActionArea component={Link} href={`/services?service=${card.slug}`}>
              <CardContent>
                <Typography color="#ba000d" gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Divider variant="middle" />
                <Typography variant="body2" color="text.secondary">
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
        )
    })}

        </Box>
    </React.Fragment>
  );
};

export default ServiceCards;