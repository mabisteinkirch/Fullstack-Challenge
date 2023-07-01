import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider, styled } from '@mui/material/styles';


import { Button, Input } from '@mui/material';
import { DarkTheme, LightTheme } from "./../theme";
import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';

interface Category {
  id: number
  description: string
  status: number
  createdDate: string
  updatedDate: string
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccc',
  ...theme.typography.body2,
  padding: theme.spacing(1),
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
    axios.get('http://127.0.0.1:5000/categories/')
      .then(function (response) {
        // handle success
        setCategories(response.data.categories)
      })
  }, [])
  return (
    <Container >
      
      <Typography variant='h1'>Category </Typography>
      
      <Box >
        <Stack direction="column" useFlexGap flexWrap="wrap">
          <Stack direction="row" useFlexGap flexWrap="wrap">
            <Item>
            <Typography variant='h3'>New </Typography>
              <Fab color="primary" size="small" aria-label="create" href="create">
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
                      <Fab color="primary" size="small" aria-label="edit" >
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




