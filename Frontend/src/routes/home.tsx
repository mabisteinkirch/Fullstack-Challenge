import axios from 'axios';
import {Button} from '@mui/material';
import { AppThemeProvider, useAppThemeContext } from "../contexts/ThemeContexts";
import { useEffect } from 'react';






export const Home = () =>{
  
   const toogleTheme = useAppThemeContext ();

   useEffect(() => {
    axios.get('http://127.0.0.1:5000/')      
  }, [])

   return (
    <AppThemeProvider>     
        {/* <Button variant='contained' color='primary' onClick = {toogleTheme}>
            Go
        </Button>      */}
    </AppThemeProvider>
   );
}