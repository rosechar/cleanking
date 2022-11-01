import { Grid, Typography } from '@mui/material'
import React from 'react';
import { useSession } from 'next-auth/react'


export default function Customers({apts}) {
  const { data: session } = useSession();
  let custos = apts.reduce((m, obj) => {
    if (m[obj.id]) {
      m[obj.id].push(obj)
    }
    else {
      m[obj.id] = [obj];
    }
    return m;
}, new Map());
  console.log(custos)
  if (!session) return <><Typography sx={{textAlign:"center", mt:5}} >Sign in to view customers</Typography></>
  return (    
    <React.Fragment>
      <Grid container >
        {/* {custos.forEach((value, key) => {
          return (
            <Grid item key={key}>
              
            </Grid>
          )
        })} */}
      </Grid>
      
    </React.Fragment>
)
}
