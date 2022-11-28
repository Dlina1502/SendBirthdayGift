import React, { useEffect, useState, useMemo } from "react";
import useSWR from 'swr';
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarQuickFilter, gridClasses } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Paper } from "@mui/material";
const fetcher = (url) => fetch(url).then((res) => res.json());

function QuickSearchToolbar() {
  return (
    <Box align="right"
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}

export default function DataGridDemo() {

  const { data, error } = useSWR('/api/staticdata', fetcher);
  const staff = eval(data)
  const [pageSize, setPageSize] = React.useState(10);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [hobbie, setHobbie] = React.useState("");

  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event, cellValues) => {
    console.log(cellValues.row.name);
    setOpen(true);
    setName(cellValues.row.name);
    setAge(cellValues.row.age);
    setHobbie(cellValues.row.hobbies.toString());
    console.log(cellValues.row.hobbies);
  };

  function getAge(date) {
    let today = new Date()
    let birthday = new Date(date)
    let age = today.getFullYear() - birthday.getFullYear()
    let differenceMonths = today.getMonth() - birthday.getMonth()

    if (
      differenceMonths < 0 ||
      (differenceMonths === 0 && today.getDate() < birthday.getDate())
    ) {
      age--
    }

    return age
  }

  const columns = [
    { 
        field: 'index', 
        renderHeader: () => (
        <strong>
          {'ID'}
        </strong>
    ), 
        width: 50, 
        align: "center", },
    {
      field: 'name',
      renderHeader: () => (
        <strong>
          {'Name'}
        </strong>
    ),
      width: 160,
    },
    {
      field: 'birthday',
      renderHeader: () => (
        <strong>
          {'Birthday'}
        </strong>
    ),
      width: 160,
    },
    {
      field: 'age',
      renderHeader: () => (
        <strong>
          {'Age'}
        </strong>
    ),
      width: 50,
      align: "center",
    },
    {
      field: 'email',
      renderHeader: () => (
        <strong>
          {'Email'}
        </strong>
    ),
      description: 'This column is not sortable.',
      width: 220,
      sortable: false,
    },
    {
      field: 'hobbies',
      renderHeader: () => (
        <strong>
          {'Hobbies'}
        </strong>
    ),
      description: 'This column is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'message',
      renderHeader: () => (
        <strong>
          {'Send a birthday gift'}
        </strong>
    ),
      width: 155,
      align: "center",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            style={ {background:"#0044A3"} }
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          > Send </Button>
        );
      }
    },
  ];

  const rows = Array.isArray(staff) && staff.map((row) => ({
    id: row.index,
    index: row.index,
    name: row.name,
    birthday: new Date(row.birthday.split('T', 1).toString().split('-').join('/')).toLocaleDateString("en-US", optionsDate),
    age: getAge(row.birthday.split('T', 1)),
    email: row.email,
    hobbies: row.hobbies.toString().split(',').join(', '),
  }))

  return (
    <div class="bg-gradient-to-b from-indigo-200 ...">
        <Box align="center"
        sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
            m: 1,
            width: 1000,
            height: 500,
        },
        }}>

        <Paper elevation={3} style={ {margin:"90px auto"} }>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            getRowHeight={() => 'auto'}
            sx={{
                [`& .${gridClasses.cell}`]: {
                py: 1,        
                },
            }}
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: QuickSearchToolbar }}
            disableColumnMenu
            />
        </Paper>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Send a birthday gift to: {name}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                ¡Feliz cumpleaños {name.split(" ", 1)}!
            </DialogContentText>
            <DialogContentText>
                Hoy en tu cumpleaños numero {age} sabemos que una de las cosas que te gusta hacer es: {hobbie} por 
                esta razón te enviamos este bono, esperamos lo disfrutes.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="link"
                label="Link to gift card"
                type="link"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="contained" style={ {background:"#0044A3"} } onClick={handleClose}>
                Send
            </Button>
            </DialogActions>
        </Dialog>
        </Box>
    </div>
  );
}