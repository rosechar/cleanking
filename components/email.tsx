import React from "react";
import {
  TextField,
  Button,
  Stack
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

function EmailForm({formValues, handleChange, validateField, setFormError, formError, setLoading, setFormValues, handleBackdropClose, setEmailStatus}) {
  const reRef = React.useRef<ReCAPTCHA>();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateField("email", formValues.email.value)) {
      setFormError(true);
    }
    else {
      if (formError) {
        setFormError(!formError);
      }
      setLoading(true);
      const token = await reRef.current.executeAsync();
      reRef.current.reset();
      const response = await fetch(`/api/customers/${formValues.email.value}?token=${token}`);
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
  return (
    
    <React.Fragment>
      
        <Stack direction="column" component="form" noValidate onSubmit={handleSubmit}>
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} size="invisible" ref={reRef} />
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
        </Stack>
    </React.Fragment>

    
  );
};

export default EmailForm;