import React from "react";
import {
  Alert,
  Box,
  Snackbar,
} from "@mui/material";
import { add, eachDayOfInterval, format, formatISO } from "date-fns";
import ScheduleForm from "./schedule";
import EmailForm from "./email";

function ContactForm({setLoading, updateFormStatus, handleBackdropClose}) {
  const [emailStatus, setEmailStatus] =  React.useState(false);
  const [formError, setFormError] = React.useState(false);
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
      <Box minWidth={{xs: 300, sm:350}}>
      {emailStatus?
      <ScheduleForm formValues={formValues} handleChange={handleChange} validateField={validateField} setFormError={setFormError} setLoading={setLoading} handleBackdropClose={handleBackdropClose} updateFormStatus={updateFormStatus}></ScheduleForm>
      : <EmailForm formValues={formValues} handleChange={handleChange} validateField={validateField} setFormError={setFormError} formError={formError} setLoading={setLoading} setFormValues={setFormValues} handleBackdropClose={handleBackdropClose} setEmailStatus={setEmailStatus}></EmailForm>
      }
       </Box>
    </React.Fragment>

    
  );
};

export default ContactForm;