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
import { formatISO } from "date-fns";
import { Customer } from "../interfaces/customer";
import {v4 as uuidv4} from 'uuid';
import { validateField,handleChange } from "../utility/formUtils";

function ScheduleForm({formValues, setFormError, setLoading, updateFormStatus, setFormValues}) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formFields = Object.keys(formValues);
        const custo: Customer = {
          id: '',
          name: '',
          email: '',
          phone: 0,
          apt: '',
          appointment:''
        };
        let error = false;
        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;
            
            if (validateField(currentField, currentValue, setFormValues)) {
                error = true;
            }
        }
        if (error) {
          setFormError(true);
        }
        else {
          console.log(formFields, formValues)
            custo.id = (formValues['id'].value !== "") ? formValues['id'].value : uuidv4();
            custo.name = formValues['name'].value
            custo.email = formValues['email'].value
            custo.phone = parseInt(formValues['phone'].value)
            custo.appointment = formValues['appointment'].value
            custo.apt = formatISO(new Date(formValues['time'].value))
            custo.details = formValues['details'].value
            
            setLoading(true);
            const response = await fetch('/api/appointments/book', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(custo),
            });
            console.log(response)
            if (!response.ok) {
              console.log("ERROR");
            }
            custo.apt = formValues['time'].value
            updateFormStatus(true, custo);
        }
    }
  return (
    <React.Fragment>
        <Stack direction="column" component="form" noValidate onSubmit={handleSubmit} mb={1}>
            <TextField
              margin="dense"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoFocus
              value={formValues.name.value}
              onChange={(e) => handleChange(e, setFormValues)}
              error={formValues.name.error}
              helperText={formValues.name.error && formValues.name.errorMessage}

            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formValues.email.value}
              onChange={(e) => handleChange(e, setFormValues)}
              error={formValues.email.error}
              helperText={formValues.email.error && formValues.email.errorMessage}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              value={formValues.phone.value}
              onChange={(e) => handleChange(e, setFormValues)}
              error={formValues.phone.error}
              helperText={formValues.phone.error && formValues.phone.errorMessage}

            />
            <FormControl margin="dense">
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
                    onChange={(e) => handleChange(e, setFormValues)}

                >
                    <MenuItem value={"interior"}>Interior Detail</MenuItem>
                    <MenuItem value={"full"}>Full Detail</MenuItem>
                    <MenuItem value={"deluxe"}>Deluxe Detail</MenuItem>
                    <MenuItem value={"spiffy"}>Spiffy Detail</MenuItem>
                    <MenuItem value={"alacarte"}>A La Carte</MenuItem>
                </Select>
            </FormControl>
            <FormControl margin="dense">
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
                    onChange={(e) => handleChange(e, setFormValues)}
                >
                  {formValues.time.options.map((item) => {
                  return ( 
                    <MenuItem key={item} value={item}> {item} </MenuItem>
                  )
                  })}
                </Select>
            </FormControl>
            <TextField
              margin="dense"
              fullWidth
              id="details"
              label="Additional Details"
              name="details"
              value={formValues.details.value}
              onChange={(e) => handleChange(e, setFormValues)}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, backgroundColor:"#ba000d", color:"text.primary","&:hover": {backgroundColor: "#8e0000"} }}
            >
              Submit
            </Button>
        </Stack>
    </React.Fragment>

    
  );
};

export default ScheduleForm;