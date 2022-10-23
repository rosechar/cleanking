export const handleChange = (e, setFormValues) => {
    const field = e.target.name;
    const newValue = e.target.value;
    setFormValues(current => ({
          ...current,
          [field]: {
            ...current[field],
            value:newValue
          },
      }));
    validateField(field, newValue, setFormValues);
  }

  import { add, eachDayOfInterval, formatISO, format } from "date-fns";

export async function getAvailableDays(range = 30) : Promise<Array<string>> {
    let dates = [];
    let availableDaysFinal = []
    const response = await fetch('/api/appointments/dates',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json();
    if (!response.ok) {
        console.log("ERROR", response.statusText);
    }
    data.map(element => {
        dates.push(element['apt']);
    });
    let now = new Date(Date.now());
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    if (now.getHours() >= 14) {
      now = add(now, { days: 1 });
    }
    now.setHours(0);
    let endDay = add(now, { days: range });
    const availableDays = eachDayOfInterval({
    start: now,
    end: endDay,
    });
    let availableDaysISO = [];
    availableDays.forEach((x) => {
    availableDaysISO.push(formatISO(x));
    });
    availableDaysISO = availableDaysISO.filter(item => !dates.includes(item));
    
    availableDaysISO.forEach((x) => {
    availableDaysFinal.push(format(new Date(x), 'MM/dd/yy'));
    });
    
    return availableDaysFinal;
}

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
            value = value.toString();
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

  export const defaultFormValues = {
    id:{
      value:''
    },
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
  }