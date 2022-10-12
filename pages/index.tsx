import type { Customer } from '../interfaces/customer'
import useSwr from 'swr'
import Link from 'next/link'
import { Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Index() {

  return (
    <React.Fragment>
      <Grid pt={3} container alignItems="center" justifyContent="space-evenly" direction="row">
        <Grid item>
        <Typography variant="body1" fontWeight={1}>
          Auto detailing service located in Blissfield, Michigan
        </Typography>
        </Grid>
        <Grid item>
        <Typography variant="body1" fontWeight={1}>
            517-682-1919
        </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
