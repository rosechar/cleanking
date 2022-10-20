import React from "react";
import {
  Alert,
  Box,
  Snackbar,
} from "@mui/material";
import ScheduleForm from "./schedule";
import EmailForm from "./email";
import { getAvailableDays } from "../utility/formUtils";


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
    getAvailableDays().then((days) =>    
    setFormValues(current => ({
      ...current,
      time: {
        value:days[0],
        options:days
      },
    })));

    }, []);

  React.useEffect(() => {
      handleBackdropClose();
    }, [emailStatus]);

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
      <Box minWidth={{xs: 300, sm:350}}  pl={{xs:2}} pr={{xs:2}}>
      {emailStatus?
      <ScheduleForm formValues={formValues} setFormError={setFormError} setLoading={setLoading} updateFormStatus={updateFormStatus} setFormValues={setFormValues}></ScheduleForm>
      : <EmailForm formValues={formValues} setFormError={setFormError} formError={formError} setLoading={setLoading} setFormValues={setFormValues} setEmailStatus={setEmailStatus}></EmailForm>
      }
       </Box>
    </React.Fragment>

    
  );
};

export default ContactForm;