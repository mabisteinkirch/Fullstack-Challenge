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
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import * as React from 'react';
import { Employee } from '../types/types';

import axios from '../api'




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccc',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function EmployeeList() {

   const [employees, setEmployees] = useState<Employee[]>()
   const [name, setName] = useState('')  
   const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>()

   useEffect(() => {
     const newEmployees = employees?.filter((employee)=>{
       return employee.name.toLowerCase().trim().replace(/\W+/g, '').includes(name.toLowerCase().trim().replace(/\W+/g, ''))
      
     })
     setFilteredEmployees(newEmployees)
   }, [name, employees])

  useEffect(() => {
    axios.get('employees/')
      .then(function (response) {
        // handle success
        setEmployees(response.data.employees)
      })
  }, [])

  const [value, setValue] = React.useState(1);


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
      
      <Typography variant='h1'>Employee </Typography>
      
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
                name="name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
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
                  <TableCell >Name</TableCell>
                  <TableCell >Phone</TableCell>
                  <TableCell >E-mail</TableCell>
                  <TableCell >Category</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Created Date</TableCell>
                  <TableCell >Updated Date</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {!filteredEmployees ? "loading..." : filteredEmployees.map((employee) => {
                  return (
                    <TableRow key={employee.id}>
                      <TableCell >{employee.name}</TableCell>
                      <TableCell >{employee.phone}</TableCell>
                      <TableCell >{employee.email}</TableCell>
                      <TableCell >{employee.id_category}</TableCell>
                      <TableCell >{employee.status ? "Enable" : "Disable"}</TableCell>
                      <TableCell >{employee.createdDate}</TableCell>
                      <TableCell >{employee.updatedDate}</TableCell>
                      <Link to={`/employee/update/${employee.id}`}>
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






// export default function EmployeeList() {

//   const [employees, setEmployees] = useState<Employee[]>()

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/employees')
//       .then(function (response) {
//         // handle success
//         setEmployees(response.data.employees)
//       })
//   }, [])
//   return (
//     <div>
//       <br />
//       <a href="{{url_for('router.employee.createEmployee')}}" className="btn btn-secondary btn-xs">New Employee</a>
//       <hr />
//       <div className="row">
//         <label className="form-label" htmlFor="form3Example4">Employee</label>

//         <form action="{{url_for('router.employee.listEmployee')}}" method="GET">
//           <input type="text" className="form-control" name="employeeName" value="{{_employeeName}}" />

//           <fieldset className="form-group col-md-4">
//             <button type="submit" className="btn btn-secondary">Filter</button>
//           </fieldset>
//         </form>
//       </div>
//       <br />

//       <section className="intro">
//         <div className="mask d-flex align-items-center h-100">
//           <div className="container ">
//             <div className="row justify-content-center">
//               <div className="col-xl">
//                 <div className="bg-white ">
//                   <table className="table table-sm mb-0 text-xsmall">
//                     <thead className="table-dark">
//                       <tr>
//                         <th scope="col">ID</th>
//                         <th scope="col">NAME</th>
//                         <th scope="col">PHONE</th>
//                         <th scope="col">EMAIL</th>
//                         <th scope="col">CATEGORY</th>
//                         <th scope="col">STATUS</th>
//                         <th scope="col">CREATED DATE</th>
//                         <th scope="col">UPDATED DATE</th>
//                         <th scope="col">ACTION</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {!employees ? "loading..." : employees.map((employee) => {
//                         return (<tr key={employee.id}>
//                           <td>{employee.id}</td>
//                           <td>{employee.name}</td>
//                           <td>{employee.phone}</td>
//                           <td>{employee.email}</td>
//                           <td>{employee.id_category}</td>
//                           <td>{employee.status}</td>
//                           <td>{employee.createdDate}</td>
//                           <td>{employee.updatedDate}</td>
//                           <td>
//                             <a href="update/{{employee.id}}" className="btn btn-secondary btn-xs">Edit</a>
//                           </td>
//                         </tr>)
//                       })}

//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </section>

//       {/* <div style="display: flex;">
//           {% if listData['employee'].has_prev %}
//           <a href="{{listData['employee'].prev_num }}?employeeName={{_employeeName}}"> «Previous |</a>
//           {% else %}
//           <p> «Previous |</p>
//           {% endif %}
      
//           {% if listData['employee'].has_next %}
//             {% if listData['page'] == 1 %}
//               <a href="list/{{listData['employee'].next_num}}?employeeName={{_employeeName}}">| Next»</a>
//             {% else %}
//               <a href="{{listData['employee'].next_num}}?employeeName={{_employeeName}}">| Next»</a>
//              {% endif %}
//           {% else %}
//             <p>| Next»</p>
//           {% endif %}
//       </div> */}
//     </div>
//   );
// }