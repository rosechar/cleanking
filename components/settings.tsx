import React from "react";
import {
  TextField,
  Button,
  Stack,
  Box,
  Grid,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Alert
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAvailableDays } from "../utility/formUtils";
import { Customer } from "../interfaces/customer";
import { formatISO } from "date-fns";

function Settings({setLoading}) {
  const [dateOptions, setDateOptions] = React.useState([])
  const [selectedDates, setSelectedDates] = React.useState([]);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
  React.useEffect(() => {
    getAvailableDays().then((days) =>    
    setDateOptions(days));

    }, []);
  const handleDateRemoval = async (e) => {
    const custo: Customer = {
      id: '',
      name: '',
      email: '',
      phone: 0,
      apt: '',
      appointment:''
    };
    let c = custo;
    let custos = [];
    selectedDates.forEach((date) => {
      custo.id = "UNAVILABLE";
      custo.name = "UNAVILABLE";
      custo.apt = formatISO(new Date())
    })
    
    
    setLoading(true);
    // const response = await fetch('/api/appointments/removeDates', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(custo),
    // });
    // console.log(response)
    // if (!response.ok) {
    //   console.log("ERROR");
    // }
    setLoading(false);
  }
  
  const handleDateChange = (e) => {
    setSelectedDates(current => [...current, ...e.target.value])
    console.log(selectedDates)
  }

  return (
    <React.Fragment>
      <Snackbar anchorOrigin={{vertical:'top', horizontal: 'center'}} open={deleteSuccess} autoHideDuration={5000} onClose={() => setDeleteSuccess(true)}>
        <Alert onClose={() => setDeleteSuccess(false)} >
          Available dates updated successfully
        </Alert>
    </Snackbar>
    <Stack direction="column"  pt={4}  justifyContent="center" >
        <Typography variant="h4" align="center" fontWeight={1}> Settings </Typography>
        <Stack direction={{xs:"column", sm:"row"}} alignSelf="center" spacing={2} pt={3}  >
        <div >
        <Accordion key="remove" sx={{width:{xs:300, sm:400}}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"

          >
            <Typography sx={{ fontWeight: 1}} variant={"body2"}>Remove Available Dates</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails >
            <Grid p={3} container direction="column" alignItems="center" justifyContent="space-evenly"  spacing={2}>
              <Typography variant="body2" fontWeight={1}> Select up to 25 dates to make unavailble for future bookings </Typography>
            <FormControl sx={{ mt: 2 }}>
            <InputLabel id="time">Dates</InputLabel>
                <Select
                    sx={{width:250 }}
                    required={true}
                    input={<OutlinedInput label="Dates" />}
                    labelId="time"
                    id="time"
                    fullWidth
                    value={selectedDates}
                    multiple
                    label="time"
                    name="time"
                    onChange={handleDateChange}
                >
                  {dateOptions.map((item) => {
                  return ( 
                    <MenuItem key={item} value={item}> {item} </MenuItem>
                  )
                  })}
                </Select>
            </FormControl>
            </Grid>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button size="small" color="inherit" onClick={handleDateRemoval}>Save</Button>
          </AccordionActions>
        </Accordion>
        </div>
        <div>
        <Accordion key="range" sx={{width:{xs:300, sm:400}}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"

          >
            <Typography sx={{ fontWeight: 1}} variant={"body2"}>Change Date Range</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Grid container sx={{ mt: 2 }} direction={{ xs: "column", sm: "row" }} justifyContent="space-evenly" alignContent="center" spacing={2}>

            </Grid>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button size="small" color="inherit" onClick={handleDateRemoval}>Save</Button>
          </AccordionActions>
        </Accordion>
        </div>
        </Stack>
      </Stack>
    </React.Fragment>
  )
};

export default Settings;