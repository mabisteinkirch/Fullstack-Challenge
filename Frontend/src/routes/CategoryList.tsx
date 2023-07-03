import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider, styled } from '@mui/material/styles';


import { BottomNavigation, BottomNavigationAction, Button, Input } from '@mui/material';
import { DarkTheme, LightTheme } from "./../theme";
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import CategoryIcon from '@mui/icons-material/Category';

import * as React from 'react';
import { Category } from '../types/types';

import axios from '../api'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccc',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function CategoryList() {

  const [categories, setCategories] = useState<Category[]>()
  const [description, setDescription] = useState('')
  const [filteredCategories, setFilteredCategories] = useState<Category[]>()
  
  useEffect(() => {
    const newCategories = categories?.filter((category)=>{
      return category.description.toLowerCase().trim().replace(/\W+/g, '').includes(description.toLowerCase().trim().replace(/\W+/g, ''))
      
    })
    setFilteredCategories(newCategories)
  }, [description, categories])

  useEffect(() => {
    axios.get('categories/')
      .then(function (response) {
        // handle success
        setCategories(response.data.categories)
      })
  }, [])

  const [value, setValue] = React.useState(0);


  return (

    <Container >

      <Box >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction href="/category/list" label="Category" icon={<CategoryIcon />} />
            <BottomNavigationAction href="/employee/list"  label="Employee" icon={<AssignmentInd />} />
          </BottomNavigation>
      </Box>
  
     
      <Typography variant='h1'  >Category </Typography>
      
      <Box >
        <Stack direction="column" useFlexGap flexWrap="wrap">
          <Stack direction="row" useFlexGap flexWrap="wrap">
            <Item>
            <Typography variant='h3'>New </Typography>
              <Fab color="secondary" size="small" aria-label="create" href="create">
                <AddIcon />
              </Fab></Item>
            <Item><form action="#" method="GET">
           
            <Typography variant='h3'>Filter </Typography>

            <Input
                type="text"
                name="description"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                required
            />
            <SearchIcon />
        
            <br /><br /><br />
          </form></Item>
          </Stack>
          <Item> <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell >Description</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Created Date</TableCell>
                  <TableCell >Updated Date</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!filteredCategories ? "loading..." : filteredCategories.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell >{category.description}</TableCell>
                      <TableCell >{category.status ? "Enable" : "Disable"}</TableCell>
                      <TableCell >{category.createdDate}</TableCell>
                      <TableCell >{category.updatedDate}</TableCell>
                      <Link to={`/category/update/${category.id}`}>
                      <Fab color="secondary" size="small" aria-label="edit" >
                        <EditIcon />
                      </Fab>
                      </Link>
                    </TableRow>)
                })}
              </TableBody>
            </Table>

          </TableContainer></Item>
        </Stack>
      </Box>


    </Container>
  );
}




