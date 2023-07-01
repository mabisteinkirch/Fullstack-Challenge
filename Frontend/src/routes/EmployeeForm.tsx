import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';


import { Button, Switch, FormControl, FormLabel, Input, Stack, styled, FormControlLabel, Alert } from '@mui/material';
import { useParams, useNavigate} from 'react-router-dom';

interface EmployeeFormProps {
    //optional
   isEdit?: boolean
  }

export default function EmployeeForm({isEdit}:EmployeeFormProps) {
    const navigate = useNavigate();


    const {id} = useParams ()

     useEffect(() => {
        if (!isEdit)
            return
       axios.get('http://127.0.0.1:5000/employees')
         .then(function (response) {
           // handle success
           const employees = response.data.employees
           const employee = employees.find ((cat)=> {
                return cat.id === parseInt (id, 10)
           })
           setName (employee.name)
           setPhone (employee.phone)
           setEmail (employee.email)
           setIdCategory (employee.id_category)
           setStatus (employee.status)
         })
     }, [])

    //empty string 
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [id_category, setIdCategory] = useState('')
    const [status, setStatus] = useState(true)
    const [errors, setErrors] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean | null>(null)

    const label = { slotProps: { input: { 'aria-label': 'Status' } } };

    function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        // Prevent the browser from reloading the page
        e.preventDefault();


        const params = { name, phone, email, id_category, status }
        const url = isEdit ? `http://127.0.0.1:5000/employees/${id}` : 'http://127.0.0.1:5000/employees/'

  
        axios.post(url, params)
            .then(function (response) {
                // handle success
                console.log(response)
                setSuccess (true)
                setTimeout(()=>{
                    navigate("/employee/list");
                }, 3000)
                
            }).catch(function (error){
                setErrors (error.response.data.message)
            })
            
    }


    return (
        <div>
            <h1>Employee</h1>
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
                    Employee successfully saved
                </Alert>)
               : null
            }
           
            <form method='POST' onSubmit={handleSubmit}>
                <Stack spacing={2} alignItems="center">
                    <FormControl>
                        <FormLabel>Name:</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Phone:</FormLabel>
                        <Input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Category:</FormLabel>
                        <Input
                            type="text"
                            name="id_category"
                            value={id_category}
                            onChange={(e) => { setIdCategory(e.target.value) }}
                            
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
