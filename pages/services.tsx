import type { Customer } from '../interfaces/customer'
import useSwr from 'swr'
import Link from 'next/link'
import { Divider, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Services() {

  return (
    <React.Fragment>
      <Divider ><Typography fontSize={"1rem"} variant="overline">Interior Detail</Typography></Divider>
      <Divider ><Typography fontSize={"1rem"} variant="overline">Exterior Detail</Typography></Divider>
    </React.Fragment>
  )
}
