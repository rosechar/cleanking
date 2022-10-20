import React from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Stack
} from "@mui/material";


function UpdateForm({formValues, handleChange}) {

  return (
    
    <React.Fragment>
        <Stack direction="column" component="form" >
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoFocus
              value={formValues.name.value}
              onChange={handleChange}
              error={formValues.name.error}
              helperText={formValues.name.error && formValues.name.errorMessage}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formValues.email.value}
              onChange={handleChange}
              error={formValues.email.error}
              helperText={formValues.email.error && formValues.email.errorMessage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              value={formValues.phone.value}
              onChange={handleChange}
              error={formValues.phone.error}
              helperText={formValues.phone.error && formValues.phone.errorMessage}

            />
            <FormControl sx={{ mt: 2 }}>
            <InputLabel id="appointment">Appointment Type</InputLabel>
                <Select
                    required={true}
                    input={<OutlinedInput label="Appointment Type" />}
                    labelId="appointment"
                    id="appointment"
                    fullWidth
                    value={formValues.appointment.value}
                    label="appointment"
                    name="appointment"
                    onChange={handleChange}

                >
                    <MenuItem value={"interior"}>Interior Car Detail</MenuItem>
                    <MenuItem value={"exterior"}>Exterior Car Detail</MenuItem>
                    <MenuItem value={"combo"}>Interior & Exterior Combo</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
            <InputLabel id="time">Date</InputLabel>
                <Select
                    required={true}
                    input={<OutlinedInput label="Date" />}
                    labelId="time"
                    id="time"
                    fullWidth
                    value={formValues.time.value}
                    label="time"
                    name="time"
                    onChange={handleChange}
                >
                  {formValues.time.options.map((item) => {
                  return ( 
                    <MenuItem key={item} value={item}> {item} </MenuItem>
                  )
                  })}
                </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              id="details"
              label="Additional Details"
              name="details"
              value={formValues.details.value}
              onChange={handleChange}

            />
        </Stack>
    </React.Fragment>

    
  );
};

export default UpdateForm;