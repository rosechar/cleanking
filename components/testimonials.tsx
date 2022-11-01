import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Typography,
    Stack,
    Link,
    Box
} from '@mui/material'


export interface SettingsT {
  autoPlay: boolean,
  animation: "fade" | "slide",
  indicators: boolean,
  duration: number,
  navButtonsAlwaysVisible: boolean,
  navButtonsAlwaysInvisible: boolean,
  fullHeightHover: boolean,
  cycleNavigation: boolean,
  swipe: boolean,
  [key: string]: any
}

export const DefaultSettingsT: SettingsT = {
  autoPlay: true,
  animation: "fade",
  indicators: false,
  duration: 1000,
  navButtonsAlwaysVisible: false,
  navButtonsAlwaysInvisible: false,
  cycleNavigation: true,
  fullHeightHover: true,
  swipe: true
}

const Testimonals = () => {
    const [settings, setSettings] = useState<SettingsT>(DefaultSettingsT);

    return (
        <div >
            <Carousel 
                {...settings}
                sx={{ height:100}}
            >
                {
                    items.map((item, index) => {
                        return <Testimonal item={item} key={index} />
                    })
                }
            </Carousel>
        </div>
    )
}


type Item = {
    name: string,
    description: string,
    href: string
}

interface TestimonalProps
{
    item: Item
}

function Testimonal({item}: TestimonalProps) {
    return (
      <Box textAlign="center" pl={{md:3}} pr={{md:3}}>

          <Stack spacing={1}  >
            
            <Typography pt={.5} component={Link} href={item.href} color="text.primary" lineHeight={2} variant="overline">{item.description}</Typography>
            <Typography  variant='body2' fontStyle="italic" color="text.secondary">- {item.name}</Typography>
          </Stack>

        </Box>
    )
}

const items: Item[] = [
    {
        name: "Keven",
        description: "Did a great job,and exceeded my expectations on my Ford Explorer.  I was happy to tip an extra amount...Would definitely recommend",
        href: 'https://goo.gl/maps/CVL7hFJoiqFFmRpF9'
    },
    {
        name: "Theresa",
        description: "Such a great job!! Will be back! And will pass the word!!",
        href: 'https://goo.gl/maps/9317VvQvspqTker67'
    },
    {
        name: "Sarah",
        description: "Great experience. They went the extra mile for us. Will be back",
        href: 'https://goo.gl/maps/kmqCLMFEzMV4rnwf9'
    }
]

export default Testimonals;