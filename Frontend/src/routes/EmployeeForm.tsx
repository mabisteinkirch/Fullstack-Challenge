
import { SyntheticEvent, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';


import { Button, Switch, FormControl, FormLabel, Input, Stack, styled, FormControlLabel, Alert, Typography } from '@mui/material';
import { useParams, useNavigate} from 'react-router-dom';
import { Employee } from '../types/types';

import axios from '../api'

interface EmployeeFormProps {
    //optional
   isEdit?: boolean
  }

export default function EmployeeForm({isEdit}:EmployeeFormProps) {
    const navigate = useNavigate();


    const {id} = useParams <{id: string}> ()

     useEffect(() => {
        if (!isEdit)
            return
       axios.get('employees')
         .then(function (response) {
           // handle success
           const employees = response.data.employees as Employee[]
           const employee = employees.find ((cat)=> {
                return cat.id === parseInt (id ?? '', 10)
           })
           setName (employee?.name ?? '')
           setPhone (employee?.phone.toString() ?? '')
           setEmail (employee?.email ?? '')
           setIdCategory (employee?.id_category.toString() ?? '')
           setStatus(Boolean (employee?.status) ?? true)
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
        const url = isEdit ? `employees/${id}` : 'employees/'

        if (isEdit) {
        axios.put(url, params)
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
        }else{
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
        
            
    }


    return (
        <div>
            <Typography variant="h2">Employee</Typography>
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
