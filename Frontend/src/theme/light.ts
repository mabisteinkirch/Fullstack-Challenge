import {createTheme} from '@mui/material';
import {amber, purple} from '@mui/material/colors';

export const LightTheme = createTheme ({
    palette: {
      secondary:{
           main: amber[700],
           dark: amber[800],
           light:amber[500],
           contrastText: '#fffffff',

        },

        primary:{
            main: purple[500],
            dark: purple[400],
            light: purple[300],
            contrastText: '#fffffff',
 
         },

         background:{
            paper: '#fffffff',
            default: '#f7f6f3',
           
 
         }
    }
})
