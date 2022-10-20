import type { Customer } from '../../interfaces/customer'
import AdminDetails from '../../components/adminDetails'
import useSwr, { mutate } from 'swr'
import { Backdrop, Box, Button, CircularProgress, Divider, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, Snackbar } from '@mui/material'
import { compareAsc, format, formatISO } from 'date-fns';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react'
import { validateField, getAvailableDays, handleChange, defaultFormValues } from "../../utility/formUtils";
import Update from '../../components/update'
import AdminNewApt from '../../components/newApt'
import AdminLayout from '../../components/adminLayout';


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Admin() {
  const custo: Customer = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    apt: '',
    appointment:''
  };
  const { data, error, mutate } = useSwr<Customer[]>('/api/appointments', fetcher);
  const [apts, setApts] = React.useState([]);
  const [activeCustomer, setActiveCustomer] = React.useState(custo);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [updateForm, setUpdateForm] = React.useState(false);
  const [newForm, setNewForm] = React.useState(false);
  const [newSuccess, setNewSuccess] = React.useState(false);
  const { data: session } = useSession();
  const [formValues, setFormValues] = React.useState(defaultFormValues);
  const [view, setView] = React.useState("list");

  React.useEffect(() => {
    setApts(data);
  }, [data])

  React.useEffect(() => {
    if (search.length === 0) {
      setApts(data);
    }
    else {
      let newData = apts.filter((x) => {
        let str = `${x.name} ${x.email} ${x.phone}`.toLowerCase();
        return str.indexOf(search) > -1 && search;
      });
      setApts(newData);
    }
  }, [search]);

  const openUpdateForm = async (item) => {
    let days = await getAvailableDays();
    console.log(days)
    setActiveCustomer(item);
    days.push(format(new Date(item.apt),'MM/dd/yy' ))
    setFormValues(current => ({
      ...current,
      time: {
        ...current.time,
        value:format(new Date(item.apt), 'MM/dd/yy'),
        options:days
      },
      name: {
        ...current.name,
        value:item.name,
      },
      phone: {
        ...current.phone,
        value:item.phone,
      },
      email: {
        ...current.email,
        value:item.email,
      },
      details: {
        ...current.details,
        value:item.details,
      },
      appointment: {
        ...current.appointment,
        value:item.appointment,
      },
  }));
    setUpdateForm(true);
  };

  const closeUpdateForm = () => {
    setActiveCustomer(custo);
    setUpdateForm(false);
  };

  const closeNewForm = () => {
    setNewForm(false);
  };
  const handleNewForm = () => {
    setNewSuccess(true);
    setFormValues(defaultFormValues);
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    const custo: Customer = {
      id: activeCustomer.id,
      name: '',
      email: '',
      phone: 0,
      apt: '',
      appointment:'',
      details:''
    };
    let error = false;
    for (let index = 0; index < formFields.length; index++) {
        const currentField = formFields[index];
        const currentValue = formValues[currentField].value;
        console.log(currentField, currentValue);
        if (validateField(currentField, currentValue, setFormValues)) {
            error = true;
        }
    }
    if (error) {
      //HANDLE ERROR
    }
    else {
        custo.name = formValues['name'].value
        custo.email = formValues['email'].value
        custo.phone = parseInt(formValues['phone'].value)
        custo.appointment = formValues['appointment'].value
        custo.apt = formatISO(new Date(formValues['time'].value))
        custo.details = formValues['details'].value
        console.log(custo)
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
        data[data.indexOf(activeCustomer)] = custo;
        mutate(data);
        closeUpdateForm();
    }
    setLoading(false);
    
  };

  const handleBackdropClose = () => {
    setLoading(false);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const handleDelete = async (id, apt) => {
    setLoading(true);
    const response = await fetch(`/api/appointments/book/?id=${id}&apt=${apt}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      console.log("ERROR");
    }
    setLoading(false);
    let newData = data.filter((x) => x.id != id);
    mutate(newData);
  }
  
  if (error) return <><Typography sx={{textAlign:"center", mt:5}} >Failed to load appointments</Typography></>
  if (!data) return <Typography sx={{textAlign:"center", mt:5}}>Loading...</Typography>
  return (    
      <AdminLayout setNewForm={setNewForm} setView={setView} view={view} search={search} handleSearchChange={handleSearchChange}>
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      onClick={handleBackdropClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Snackbar anchorOrigin={{vertical:'top', horizontal: 'center'}} open={newSuccess} autoHideDuration={5000} onClose={() => setNewSuccess(false)}>
        <Alert onClose={() => setNewSuccess(false)} >
          Appointment created successfully
        </Alert>
    </Snackbar>
    <Dialog open={newForm} onClose={closeNewForm}>
        <DialogContent>
          <AdminNewApt setNewForm={setNewForm} handleNewForm={handleNewForm}></AdminNewApt>
        </DialogContent>
      </Dialog>
    <Dialog open={updateForm} onClose={closeUpdateForm}>
        <DialogTitle>Update Appointment</DialogTitle>
        <DialogContent>
          <Update formValues={formValues} handleChange={(e) => handleChange(e, setFormValues)}></Update>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateForm}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    {(session) ? <>
          <AdminDetails option={view} data={apts} handleDelete={handleDelete} openUpdateForm={openUpdateForm} search={search}></AdminDetails>
        </>
      : <Typography sx={{textAlign:"center", mt:4}} >Sign in to view admin interface</Typography> }
      
      </AdminLayout>
      
)
}
