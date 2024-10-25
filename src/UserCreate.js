import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid,TextField,Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function UserCreate() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    axios
      .post(
        'https://dummyjson.com/users/add',
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      .then((response) => {
        console.log('User added successfully:', response.data);
      })
      .catch((error) => {
        console.error('There was an error adding the user:', error);
      });
  };
  
  const [firstName,setfirstName] = useState('');
  const [lastName,setlastName] = useState('');
  const [email,setemail] = useState('');
  const [phone,setphone] = useState('');

//   const {data} = await axios.post('https://dummyjson.com/users/add', {
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     phone: phone
//   }, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
// })


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{p:2}}>
        <Typography variant='h6' gutterBottom component="div">
          Create User
        </Typography>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField id="firstName" label="First Name" variant="outlined" fullWidth required onChange={(e)=>setfirstName(e.target.value)} />
            </Grid>
            <Grid item xs={12} >
             <TextField id="lastName" label="Last Name" variant="outlined" fullWidth required onChange={(e)=>setlastName(e.target.value)} /> 
            </Grid>
            <Grid item xs={12} sm={6}>
             <TextField id="email" label="Email" variant="outlined" fullWidth required onChange={(e)=>setemail(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
             <TextField id="phone" label="Phone" variant="outlined" fullWidth required onChange={(e)=>setphone(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" fullWidth type="submit">Create</Button>
            </Grid>
          </Grid>
          </form>
      </Container>
    </React.Fragment>
  );
}
