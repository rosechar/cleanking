import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Stack, styled, Typography } from '@mui/material'
import React from 'react';
import { useSession } from 'next-auth/react'
import { red } from '@mui/material/colors';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import { format } from 'date-fns';


export default function Customers({apts, setLoading}) {
  const { data: session } = useSession();
  let custos = apts.reduce((m, obj) => {
    if (m.has(obj.id)) {
      let a = m.get(obj.id)
      a = a.concat([obj])
      m.set(obj.id, a);
    }
    else {
      m.set(obj.id, [obj]);
    }
    return m;
}, new Map());
  console.log(custos)
  if (!session) return <><Typography sx={{textAlign:"center", mt:5}} >Sign in to view customers</Typography></>
  return (    
    <React.Fragment>
      <Grid container direction="row" justifyContent="space-evenly" rowGap={2} pt={2} overflow="scroll" pb={8} >
            {
          [...custos.values()].map(custo =>
            <Grid item  key={custo[0].apt}>
            <CustomerCard customer={custo}/>
            </Grid>
          )
        }
      </Grid>
      
    </React.Fragment>
)
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function CustomerCard({customer}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 300 }}>
      <CardHeader
        avatar={
          (customer.length > 1) ? <Typography><RepeatOutlinedIcon/></Typography> : <Typography><FiberNewOutlinedIcon/></Typography>
          
        }
        action={
          <Button size="small">Update</Button>
        }
        title={<Typography>{customer[0].name}</Typography>}
        subheader={<Typography color="text.secondary" fontSize=".8rem"> {customer[0].email}{<br></br>} {customer[0].phone} </Typography>}
      />
      <CardActions sx={{justifyContent:"space-between"}}>
      <Typography component={Button} onClick={handleExpandClick} color="text.secondary" variant="overline">View All Appointments </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {customer.map((custo) => {
            return (
              <>
              <Stack direction="row" spacing={1}>
                <Typography> <CalendarIcon sx={{ fontSize: 20 }} /> </Typography>
                <Typography variant={"body2"}> {format(new Date(custo.apt), 'MM/dd/yy')} - {custo.appointment} </Typography>
              </Stack>
              </>
            )
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}