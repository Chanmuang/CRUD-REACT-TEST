import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Link from '@mui/material/Link';
import { ButtonGroup } from '@mui/material';
import { json, redirect } from 'react-router-dom';
import UserUpdate from './UserUpdate';


export default function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState();

  const UserUpdate = id =>{
    window.location = '/update/' + id
  }

  const UserDelete = (id) => {

    console.log(id)
    axios.delete(`https://dummyjson.com/user/${id} `)
      .then((response) => {
        console.log('Delete successfully:', response.data);
      })
      .catch(error => console.log('error',error));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        console.log(response.data.users)
        setItems(response.data.users)
      } catch (err) {
        setError('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, []); 

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{p: 2}}>
        <Paper sx={{ p: 2 }}>
         <Box display="flex">
          <Box sx={{ flexGrow:1 }}>
           <Typography variant='h6' gutterBottom component="div">
            Users
          </Typography>
          </Box>
          <Box>
           <Link href="Create">
            <Button variant="contained">Create</Button>
            </Link> 
          </Box>
         </Box>
         <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">FirstName</TableCell>
                <TableCell align="right">LastName</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone number</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">
                  <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button onClick={() => UserUpdate(row.id)}>Edit</Button>
                    <Button onClick={() => UserDelete(row.id)}>Del</Button>
                  </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}