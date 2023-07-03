import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Fab,
  Input,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import axios from "../api";
import { Employee } from "../types/types";
import { Item } from "../components/Item";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>();
  const [name, setName] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>();

  useEffect(() => {
    const newEmployees = employees?.filter((employee) => {
      return employee.name
        .toLowerCase()
        .trim()
        .replace(/\W+/g, "")
        .includes(name.toLowerCase().trim().replace(/\W+/g, ""));
    });
    setFilteredEmployees(newEmployees);
  }, [name, employees]);

  useEffect(() => {
    axios
      .get<{ employees: Employee[] }>("employees/")
      .then(function (response) {
        setEmployees(response.data.employees);
      });
  }, []);

  const [value, setValue] = useState(1);

  return (
    <Container>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            href="/category/list"
            label="Category"
            icon={<CategoryIcon />}
          />
          <BottomNavigationAction
            href="/employee/list"
            label="Employee"
            icon={<AssignmentInd />}
          />
        </BottomNavigation>
      </Box>

      <Typography variant="h1">Employee</Typography>

      <Box>
        <Stack direction="column" useFlexGap flexWrap="wrap">
          <Stack direction="row" useFlexGap flexWrap="wrap">
            <Item>
              <Typography variant="h3">New</Typography>
              <Fab
                color="primary"
                size="small"
                aria-label="create"
                href="create"
              >
                <AddIcon />
              </Fab>
            </Item>
            <Item>
              <form action="#" method="GET">
                <Typography variant="h3">Filter</Typography>

                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <SearchIcon />

                <br />
                <br />
                <br />
              </form>
            </Item>
          </Stack>
          <Item>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Updated Date</TableCell>
                    <TableCell align="center">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!filteredEmployees ? (
                    <TableRow>
                      <TableCell colSpan={6}>loading...</TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map((employee) => {
                      return (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.phone}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.id_category}</TableCell>
                          <TableCell>
                            {employee.status ? "Enable" : "Disable"}
                          </TableCell>
                          <TableCell>{employee.createdDate}</TableCell>
                          <TableCell>{employee.updatedDate}</TableCell>
                          <TableCell>
                            <Link to={`/employee/update/${employee.id}`}>
                              <Fab
                                color="primary"
                                size="small"
                                aria-label="edit"
                              >
                                <EditIcon />
                              </Fab>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Stack>
      </Box>
    </Container>
  );
}
