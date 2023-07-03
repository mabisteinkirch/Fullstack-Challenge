import { Link } from "react-router-dom";

import AssignmentInd from "@mui/icons-material/AssignmentInd";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Container, Fab, Stack, Typography } from "@mui/material";
import { Item } from "../components/Item";

export default function Home() {
  return (
    <Container>
      <Typography variant="h1">Home</Typography>
      <Box>
        <Stack direction="column" useFlexGap flexWrap="wrap">
          <Stack direction="row" useFlexGap flexWrap="wrap">
            <Item>
              <Typography variant="h3">Category</Typography>
              <Link to={`/category/list`}>
                <Fab color="secondary" size="large">
                  <CategoryIcon />
                </Fab>
              </Link>
            </Item>
            <Item>
              <Typography variant="h3">Employee</Typography>
              <Link to={`/employee/list`}>
                <Fab color="primary" size="large">
                  <AssignmentInd />
                </Fab>
              </Link>
            </Item>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
