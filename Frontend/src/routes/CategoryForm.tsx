import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';


import { Button, Switch, FormControl, FormLabel, Input, Stack, styled, FormControlLabel, Alert } from '@mui/material';
import { useParams, useNavigate} from 'react-router-dom';

interface CategoryFormProps {
    //optional
   isEdit?: boolean
  }

export default function CategoryForm({isEdit}:CategoryFormProps) {
    const navigate = useNavigate();


    const {id} = useParams ()

     useEffect(() => {
        if (!isEdit)
            return
       axios.get('http://127.0.0.1:5000/categories/')
         .then(function (response) {
           // handle success
           const categories = response.data.categories
           const category = categories.find ((cat)=> {
                return cat.id === parseInt (id, 10)
           })
           setDescription (category.description)
           setStatus (category.status)
         })
     }, [])

    //empty string 
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState(true)
    const [errors, setErrors] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean | null>(null)

    const label = { slotProps: { input: { 'aria-label': 'Status' } } };

    function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        // Prevent the browser from reloading the page
        e.preventDefault();


        const params = { description, status }
        const url = isEdit ? `http://127.0.0.1:5000/categories/${id}` : 'http://127.0.0.1:5000/categories/'

  
        axios.post(url, params)
            .then(function (response) {
                // handle success
                console.log(response)
                setSuccess (true)
                setTimeout(()=>{
                    navigate("/category/list");
                }, 2000)
                
            }).catch(function (error){
                setErrors (error.response.data.message)
            })
            
    }


    return (
        <div>
            <h1>Category</h1>
            {
                errors ? ( 
                    <Alert severity="error">
                    {errors}
                </Alert>)
            : null
            }
            {
                success ? ( 
                    <Alert severity="success">
                    Category successfully saved
                </Alert>)
               : null
            }
           
            <form method='POST' onSubmit={handleSubmit}>
                <Stack spacing={2} alignItems="center">
                    <FormControl>
                        <FormLabel>Description:</FormLabel>
                        <Input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            required
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Status:</FormLabel>
                        <FormControlLabel control={<Switch
                            {...label}

                            checked={status}
                            onChange={() => { setStatus(!status) }}

                        />} label={status ? "Enable" : "Disable"} />
                    </FormControl>
                    
                    <Button type="submit" variant="contained" color="secondary">
                        Send
                    </Button>
                </Stack>
            </form>
        </div>
    );
}
