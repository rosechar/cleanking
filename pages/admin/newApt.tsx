import React from "react";
import {
  Alert,
  Box,
  Snackbar,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Customer } from '../../interfaces/customer'
import {v4 as uuidv4} from 'uuid';
import { add, eachDayOfInterval, format, formatISO } from "date-fns";
import ScheduleForm from "../../components/schedule";
import EmailForm from "../../components/email";

function AdminNewApt() {
  const [emailStatus, setEmailStatus] =  React.useState(false);
  const [formError, setFormError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleBackdropClose = () => {
    setLoading(false);
  };
  const [formValues, setFormValues] = React.useState({
      name:{
        value:'',
        error:false,
        errorMessage:'Please enter a valid name'
      },
      email:{
        value:'',
        error:false,
        errorMessage:'Please enter a valid email address'
      },
      phone:{
        value:'',
        error:false,
        errorMessage:'Please enter a valid phone number'
      },
      appointment:{
        value:'combo'
      },
      time:{
        value:'',
        options: []
      },
      details:{
          value:''
      }
    })
  React.useEffect(() => {
    let dates = [];
    fetch('/api/appointments/dates',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        
        data.map(element => {
          dates.push(element['apt']);
        });
      let now = new Date(Date.now());
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      if (now.getUTCHours() >= 14) {
        now = add(now, { days: 1 });
      }
      now.setHours(0);
      let endDay = add(now, { days: 14 });
      const availableDays = eachDayOfInterval({
        start: now,
        end: endDay,
      });
      let availableDaysISO = [];
      availableDays.forEach((x) => {
        availableDaysISO.push(formatISO(x));
      });
      availableDaysISO = availableDaysISO.filter(item => !dates.includes(item));
      let availableDaysFinal = []
      availableDaysISO.forEach((x) => {
        availableDaysFinal.push(format(new Date(x), 'MM/dd/yy'));
      });
      setFormValues(current => ({
        ...current,
        time: {
          ...current.time,
          value:availableDaysFinal[0],
          options:availableDaysFinal
        },
    }));
      }).catch((e) => {console.log(e)});
    }, []);

const handleChange = (e) => {
    const field = e.target.name;
    const newValue = e.target.value;
    setFormValues(current => ({
          ...current,
          [field]: {
            ...current[field],
            value:newValue
          },
      }));
    validateField(field, newValue);
  }

const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (validateField("email", formValues.email.value)) {
      setFormError(true);
    }
    else {
      if (formError) {
        setFormError(!formError);
      }
      setLoading(true);
      const response = await fetch(`/api/customers/${formValues.email.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        console.log("ERROR");
      }
      const data = await response.json();
      

      if (data.length > 0) {
        setFormValues(current => ({
          ...current,
          name: {
            ...current.name,
            value:data[0].name
          },
          phone: {
            ...current.phone,
            value:data[0].phone.toString()
          },
          email: {
            ...current.email,
            value:data[0].email
          },
          appointment: {
            ...current.email,
            value:data[0].appointment
          },
      }));
      }
  
      handleBackdropClose();
      setEmailStatus(true);
    }
  }

const handleSubmit = async (e) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    const custo: Customer = {
      id: uuidv4(),
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
        
        if (validateField(currentField, currentValue)) {
            error = true;
        }
    }
    if (error) {
      setFormError(true);
    }
    else {
        custo.name = formValues['name'].value
        custo.email = formValues['email'].value
        custo.phone = parseInt(formValues['phone'].value)
        custo.appointment = formValues['appointment'].value
        custo.apt = formatISO(new Date(formValues['time'].value))
        
        setLoading(true);
        const response = await fetch('/api/appointments/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(custo),
        });
        if (!response.ok) {
          console.log("ERROR");
        }
        handleBackdropClose();

    }
    
}

function validateField(field, value) {
    switch(field) {
        case 'email':
            let emailError = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            setFormValues(current => ({
                ...current,
                [field]: {
                  ...current[field],
                  error:!emailError
                },
            }));
            return !emailError;
        case 'name':
            let nameError = value.length >= 6;
            setFormValues(current => ({
                ...current,
                [field]: {
                  ...current[field],
                  error:!nameError
                },
            }));
            return !nameError;
        case 'phone':
          console.log(field, value);
            let phoneError = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i);
            setFormValues(current => ({
                ...current,
                [field]: {
                  ...current[field],
                  error:!phoneError
                },
            }));
            return !phoneError;
        default:
            break;
    }
    return false;
  }

  const handleAlertClose = () => {
    setFormError(false);
  };

  return (
    
    <React.Fragment>
        <Snackbar anchorOrigin={{vertical:'top', horizontal: 'center'}} open={formError} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" >
          Please fix errors before submitting
        </Alert>
      </Snackbar>
      <Grid container justifyContent="space-evenly" >
      {emailStatus?
        
        <><Grid item>
            <Typography mt={3} variant="h5" fontWeight={1}> Book Appointment </Typography>
        </Grid><Grid item minWidth={400}>
                <ScheduleForm formValues={formValues} handleSubmit={handleSubmit} handleChange={handleChange}></ScheduleForm>
        </Grid></>
      :
        <><Grid item>
            <Typography mt={3} variant="h5" fontWeight={1}> Customer Lookup </Typography>
        </Grid>
        <Grid item minWidth={400}>
        : <EmailForm formValues={formValues} handleChange={handleChange} validateField={validateField} setFormError={setFormError} formError={formError} setLoading={setLoading} setFormValues={setFormValues} handleBackdropClose={handleBackdropClose} setEmailStatus={setEmailStatus}></EmailForm>
        </Grid></>
}
      </Grid>

    </React.Fragment>

    
  );
};

export default AdminNewApt;