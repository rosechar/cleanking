import React from "react";
import {
  Alert,
  Snackbar,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ScheduleForm from "./schedule";
import EmailForm from "./email";
import { defaultFormValues, getAvailableDays } from "../utility/formUtils";

export default function AdminNewApt({setNewForm, handleNewForm}) {
  const [formValues, setFormValues] = React.useState(defaultFormValues)
  const [emailStatus, setEmailStatus] =  React.useState(false);
  const [formError, setFormError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleBackdropClose = () => {
    setLoading(false);
  };
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

const updateFormStatus = (formComplete, newApt) => {
  handleBackdropClose();
  setNewForm(!formComplete);
  handleNewForm(newApt);
}
const handleAlertClose = () => {
  setFormError(false);
};

  return (
    
    <React.Fragment>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={handleBackdropClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
      <Snackbar anchorOrigin={{vertical:'top', horizontal: 'center'}} open={formError} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" >
          Please fix errors before submitting
        </Alert>
      </Snackbar>
      <Grid container alignItems="center" justifyContent="space-evenly" spacing={2} >
      {emailStatus?
        
        <><Grid item>
            <Typography variant="h5" fontWeight={1}> Book Appointment </Typography>
        </Grid><Grid item minWidth={{xs:250, sm:400}}>
        <ScheduleForm formValues={formValues} setFormError={setFormError} setLoading={setLoading} updateFormStatus={updateFormStatus} setFormValues={setFormValues}></ScheduleForm>
        </Grid></>
      :
        <><Grid item>
            <Typography variant="h5" fontWeight={1}> Customer Lookup </Typography>
        </Grid>
        <Grid item minWidth={{xs:250, sm:400}}>
        <EmailForm formValues={formValues} setFormError={setFormError} formError={formError} setLoading={setLoading} setFormValues={setFormValues} setEmailStatus={setEmailStatus}></EmailForm>
        </Grid></>
}
      </Grid>

    </React.Fragment>

    
  );
};