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
import { Category } from "../types/types";
import { Item } from "../components/Item";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>();
  const [description, setDescription] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>();

  useEffect(() => {
    const newCategories = categories?.filter((category) => {
      return category.description
        .toLowerCase()
        .trim()
        .replace(/\W+/g, "")
        .includes(description.toLowerCase().trim().replace(/\W+/g, ""));
    });
    setFilteredCategories(newCategories);
  }, [description, categories]);

  useEffect(() => {
    axios
      .get<{ categories: Category[] }>("categories/")
      .then(function (response) {
        setCategories(response.data.categories);
      });
  }, []);

  const [value, setValue] = useState(0);

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

      <Typography variant="h1">Category</Typography>

      <Box>
        <Stack direction="column" useFlexGap flexWrap="wrap">
          <Stack direction="row" useFlexGap flexWrap="wrap">
            <Item>
              <Typography variant="h3">New</Typography>
              <Fab
                color="secondary"
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
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
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
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Updated Date</TableCell>
                    <TableCell align="center">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!filteredCategories ? (
                    <TableRow>
                      <TableCell colSpan={6}>loading...</TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((category) => {
                      return (
                        <TableRow key={category.id}>
                          <TableCell>{category.description}</TableCell>
                          <TableCell>
                            {category.status ? "Enable" : "Disable"}
                          </TableCell>
                          <TableCell>{category.createdDate}</TableCell>
                          <TableCell>{category.updatedDate}</TableCell>
                          <TableCell>
                            <Link to={`/category/update/${category.id}`}>
                              <Fab
                                color="secondary"
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
