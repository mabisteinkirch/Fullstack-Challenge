import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import axios from "../api";
import { Category } from "../types/types";

interface CategoryFormProps {
  isEdit?: boolean;
}

export default function CategoryForm({ isEdit }: CategoryFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!isEdit) return;

    axios
      .get<{ categories: Category[] }>("categories/")
      .then(function (response) {
        const categories = response.data.categories;
        const category = categories.find((cat) => {
          return cat.id === parseInt(id ?? "", 10);
        });
        setDescription(category?.description ?? "");
        setStatus(Boolean(category?.status) ?? true);
      });
  }, [id, isEdit]);

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const params = { description, status };
    const axiosRequest = isEdit
      ? axios.put(`categories/${id}`, params)
      : axios.post("categories/", params);

    axiosRequest
      .then(function () {
        setSuccess(true);
        setTimeout(() => {
          navigate("/category/list");
        }, 2000);
      })
      .catch(function (error) {
        setErrors(error.response.data.message);
      });
  }

  return (
    <Container>
      <Typography variant="h2">Category</Typography>
      {errors ? <Alert severity="error">{errors}</Alert> : null}
      {success ? (
        <Alert severity="success">Category successfully saved</Alert>
      ) : null}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems="center">
          <FormControl>
            <FormLabel>Description:</FormLabel>
            <Input
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Status:</FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={() => {
                    setStatus(!status);
                  }}
                />
              }
              label={status ? "Enable" : "Disable"}
            />
          </FormControl>

          <Button type="submit" variant="contained" color="secondary">
            Send
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
