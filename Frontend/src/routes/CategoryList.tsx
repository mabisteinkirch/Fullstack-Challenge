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


import { Button } from '@mui/material';


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

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/category/list')
      .then(function (response) {
        // handle success
        setCategories(response.data.categories)
      })
  }, [])
  return (
    <div>
      <h1 >Category</h1>
      <Box sx={{ width: 550 }}>
        <Stack direction="row" useFlexGap flexWrap="wrap">
          <Item><h3 >New</h3>
            <Fab color="primary" size="small" aria-label="create" href="create/{{category.id}}">
              <AddIcon />
            </Fab></Item>
          <Item><form action="{{url_for('router.category.listCategory')}}" method="GET">
            <h3 >Filter</h3>
            <input type="text" className="form-control" name="categoryName" value="" />

            {/* <fieldset className="form-group col-md-4">
            <button type="submit" className="btn btn-secondary">Filter</button>
          </fieldset> */}


            <Fab color="primary" size="small" aria-label="edit" href="update/{{category.id}}">
              <SearchIcon />
            </Fab>
            <br /><br /><br />
          </form></Item>
          <Item> <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="center">Created Date</TableCell>
                  <TableCell align="center">Updated Date</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!categories ? "loading..." : categories.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell >{category.description}</TableCell>
                      <TableCell >{category.status}</TableCell>
                      <TableCell >{category.createdDate}</TableCell>
                      <TableCell >{category.updatedDate}</TableCell>
                      <Fab color="primary" size="small" aria-label="edit" href="update/{{category.id}}">
                        <EditIcon />
                      </Fab>
                    </TableRow>)
                })}
              </TableBody>
            </Table>

          </TableContainer></Item>
        </Stack>
      </Box>


      {/* <section className="intro">
        <div className="mask d-flex align-items-center h-100">
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-xl">
                <div className="bg-white ">
                  <table className="table table-sm mb-0 text-xsmall">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">CREATED DATE</th>
                        <th scope="col">UPDATED DATE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!categories ? "loading..." : categories.map((category) => {
                        return (<tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.description}</td>
                          <td>{category.status}</td>
                          <td>{category.createdDate}</td>
                          <td>{category.updatedDate}</td>
                          <td>
                            <a href="update/{{category.id}}" className="btn btn-secondary btn-xs">Edit</a>
                          </td>
                        </tr>)
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section> */}

      {/* <div style="display: flex;">
          {% if listData['category'].has_prev %}
          <a href="{{listData['category'].prev_num }}?categoryName={{_categoryName}}"> «Previous |</a>
          {% else %}
          <p> «Previous |</p>
          {% endif %}
      
          {% if listData['category'].has_next %}
            {% if listData['page'] == 1 %}
              <a href="list/{{listData['category'].next_num}}?categoryName={{_categoryName}}">| Next»</a>
            {% else %}
              <a href="{{listData['category'].next_num}}?categoryName={{_categoryName}}">| Next»</a>
             {% endif %}
          {% else %}
            <p>| Next»</p>
          {% endif %}
      </div> */}


    </div>
  );
}




