export function validateField(field, value, setFormValues) {
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