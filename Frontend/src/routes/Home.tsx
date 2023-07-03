import axios from 'axios';
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


import { Button, Input } from '@mui/material';
import { DarkTheme, LightTheme } from "./../theme";
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import CategoryIcon from '@mui/icons-material/Category';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccc',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function Home() {
  return (
    <Container >
      <Typography variant='h1'>Home </Typography>
      <Box >
        <Stack direction="column" useFlexGap flexWrap="wrap">
          <Stack direction="row" useFlexGap flexWrap="wrap">
            <Item>
              <Typography variant='h3'>Category </Typography>
              <Link to={`/category/list`}>
                <Fab color="secondary" size="large">
                <CategoryIcon />
                </Fab>
               </Link>
            </Item>
            <Item>
              <form action="#" method="GET">
                <Typography variant='h3'>Employee </Typography>
                <Link to={`/employee/list`}>
                <Fab color="primary" size="large">
                <AssignmentInd />
                </Fab>
                </Link>
                <br /><br /><br />
              </form>
            </Item>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}




